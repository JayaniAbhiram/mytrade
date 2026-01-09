const express = require('express');
const db = require('../config/database');
const router = express.Router();

// Add a new trade
router.post('/', async (req, res) => {
    try {
        const {
            trade_date,
            stock_name,
            total_trade_value_buy,
            stock_price_buy,
            stock_price_sell,
            funds_before,
            funds_after
        } = req.body;

        // Calculate derived values
        const num_shares = stock_price_buy > 0 ? Math.round(total_trade_value_buy / stock_price_buy) : 0;
        const amount_invested = total_trade_value_buy / 5;
        const total_trade_value_sell = stock_price_sell * num_shares;
        const total_amount_received = total_trade_value_sell / 5;
        const returns_trade = total_trade_value_sell - total_trade_value_buy;

        const connection = await db.getConnection();

        // Insert trade
        const [result] = await connection.execute(
            `INSERT INTO trades (trade_date, stock_name, stock_price_buy, num_shares, 
             total_trade_value_buy, amount_invested, stock_price_sell, 
             total_trade_value_sell, total_amount_received, returns_trade) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [trade_date, stock_name, stock_price_buy, num_shares, total_trade_value_buy,
             amount_invested, stock_price_sell, total_trade_value_sell, 
             total_amount_received, returns_trade]
        );

        // Calculate total returns for the day
        const [summaryResult] = await connection.execute(
            'SELECT SUM(returns_trade) as total_returns FROM trades WHERE trade_date = ?',
            [trade_date]
        );

        const total_returns_day = summaryResult[0].total_returns || 0;
        const fund_difference = funds_after - funds_before;
        const brokerage_value = (total_returns_day + funds_before) - funds_after;

        // Insert or update daily summary
        await connection.execute(
            `INSERT INTO daily_summary 
             (summary_date, total_returns_day, funds_before_investing, 
              funds_after_investing, fund_difference, brokerage_value) 
             VALUES (?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE 
             total_returns_day = ?, 
             funds_before_investing = ?,
             funds_after_investing = ?,
             fund_difference = ?,
             brokerage_value = ?`,
            [trade_date, total_returns_day, funds_before, funds_after, fund_difference,
             brokerage_value, total_returns_day, funds_before, funds_after, 
             fund_difference, brokerage_value]
        );

        connection.release();

        res.status(201).json({
            success: true,
            message: 'Trade recorded successfully',
            data: {
                id: result.insertId,
                num_shares,
                amount_invested,
                total_trade_value_sell,
                total_amount_received,
                returns_trade
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all trades with filters
router.get('/', async (req, res) => {
    try {
        const { stock, date_from, date_to, return_type, search } = req.query;
        let query = 'SELECT * FROM trades WHERE 1=1';
        const params = [];

        if (stock) {
            query += ' AND stock_name = ?';
            params.push(stock);
        }
        if (date_from) {
            query += ' AND trade_date >= ?';
            params.push(date_from);
        }
        if (date_to) {
            query += ' AND trade_date <= ?';
            params.push(date_to);
        }
        if (return_type === 'profit') {
            query += ' AND returns_trade > 0';
        } else if (return_type === 'loss') {
            query += ' AND returns_trade < 0';
        } else if (return_type === 'breakeven') {
            query += ' AND returns_trade = 0';
        }
        if (search) {
            query += ' AND stock_name LIKE ?';
            params.push(`%${search}%`);
        }

        query += ' ORDER BY trade_date DESC, id DESC';

        const connection = await db.getConnection();
        const [trades] = await connection.execute(query, params);

        // Calculate totals
        let total_invested = 0;
        let total_received = 0;
        let total_returns = 0;

        trades.forEach(trade => {
            total_invested += trade.total_trade_value_buy;
            total_received += trade.total_trade_value_sell;
            total_returns += trade.returns_trade;
        });

        // Get all unique stocks for filter
        const [stocks] = await connection.execute('SELECT DISTINCT stock_name FROM trades ORDER BY stock_name');

        connection.release();

        res.json({
            success: true,
            data: trades,
            totals: {
                total_invested,
                total_received,
                total_returns,
                trade_count: trades.length
            },
            filters: {
                stocks: stocks.map(s => s.stock_name)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a trade
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await db.getConnection();

        await connection.execute('DELETE FROM trades WHERE id = ?', [id]);
        connection.release();

        res.json({ success: true, message: 'Trade deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

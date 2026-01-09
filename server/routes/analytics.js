const express = require('express');
const db = require('../config/database');
const router = express.Router();

// Get overall analytics
router.get('/overview', async (req, res) => {
    try {
        const connection = await db.getConnection();

        // Overall statistics
        const [stats] = await connection.execute(`
            SELECT 
                SUM(returns_trade) as total_returns,
                AVG(returns_trade) as avg_return,
                MAX(returns_trade) as best_trade,
                MIN(returns_trade) as worst_trade,
                COUNT(*) as total_trades
            FROM trades
        `);

        // Win/Loss ratio
        const [winloss] = await connection.execute(`
            SELECT 
                SUM(CASE WHEN returns_trade > 0 THEN 1 ELSE 0 END) as wins,
                SUM(CASE WHEN returns_trade < 0 THEN 1 ELSE 0 END) as losses,
                SUM(CASE WHEN returns_trade = 0 THEN 1 ELSE 0 END) as breakeven
            FROM trades
        `);

        connection.release();

        res.json({
            success: true,
            data: {
                stats: stats[0],
                winloss: winloss[0]
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get stock-wise returns
router.get('/stocks', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [stocks] = await connection.execute(`
            SELECT stock_name, SUM(returns_trade) as total_returns, 
                   COUNT(*) as trade_count, AVG(returns_trade) as avg_return
            FROM trades 
            GROUP BY stock_name 
            ORDER BY total_returns DESC
        `);
        connection.release();

        res.json({ success: true, data: stocks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get monthly analysis
router.get('/monthly', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [monthly] = await connection.execute(`
            SELECT DATE_FORMAT(trade_date, '%Y-%m') as month, 
                   SUM(returns_trade) as monthly_returns, 
                   COUNT(*) as trades_count
            FROM trades 
            GROUP BY month 
            ORDER BY month
        `);
        connection.release();

        res.json({ success: true, data: monthly });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get daily chart data
router.get('/daily-chart', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [dailyData] = await connection.execute(`
            SELECT * FROM daily_summary ORDER BY summary_date
        `);
        connection.release();

        res.json({ success: true, data: dailyData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

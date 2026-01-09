import React, { useState, useEffect } from 'react';
import { tradeAPI } from '../api';
import './TradesList.css';

function TradesList() {
    const [trades, setTrades] = useState([]);
    const [filters, setFilters] = useState({
        stock: '',
        date_from: '',
        date_to: '',
        return_type: '',
        search: ''
    });
    const [totals, setTotals] = useState({});
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTrades();
    }, [filters]);

    const fetchTrades = async () => {
        try {
            setLoading(true);
            const response = await tradeAPI.getAllTrades(filters);
            setTrades(response.data.data);
            setTotals(response.data.totals);
            setStocks(response.data.filters.stocks);
        } catch (err) {
            setError('Error loading trades: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDeleteTrade = async (id) => {
        if (window.confirm('Are you sure you want to delete this trade?')) {
            try {
                await tradeAPI.deleteTrade(id);
                fetchTrades();
            } catch (err) {
                alert('Error deleting trade: ' + err.message);
            }
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value);
    };

    return (
        <div className="trades-container">
            <h2>All Trades</h2>

            {/* Filters */}
            <div className="filters-card">
                <div className="filter-group">
                    <label>Stock Name</label>
                    <select 
                        name="stock" 
                        value={filters.stock} 
                        onChange={handleFilterChange}
                    >
                        <option value="">All Stocks</option>
                        {stocks.map(stock => (
                            <option key={stock} value={stock}>{stock}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label>Date From</label>
                    <input 
                        type="date" 
                        name="date_from" 
                        value={filters.date_from} 
                        onChange={handleFilterChange}
                    />
                </div>

                <div className="filter-group">
                    <label>Date To</label>
                    <input 
                        type="date" 
                        name="date_to" 
                        value={filters.date_to} 
                        onChange={handleFilterChange}
                    />
                </div>

                <div className="filter-group">
                    <label>Return Type</label>
                    <select 
                        name="return_type" 
                        value={filters.return_type} 
                        onChange={handleFilterChange}
                    >
                        <option value="">All Types</option>
                        <option value="profit">Profit</option>
                        <option value="loss">Loss</option>
                        <option value="breakeven">Break Even</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Search</label>
                    <input 
                        type="text" 
                        name="search" 
                        placeholder="Search stock name..." 
                        value={filters.search} 
                        onChange={handleFilterChange}
                    />
                </div>
            </div>

            {/* Summary Stats */}
            <div className="summary-stats">
                <div className="stat-box">
                    <span className="stat-label">Total Trades</span>
                    <span className="stat-value">{totals.trade_count || 0}</span>
                </div>
                <div className="stat-box">
                    <span className="stat-label">Total Invested</span>
                    <span className="stat-value">{formatCurrency(totals.total_invested || 0)}</span>
                </div>
                <div className="stat-box">
                    <span className="stat-label">Total Received</span>
                    <span className="stat-value">{formatCurrency(totals.total_received || 0)}</span>
                </div>
                <div className="stat-box">
                    <span className={`stat-value ${(totals.total_returns || 0) >= 0 ? 'positive' : 'negative'}`}>
                        {formatCurrency(totals.total_returns || 0)}
                    </span>
                    <span className="stat-label">Total Returns</span>
                </div>
            </div>

            {/* Trades Table */}
            {loading ? (
                <div className="loading">Loading trades...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="table-wrapper">
                    <table className="trades-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Stock</th>
                                <th>Buy Price</th>
                                <th>Sell Price</th>
                                <th>Shares</th>
                                <th>Buy Value</th>
                                <th>Sell Value</th>
                                <th>Returns</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trades.map(trade => (
                                <tr key={trade.id}>
                                    <td>{trade.trade_date}</td>
                                    <td><strong>{trade.stock_name}</strong></td>
                                    <td>{formatCurrency(trade.stock_price_buy)}</td>
                                    <td>{formatCurrency(trade.stock_price_sell)}</td>
                                    <td>{trade.num_shares}</td>
                                    <td>{formatCurrency(trade.total_trade_value_buy)}</td>
                                    <td>{formatCurrency(trade.total_trade_value_sell)}</td>
                                    <td className={trade.returns_trade >= 0 ? 'positive' : 'negative'}>
                                        {formatCurrency(trade.returns_trade)}
                                    </td>
                                    <td>
                                        <button 
                                            className="btn-delete"
                                            onClick={() => handleDeleteTrade(trade.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TradesList;

import React, { useState } from 'react';
import { tradeAPI } from '../api';
import './AddTrade.css';

function AddTrade({ onSuccess }) {
    const [formData, setFormData] = useState({
        trade_date: new Date().toISOString().split('T')[0],
        stock_name: '',
        total_trade_value_buy: '',
        stock_price_buy: '',
        stock_price_sell: '',
        funds_before: '',
        funds_after: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await tradeAPI.createTrade(formData);
            setMessage('Trade recorded successfully!');
            setFormData({
                trade_date: new Date().toISOString().split('T')[0],
                stock_name: '',
                total_trade_value_buy: '',
                stock_price_buy: '',
                stock_price_sell: '',
                funds_before: '',
                funds_after: ''
            });
            if (onSuccess) onSuccess();
        } catch (err) {
            setError('Error recording trade: ' + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-trade-container">
            <form onSubmit={handleSubmit} className="form-card">
                <h2>Add New Trade</h2>

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                    <label>Trade Date</label>
                    <input
                        type="date"
                        name="trade_date"
                        value={formData.trade_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Stock Name</label>
                    <input
                        type="text"
                        name="stock_name"
                        placeholder="e.g., RELIANCE, TCS"
                        value={formData.stock_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Total Trade Value (Buy)</label>
                        <input
                            type="number"
                            name="total_trade_value_buy"
                            step="0.01"
                            placeholder="100000"
                            value={formData.total_trade_value_buy}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Stock Price (Buy)</label>
                        <input
                            type="number"
                            name="stock_price_buy"
                            step="0.01"
                            placeholder="2000"
                            value={formData.stock_price_buy}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Stock Price (Sell)</label>
                        <input
                            type="number"
                            name="stock_price_sell"
                            step="0.01"
                            placeholder="2100"
                            value={formData.stock_price_sell}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Funds Before</label>
                        <input
                            type="number"
                            name="funds_before"
                            step="0.01"
                            placeholder="500000"
                            value={formData.funds_before}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Funds After</label>
                        <input
                            type="number"
                            name="funds_after"
                            step="0.01"
                            placeholder="510000"
                            value={formData.funds_after}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="btn-submit">
                    {loading ? 'Recording...' : 'Record Trade'}
                </button>
            </form>
        </div>
    );
}

export default AddTrade;

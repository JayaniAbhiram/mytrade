import React, { useState, useEffect } from 'react';
import { analyticsAPI } from '../api';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import './Analytics.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Analytics() {
    const [overview, setOverview] = useState(null);
    const [stocks, setStocks] = useState([]);
    const [monthly, setMonthly] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const [overviewRes, stocksRes, monthlyRes, dailyRes] = await Promise.all([
                analyticsAPI.getOverview(),
                analyticsAPI.getStocks(),
                analyticsAPI.getMonthly(),
                analyticsAPI.getDailyChart()
            ]);

            setOverview(overviewRes.data.data);
            setStocks(stocksRes.data.data);
            setMonthly(monthlyRes.data.data);
            setDailyData(dailyRes.data.data);
        } catch (err) {
            setError('Error loading analytics: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="analytics-container"><div className="loading">Loading analytics...</div></div>;
    if (error) return <div className="analytics-container"><div className="error">{error}</div></div>;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value || 0);
    };

    // Daily Chart Data
    const dailyChartData = {
        labels: dailyData.map(d => d.summary_date),
        datasets: [
            {
                label: 'Daily Returns',
                data: dailyData.map(d => d.total_returns_day),
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    // Monthly Chart Data
    const monthlyChartData = {
        labels: monthly.map(m => m.month),
        datasets: [
            {
                label: 'Monthly Returns',
                data: monthly.map(m => m.monthly_returns),
                backgroundColor: '#764ba2',
                borderColor: '#764ba2'
            }
        ]
    };

    // Stock Performance Data
    const stockChartData = {
        labels: stocks.map(s => s.stock_name),
        datasets: [
            {
                label: 'Total Returns',
                data: stocks.map(s => s.total_returns),
                backgroundColor: stocks.map(s => s.total_returns >= 0 ? '#28a745' : '#dc3545')
            }
        ]
    };

    return (
        <div className="analytics-container">
            <h2>Analytics Dashboard</h2>

            {/* KPI Cards */}
            {overview && (
                <div className="kpi-grid">
                    <div className="kpi-card">
                        <span className="kpi-label">Total Trades</span>
                        <span className="kpi-value">{overview.stats.total_trades || 0}</span>
                    </div>
                    <div className="kpi-card">
                        <span className="kpi-label">Total Returns</span>
                        <span className={`kpi-value ${(overview.stats.total_returns || 0) >= 0 ? 'positive' : 'negative'}`}>
                            {formatCurrency(overview.stats.total_returns || 0)}
                        </span>
                    </div>
                    <div className="kpi-card">
                        <span className="kpi-label">Average Return</span>
                        <span className={`kpi-value ${(overview.stats.avg_return || 0) >= 0 ? 'positive' : 'negative'}`}>
                            {formatCurrency(overview.stats.avg_return || 0)}
                        </span>
                    </div>
                    <div className="kpi-card">
                        <span className="kpi-label">Best Trade</span>
                        <span className="kpi-value positive">{formatCurrency(overview.stats.best_trade || 0)}</span>
                    </div>
                    <div className="kpi-card">
                        <span className="kpi-label">Worst Trade</span>
                        <span className="kpi-value negative">{formatCurrency(overview.stats.worst_trade || 0)}</span>
                    </div>
                    <div className="kpi-card">
                        <span className="kpi-label">Win Rate</span>
                        <span className="kpi-value">
                            {overview.stats.total_trades > 0 
                                ? ((overview.winloss.wins / overview.stats.total_trades) * 100).toFixed(1)
                                : 0}%
                        </span>
                    </div>
                </div>
            )}

            {/* Win/Loss Breakdown */}
            {overview && (
                <div className="card">
                    <h3>Trade Outcome Breakdown</h3>
                    <div className="outcome-grid">
                        <div className="outcome-box positive">
                            <span className="outcome-label">Wins</span>
                            <span className="outcome-value">{overview.winloss.wins || 0}</span>
                        </div>
                        <div className="outcome-box negative">
                            <span className="outcome-label">Losses</span>
                            <span className="outcome-value">{overview.winloss.losses || 0}</span>
                        </div>
                        <div className="outcome-box neutral">
                            <span className="outcome-label">Break Even</span>
                            <span className="outcome-value">{overview.winloss.breakeven || 0}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Daily Returns Chart */}
            {dailyData.length > 0 && (
                <div className="card">
                    <h3>Daily Returns Trend</h3>
                    <Line data={dailyChartData} options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }} />
                </div>
            )}

            {/* Monthly Returns Chart */}
            {monthly.length > 0 && (
                <div className="card">
                    <h3>Monthly Returns</h3>
                    <Bar data={monthlyChartData} options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' }
                        }
                    }} />
                </div>
            )}

            {/* Stock Performance */}
            {stocks.length > 0 && (
                <div className="card">
                    <h3>Stock-wise Performance</h3>
                    <div className="stock-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Stock</th>
                                    <th>Total Returns</th>
                                    <th>Avg Return</th>
                                    <th>Trade Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stocks.map(stock => (
                                    <tr key={stock.stock_name}>
                                        <td><strong>{stock.stock_name}</strong></td>
                                        <td className={stock.total_returns >= 0 ? 'positive' : 'negative'}>
                                            {formatCurrency(stock.total_returns)}
                                        </td>
                                        <td className={stock.avg_return >= 0 ? 'positive' : 'negative'}>
                                            {formatCurrency(stock.avg_return)}
                                        </td>
                                        <td>{stock.trade_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Analytics;

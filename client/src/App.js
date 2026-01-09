import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddTrade from './components/AddTrade';
import TradesList from './components/TradesList';
import Analytics from './components/Analytics';
import './App.css';

function App() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleTradeSuccess = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <Router>
            <div className="app">
                <nav className="navbar">
                    <div className="navbar-container">
                        <Link to="/" className="navbar-brand">
                            📈 Stock Trading Tracker
                        </Link>
                        <div className="nav-links">
                            <Link to="/" className="nav-link">Add Trade</Link>
                            <Link to="/trades" className="nav-link">View Trades</Link>
                            <Link to="/analytics" className="nav-link">Analytics</Link>
                        </div>
                    </div>
                </nav>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<AddTrade onSuccess={handleTradeSuccess} />} />
                        <Route path="/trades" element={<TradesList key={refreshKey} />} />
                        <Route path="/analytics" element={<Analytics key={refreshKey} />} />
                    </Routes>
                </main>

                <footer className="footer">
                    <p>&copy; 2024 Stock Trading Tracker. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;

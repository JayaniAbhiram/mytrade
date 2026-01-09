# Stock Trading Tracker - React + MySQL

A modern stock trading tracker application built with React, Node.js/Express, and MySQL.

## Features

- 📊 Record and track stock trades
- 📈 View comprehensive analytics and charts
- 🔍 Filter trades by stock, date, and return type
- 💰 Automatic calculation of returns and brokerage
- 📉 Daily, monthly, and stock-wise analysis
- 💻 Responsive UI with modern design

## Project Structure

```
Trading5-React/
├── server/                 # Node.js/Express backend
│   ├── config/            # Database configuration
│   ├── routes/            # API routes
│   ├── server.js          # Express server
│   ├── package.json       # Server dependencies
│   └── .env              # Environment variables
└── client/                # React frontend
    ├── public/            # Public assets
    ├── src/
    │   ├── components/   # React components
    │   ├── App.js        # Main App component
    │   ├── api.js        # API calls
    │   └── index.js      # Entry point
    └── package.json      # Client dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL Server
- macOS (as per your environment)

## Setup Instructions

### Step 1: Create MySQL Database

Open MySQL and run these commands:

```sql
CREATE DATABASE stock_tracker;
USE stock_tracker;

CREATE TABLE trades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trade_date DATE NOT NULL,
    stock_name VARCHAR(50) NOT NULL,
    stock_price_buy DECIMAL(10, 2) NOT NULL,
    num_shares INT NOT NULL,
    total_trade_value_buy DECIMAL(12, 2) NOT NULL,
    amount_invested DECIMAL(12, 2) NOT NULL,
    stock_price_sell DECIMAL(10, 2) NOT NULL,
    total_trade_value_sell DECIMAL(12, 2) NOT NULL,
    total_amount_received DECIMAL(12, 2) NOT NULL,
    returns_trade DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_date (trade_date),
    INDEX idx_stock (stock_name)
);

CREATE TABLE daily_summary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    summary_date DATE UNIQUE NOT NULL,
    total_returns_day DECIMAL(12, 2),
    funds_before_investing DECIMAL(12, 2),
    funds_after_investing DECIMAL(12, 2),
    fund_difference DECIMAL(12, 2),
    brokerage_value DECIMAL(12, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 2: Setup Backend

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/Trading/Trading5-React/server

# Install dependencies
npm install

# Update .env file with your MySQL credentials (if needed)
# The default is already set for XAMPP configuration
```

### Step 3: Setup Frontend

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/Trading/Trading5-React/client

# Install dependencies
npm install
```

## Running the Project

### Option 1: Run Both Backend and Frontend (Recommended for Development)

From the root directory:

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/Trading/Trading5-React
npm install   # Install concurrently package
npm run dev
```

This will:
- Start Express server on http://localhost:5000
- Start React app on http://localhost:3000

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd /Applications/XAMPP/xamppfiles/htdocs/Trading/Trading5-React/server
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd /Applications/XAMPP/xamppfiles/htdocs/Trading/Trading5-React/client
npm install
npm start
```

## API Endpoints

### Trades
- `POST /api/trades` - Create a new trade
- `GET /api/trades` - Get all trades (with filters)
- `DELETE /api/trades/:id` - Delete a trade

### Summary
- `GET /api/summary` - Get daily summaries

### Analytics
- `GET /api/analytics/overview` - Overall statistics
- `GET /api/analytics/stocks` - Stock-wise performance
- `GET /api/analytics/monthly` - Monthly analysis
- `GET /api/analytics/daily-chart` - Daily chart data

## Query Parameters for GET /api/trades

- `stock` - Filter by stock name
- `date_from` - Filter from date (YYYY-MM-DD)
- `date_to` - Filter to date (YYYY-MM-DD)
- `return_type` - Filter by: 'profit', 'loss', 'breakeven'
- `search` - Search by stock name

Example:
```
http://localhost:5000/api/trades?stock=RELIANCE&date_from=2024-01-01&return_type=profit
```

## Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:

```bash
# Find process on port 5000
lsof -ti:5000

# Kill it
kill -9 <PID>
```

### MySQL Connection Error
1. Ensure MySQL is running
2. Check credentials in `server/.env`
3. Verify database `stock_tracker` exists

### React App Won't Load
1. Clear browser cache and cookies
2. Delete `node_modules` in client folder and reinstall
3. Check that backend is running (http://localhost:5000/api/health)

### Module Not Found Errors
```bash
# Reinstall all dependencies
cd client && npm install
cd ../server && npm install
```

## Usage Guide

### Adding a Trade
1. Go to Home (Add Trade)
2. Fill in the trade details:
   - Trade Date
   - Stock Name
   - Buy price and total value
   - Sell price
   - Funds before and after
3. Click "Record Trade"

### Viewing Trades
1. Go to "View Trades"
2. Use filters to search specific trades
3. View summary statistics
4. Delete trades if needed

### Analytics
1. Go to "Analytics"
2. View:
   - Key performance indicators
   - Win/Loss ratio
   - Daily returns trend
   - Monthly returns
   - Stock-wise performance

## Environment Variables

Create or edit `server/.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=stock_tracker
PORT=5000
NODE_ENV=development
```

## Performance Tips

- Use indexes on frequently queried columns (already set)
- Limit data fetch to last 6-12 months for charts
- Cache analytics data if needed

## License

MIT License

## Support

For issues or questions, check the MySQL credentials and ensure both servers are running.

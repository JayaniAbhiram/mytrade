# ✅ Complete Setup & Running Guide

## 🎯 Overview

Your Stock Trading Tracker has been successfully converted from PHP to **React + Node.js + MySQL**. This guide will help you get it running in 10 minutes.

---

## 📋 Prerequisites Check

Before you start, ensure you have:

- ✅ **Node.js** (v14+): Download from [nodejs.org](https://nodejs.org)
- ✅ **MySQL Server** (XAMPP includes it)
- ✅ **XAMPP Running** (MySQL service started)

**Check if installed:**
```bash
node --version
npm --version
```

---

## 🗄️ Step 1: Setup MySQL Database (5 minutes)

### A. Using phpMyAdmin (Easiest for XAMPP)

1. **Start XAMPP** - Open XAMPP Control Panel
2. **Start MySQL** - Click "Start" next to MySQL
3. **Open phpMyAdmin**:
   - Go to: `http://localhost/phpmyadmin`
   - Or in XAMPP CP, click "Admin" next to MySQL

4. **Create Database**:
   - Click "New" in left sidebar
   - Database name: `stock_tracker`
   - Collation: `utf8mb4_unicode_ci`
   - Click "Create"

5. **Create Tables**:
   - Click on `stock_tracker` database
   - Go to "SQL" tab
   - Paste this code:

```sql
-- Trades Table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Daily Summary Table
CREATE TABLE daily_summary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    summary_date DATE UNIQUE NOT NULL,
    total_returns_day DECIMAL(12, 2),
    funds_before_investing DECIMAL(12, 2),
    funds_after_investing DECIMAL(12, 2),
    fund_difference DECIMAL(12, 2),
    brokerage_value DECIMAL(12, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

- Click "Go" to execute
- ✅ Tables created!

### B. Using Terminal (Alternative)

```bash
# Connect to MySQL
mysql -u root -p

# Leave password empty (XAMPP default), just press Enter

# In MySQL prompt, paste:
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE daily_summary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    summary_date DATE UNIQUE NOT NULL,
    total_returns_day DECIMAL(12, 2),
    funds_before_investing DECIMAL(12, 2),
    funds_after_investing DECIMAL(12, 2),
    fund_difference DECIMAL(12, 2),
    brokerage_value DECIMAL(12, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# Type: exit
```

✅ **Database ready!**

---

## 📁 Step 2: Navigate to Project

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/Trading/Trading5-React
```

---

## ⚙️ Step 3: Install Dependencies

### Option A: Quick Start (Recommended)

One command to install everything:

```bash
npm install
```

This installs the `concurrently` package needed to run both servers.

### Option B: Manual Install

**For Backend:**
```bash
cd server
npm install
cd ..
```

**For Frontend:**
```bash
cd client
npm install
cd ..
```

---

## 🚀 Step 4: Run the Project

### Option 1: Run Both Servers Together (EASY)

From `/Applications/XAMPP/xamppfiles/htdocs/Trading/Trading5-React`:

```bash
npm run dev
```

This starts:
- ✅ **Backend** on `http://localhost:5000`
- ✅ **Frontend** on `http://localhost:3000`

The browser will automatically open the app at `http://localhost:3000`

### Option 2: Run Separately (For Debugging)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

---

## 🌐 Access Your App

Open your browser and go to:

```
http://localhost:3000
```

You should see the **Stock Trading Tracker** app!

---

## 📊 Using the Application

### 1️⃣ **Add Trade** (Home Page)
- Fill in trade details:
  - **Trade Date**: Date of the trade
  - **Stock Name**: e.g., RELIANCE, TCS, INFY
  - **Buy Price**: Price per share when buying
  - **Total Buy Value**: Total amount invested
  - **Sell Price**: Price per share when selling
  - **Funds Before/After**: Cash before and after the trade
- Click "Record Trade"

### 2️⃣ **View Trades**
- See all recorded trades
- **Filter by:**
  - Stock name
  - Date range
  - Return type (Profit/Loss/Break Even)
  - Search by stock name
- View summary statistics
- Delete trades if needed

### 3️⃣ **Analytics**
- **KPI Cards**: Overall statistics
- **Win/Loss Breakdown**: Number of winning/losing trades
- **Daily Returns Chart**: Trend over time
- **Monthly Returns**: Performance by month
- **Stock Performance**: Returns by stock

---

## 🔧 Troubleshooting

### ❌ Port 3000 or 5000 Already in Use

**Find and kill process:**
```bash
# For Port 5000 (Backend)
lsof -ti:5000 | xargs kill -9

# For Port 3000 (Frontend)
lsof -ti:3000 | xargs kill -9
```

**Or use different ports:**

Edit `server/server.js`:
```javascript
const PORT = process.env.PORT || 5001; // Change to 5001
```

Edit `client/src/api.js`:
```javascript
const API_BASE = 'http://localhost:5001/api'; // Change to 5001
```

### ❌ "Cannot connect to MySQL"

1. **Check MySQL is running:**
   - Open XAMPP Control Panel
   - Ensure MySQL shows "Running" with green indicator

2. **Check credentials** in `server/.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=      (empty for XAMPP)
   DB_NAME=stock_tracker
   ```

3. **Verify database exists:**
   - Go to `http://localhost/phpmyadmin`
   - Should see `stock_tracker` database

### ❌ npm install fails

```bash
# Clear cache and retry
npm cache clean --force

# Then reinstall
npm install
```

### ❌ "Module not found" errors

```bash
# In root directory
rm -rf node_modules
npm install

# In server directory
cd server
rm -rf node_modules
npm install
cd ..

# In client directory
cd client
rm -rf node_modules
npm install
cd ..
```

### ❌ React app shows blank or won't load

1. **Check backend is running:**
   - Go to `http://localhost:5000/api/health`
   - Should see `{"status":"Server is running"}`

2. **Clear browser cache:**
   - `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)
   - Clear all cache

3. **Restart both servers**

---

## 📝 Project Structure

```
Trading5-React/
├── server/                           # Node.js Backend
│   ├── config/
│   │   └── database.js              # MySQL connection
│   ├── routes/
│   │   ├── trades.js                # Trade CRUD operations
│   │   ├── summary.js               # Daily summary data
│   │   └── analytics.js             # Analytics endpoints
│   ├── server.js                    # Express app
│   ├── package.json                 # Dependencies
│   └── .env                         # Configuration
│
├── client/                           # React Frontend
│   ├── public/
│   │   └── index.html               # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTrade.js          # Form component
│   │   │   ├── TradesList.js        # Data table
│   │   │   └── Analytics.js         # Charts & stats
│   │   ├── api.js                   # API calls
│   │   ├── App.js                   # Main app
│   │   ├── index.js                 # Entry point
│   │   └── index.css                # Styles
│   └── package.json                 # Dependencies
│
├── README.md                        # Full documentation
├── DATABASE_SETUP.md                # DB setup guide
└── COMPLETE_SETUP.md                # This file
```

---

## 🔄 Restarting the Application

### Stop the Application
Press `Ctrl+C` in both terminals

### Start Again
```bash
npm run dev
```

---

## 💾 Backing Up Your Data

All data is stored in MySQL. To backup:

```bash
# Export database
mysqldump -u root stock_tracker > backup.sql

# To restore
mysql -u root stock_tracker < backup.sql
```

---

## 📱 API Endpoints Reference

### Create a Trade
```
POST http://localhost:5000/api/trades
Content-Type: application/json

{
  "trade_date": "2024-01-15",
  "stock_name": "RELIANCE",
  "total_trade_value_buy": 100000,
  "stock_price_buy": 2000,
  "stock_price_sell": 2100,
  "funds_before": 500000,
  "funds_after": 510000
}
```

### Get All Trades
```
GET http://localhost:5000/api/trades?stock=RELIANCE&date_from=2024-01-01&return_type=profit
```

### Get Analytics
```
GET http://localhost:5000/api/analytics/overview
GET http://localhost:5000/api/analytics/stocks
GET http://localhost:5000/api/analytics/monthly
GET http://localhost:5000/api/analytics/daily-chart
```

---

## ✨ Features Included

✅ Add new stock trades  
✅ View all trades with filters  
✅ Delete trades  
✅ Calculate returns automatically  
✅ Daily summaries  
✅ Stock-wise analysis  
✅ Monthly performance  
✅ Win/Loss ratio  
✅ Beautiful UI with charts  
✅ Responsive design (works on mobile)  

---

## 🎓 Learning Path

If you want to understand the code:

1. **Backend**: `server/routes/trades.js` - All trade logic
2. **Frontend**: `client/src/components/AddTrade.js` - Form handling
3. **API**: `client/src/api.js` - Communication between frontend/backend
4. **Charts**: `client/src/components/Analytics.js` - Chart.js integration

---

## 🆘 Need Help?

### Check if MySQL is running:
```bash
mysql -u root -e "SELECT 1"
```

### Check if backend is working:
```bash
curl http://localhost:5000/api/health
```

### View MySQL logs:
```bash
mysql -u root -e "SHOW TABLES IN stock_tracker;"
```

---

## 🎉 Success!

You now have a full-stack application running with:
- **React** frontend
- **Node.js/Express** backend
- **MySQL** database

Happy trading! 📈

---

**Last Updated:** January 2024  
**Version:** 1.0.0

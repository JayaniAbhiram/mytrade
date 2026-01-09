# 🚀 Quick Start Guide - 5 Minute Setup

## What You Need
- ✅ Node.js installed
- ✅ XAMPP running (MySQL)
- ✅ 5 minutes

## 📍 Location
```
/Applications/XAMPP/xamppfiles/htdocs/Trading/Trading5-React
```

---

## 🎯 Step-by-Step (Copy & Paste)

### 1. Create MySQL Database
Go to: `http://localhost/phpmyadmin`

**Copy & Paste in SQL tab:**
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
```

Click "Go" ✅

### 2. Open Terminal & Navigate
```bash
cd /Applications/XAMPP/xamppfiles/htdocs/Trading/Trading5-React
```

### 3. Make Setup Script Executable (Mac Only)
```bash
chmod +x setup.sh
```

### 4. Run Setup (Choose one)

**Mac/Linux:**
```bash
./setup.sh
```

**Windows:**
```bash
setup.bat
```

**Or Manual:**
```bash
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### 5. Start the App
```bash
npm run dev
```

Wait for both servers to start... ✅

### 6. Open Browser
```
http://localhost:3000
```

🎉 **Done!** Your app is running!

---

## 📊 Using Your App

### Add a Trade
1. Go to **"Add Trade"** (home page)
2. Fill in details:
   - Date
   - Stock name (e.g., RELIANCE)
   - Buy price & amount
   - Sell price
   - Funds before/after
3. Click "Record Trade"

### View Trades
1. Click **"View Trades"**
2. See all trades in a table
3. Use filters to search
4. Delete if needed

### See Analytics
1. Click **"Analytics"**
2. View charts and stats
3. See performance by stock

---

## ⚠️ Common Issues

### "Port 3000 already in use"
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9
```

### "Cannot connect to MySQL"
1. Open XAMPP Control Panel
2. Check MySQL is "Running" (green)
3. Verify database exists in phpMyAdmin

### "Module not found"
```bash
rm -rf node_modules
npm install
```

### "npm command not found"
- Install Node.js from: https://nodejs.org

---

## 🔧 If Something Goes Wrong

### Restart Everything
```bash
# Stop current app (Ctrl+C in terminal)

# Kill any hanging processes
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9

# Start fresh
npm run dev
```

### Check Services Running
```bash
# Check backend
curl http://localhost:5000/api/health

# Check MySQL
mysql -u root -e "SELECT 1"
```

---

## 📖 Full Guides

For complete documentation, see:
- **COMPLETE_SETUP.md** - Full step-by-step guide
- **DATABASE_SETUP.md** - Database details
- **README.md** - Full project documentation

---

## ✨ What's New?

Your PHP project converted to:
- ✅ **React** - Modern UI with components
- ✅ **Node.js/Express** - Fast backend server
- ✅ **MySQL** - Same database
- ✅ **Charts** - Beautiful data visualization
- ✅ **Responsive** - Works on phone/tablet
- ✅ **Modern Stack** - Easy to maintain and scale

---

## 🎓 Project Structure
```
Trading5-React/
├── server/           → Node.js backend (port 5000)
├── client/           → React frontend (port 3000)
└── docs/
    ├── COMPLETE_SETUP.md
    ├── DATABASE_SETUP.md
    └── README.md
```

---

## 🆘 Still Stuck?

1. **Check MySQL is running:** XAMPP Control Panel → MySQL → "Start"
2. **Check database exists:** phpMyAdmin → look for "stock_tracker"
3. **Check Node.js:** `node --version` (should be v14+)
4. **Check ports free:** `lsof -i :3000` and `lsof -i :5000`

---

**Enjoy your new Stock Trading Tracker! 📈**

# Database Setup SQL

Run these commands in MySQL to set up your database:

```sql
-- Create Database
CREATE DATABASE stock_tracker;
USE stock_tracker;

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

## Using with MySQL Client

### Option 1: Using MySQL Command Line
```bash
mysql -u root -p
# Enter password (empty for XAMPP default)

# Then paste the SQL above
```

### Option 2: Using phpMyAdmin (Recommended for XAMPP)
1. Go to http://localhost/phpmyadmin
2. Click "New" to create a new database
3. Database name: `stock_tracker`
4. Click "Create"
5. Go to the "SQL" tab
6. Paste the CREATE TABLE statements
7. Execute

### Option 3: Create a SQL file and import
1. Save the SQL above as `setup.sql`
2. Run: `mysql -u root < setup.sql`

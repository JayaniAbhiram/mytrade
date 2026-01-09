# 📁 Project Files Reference

## Root Level Files
```
Trading5-React/
├── 📄 package.json                      (Root dependencies - concurrently)
├── 📄 .gitignore                        (Git ignore file)
├── 📄 README.md                         (Full documentation)
├── 📄 COMPLETE_SETUP.md                 (Complete step-by-step guide)
├── 📄 QUICKSTART.md                     (5-minute quick start)
├── 📄 DATABASE_SETUP.md                 (Database setup guide)
├── 📄 CONVERSION_SUMMARY.md             (What was converted)
├── 📄 FILES_REFERENCE.md                (This file)
├── 🔧 setup.sh                          (Mac/Linux setup script)
└── 🔧 setup.bat                         (Windows setup script)
```

## Server (Backend) Files

### Configuration
```
server/
├── 📄 package.json                      (Server dependencies)
├── 📄 .env                              (Database configuration)
└── 📄 server.js                         (Express app initialization)
```

### Database Configuration
```
server/config/
└── 📄 database.js                       (MySQL connection pool)
```

### API Routes
```
server/routes/
├── 📄 trades.js                         (Trade CRUD operations)
│   ├── POST /api/trades                 (Create trade)
│   ├── GET /api/trades                  (Get all trades)
│   └── DELETE /api/trades/:id           (Delete trade)
├── 📄 summary.js                        (Daily summary data)
│   └── GET /api/summary                 (Get summaries)
└── 📄 analytics.js                      (Analytics endpoints)
    ├── GET /api/analytics/overview      (Overall stats)
    ├── GET /api/analytics/stocks        (Stock performance)
    ├── GET /api/analytics/monthly       (Monthly data)
    └── GET /api/analytics/daily-chart   (Chart data)
```

## Client (Frontend) Files

### Package & Configuration
```
client/
├── 📄 package.json                      (Client dependencies)
└── 📄 .env.local                        (Local environment - optional)
```

### HTML & Entry Point
```
client/public/
└── 📄 index.html                        (HTML template)
```

### React Source Files
```
client/src/
├── 📄 index.js                          (React entry point)
├── 📄 index.css                         (Global styles)
├── 📄 App.js                            (Main app component)
├── 📄 App.css                           (App styles)
└── 📄 api.js                            (API service layer)
```

### React Components
```
client/src/components/
├── 📄 AddTrade.js                       (Trade form component)
├── 📄 AddTrade.css                      (Form styles)
├── 📄 TradesList.js                     (Trades table component)
├── 📄 TradesList.css                    (Table styles)
├── 📄 Analytics.js                      (Analytics dashboard)
└── 📄 Analytics.css                     (Analytics styles)
```

---

## File Purposes

### Backend Files

#### server/server.js
- Initializes Express app
- Sets up middleware (CORS, JSON parsing)
- Registers API routes
- Starts server on port 5000

#### server/config/database.js
- Creates MySQL connection pool
- Manages database connections
- Handles connection errors

#### server/routes/trades.js
- POST /api/trades - Add new trade
- GET /api/trades - Get all trades with filters
- DELETE /api/trades/:id - Remove trade
- Calculates derived values (shares, returns)
- Updates daily summary

#### server/routes/summary.js
- GET /api/summary - Fetch daily summaries

#### server/routes/analytics.js
- GET /api/analytics/overview - Overall statistics
- GET /api/analytics/stocks - Stock performance
- GET /api/analytics/monthly - Monthly trends
- GET /api/analytics/daily-chart - Chart data

### Frontend Files

#### client/src/api.js
- Axios instance setup
- API functions for trades
- API functions for summaries
- API functions for analytics
- Base URL configuration

#### client/src/App.js
- Main application component
- Router setup with React Router
- Navigation bar
- Route definitions
- Footer

#### client/src/components/AddTrade.js
- Form component for adding trades
- Form validation
- API submission
- Success/error messages
- Field state management

#### client/src/components/TradesList.js
- Display all trades in table
- Filter functionality (stock, date, return type)
- Search feature
- Summary statistics
- Delete functionality
- Currency formatting

#### client/src/components/Analytics.js
- KPI cards display
- Win/Loss breakdown
- Daily returns line chart
- Monthly returns bar chart
- Stock performance table
- Chart.js integration

---

## Configuration Files

### server/.env
```
DB_HOST=localhost          # MySQL server
DB_USER=root              # MySQL username
DB_PASSWORD=              # MySQL password (empty for XAMPP)
DB_NAME=stock_tracker     # Database name
PORT=5000                 # Backend port
NODE_ENV=development      # Environment
```

### server/package.json
```json
Dependencies:
- express (4.18.2)
- mysql2 (3.6.0)
- cors (2.8.5)
- dotenv (16.0.3)

Dev Dependencies:
- nodemon (2.0.20)
```

### client/package.json
```json
Dependencies:
- react (18.2.0)
- react-dom (18.2.0)
- react-router-dom (6.8.0)
- axios (1.3.0)
- chart.js (4.2.1)
- react-chartjs-2 (5.2.0)
- react-scripts (5.0.1)
```

### Root package.json
```json
Scripts:
- npm run dev       # Run both backend & frontend
- npm run server    # Run only backend
- npm run client    # Run only frontend
- npm run build     # Build React app

Dependencies:
- concurrently (7.6.0)  # Run multiple commands
```

---

## Documentation Files

### QUICKSTART.md
- 5-minute setup guide
- Copy-paste commands
- Quick troubleshooting
- **Start with this file**

### COMPLETE_SETUP.md
- Detailed step-by-step guide
- Database setup with pictures
- Full troubleshooting section
- API reference
- Feature overview

### DATABASE_SETUP.md
- SQL scripts for database
- phpMyAdmin instructions
- MySQL command line guide
- Table definitions

### README.md
- Project overview
- Features list
- Project structure
- Setup instructions
- API endpoints
- Environment variables
- Deployment tips

### CONVERSION_SUMMARY.md
- What was converted
- Technology stack
- Benefits overview
- File mapping (PHP → React)
- FAQ

### FILES_REFERENCE.md
- This file
- Complete file listing
- File purposes
- Configuration details

---

## How Files Work Together

### Adding a Trade (User Perspective)
```
1. User fills form in AddTrade.js (UI)
   ↓
2. api.js sends POST request to backend
   ↓
3. server/routes/trades.js receives request
   ↓
4. Creates trade record in MySQL database
   ↓
5. Returns success response
   ↓
6. AddTrade.js shows success message
```

### Viewing Trades
```
1. User navigates to TradesList page
   ↓
2. useEffect calls api.js getAllTrades()
   ↓
3. server/routes/trades.js processes GET request
   ↓
4. Fetches trades from database with filters
   ↓
5. Returns JSON array of trades
   ↓
6. TradesList.js renders table with data
```

### Analytics Dashboard
```
1. User navigates to Analytics page
   ↓
2. Component calls multiple analytics APIs
   ↓
3. server/routes/analytics.js processes requests
   ↓
4. Queries database for statistics
   ↓
5. Returns aggregated data
   ↓
6. Analytics.js renders charts and KPI cards
```

---

## Running the Application

### File Execution Flow
```
$ npm run dev
    ↓
    ├─→ server/server.js (Backend on port 5000)
    │   └─→ Loads database connection
    │   └─→ Sets up Express routes
    │   └─→ Listens for requests
    │
    └─→ client/src/index.js (Frontend on port 3000)
        └─→ Loads App.js
        └─→ Sets up React Router
        └─→ Renders UI components
        └─→ Connects to backend via api.js
```

---

## Total Files Created

- **Backend Files**: 6 (server.js + config + 3 route files + .env)
- **Frontend Components**: 6 (3 components + 3 CSS files)
- **Frontend Core**: 4 (App.js, index.js, api.js + CSS files)
- **Configuration**: 4 (2 package.json + 2 .env/.gitignore)
- **Documentation**: 6 (README, guides, reference)
- **Scripts**: 2 (setup.sh, setup.bat)

**Total: 28 new files** created/configured

---

## File Size Overview

```
Backend:
- server.js                 ~300 lines
- trades.js                 ~150 lines
- analytics.js              ~130 lines
- summary.js                 ~50 lines
- database.js                ~30 lines

Frontend:
- App.js                    ~50 lines
- AddTrade.js              ~150 lines
- TradesList.js            ~200 lines
- Analytics.js             ~250 lines
- api.js                    ~40 lines

Styles:
- CSS files                ~600 lines total

Documentation:
- README.md                ~200 lines
- COMPLETE_SETUP.md       ~400 lines
- QUICKSTART.md           ~200 lines
- Other docs              ~300 lines
```

---

## Modification Guide

### To Add a New Field:
1. Edit SQL schema in database
2. Update server/routes/trades.js form handler
3. Update AddTrade.js form
4. Update TradesList.js table columns
5. Update api.js if needed

### To Change Styling:
1. Edit corresponding *.css file
2. No server restart needed (auto-reload)

### To Add New API Endpoint:
1. Create new file in server/routes/
2. Import in server.js
3. Call from client via api.js

### To Add New Component:
1. Create .js and .css files in client/src/components/
2. Add route in App.js
3. Import api.js for data fetching

---

## Next Actions

1. **Run Setup**: `./setup.sh` or `setup.bat`
2. **Create Database**: See QUICKSTART.md
3. **Start App**: `npm run dev`
4. **Open Browser**: `http://localhost:3000`
5. **Start Trading**: Use the app!

---

For questions about any file, refer to the specific guide document listed above.

**Happy coding! 🚀**

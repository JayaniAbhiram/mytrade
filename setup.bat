@echo off
REM Windows Setup Script for Stock Trading Tracker

echo.
echo ================================
echo Stock Trading Tracker - Setup
echo ================================
echo.

REM Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed
    echo Please install from: https://nodejs.org
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] %NODE_VERSION%

REM Check npm
echo Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION%

REM Check MySQL
echo Checking MySQL...
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] MySQL not found in PATH
    echo Make sure XAMPP MySQL is running
)

REM Install dependencies
echo.
echo Installing root dependencies...
call npm install
echo [OK] Root dependencies installed

echo.
echo Installing server dependencies...
cd server
call npm install
cd ..
echo [OK] Server dependencies installed

echo.
echo Installing client dependencies...
cd client
call npm install
cd ..
echo [OK] Client dependencies installed

echo.
echo ================================
echo [OK] Setup Complete!
echo ================================
echo.
echo Next Steps:
echo 1. Create MySQL database (see DATABASE_SETUP.md)
echo 2. Run the application:
echo    npm run dev
echo 3. Open browser to:
echo    http://localhost:3000
echo.
echo For detailed setup, see:
echo COMPLETE_SETUP.md
echo.
pause

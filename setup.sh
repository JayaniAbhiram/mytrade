#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}Stock Trading Tracker - Setup${NC}"
echo -e "${BLUE}================================${NC}\n"

# Check Node.js
echo -e "${YELLOW}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo "Please install from: https://nodejs.org"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version)${NC}"

# Check npm
echo -e "${YELLOW}Checking npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm --version)${NC}"

# Check MySQL
echo -e "${YELLOW}Checking MySQL...${NC}"
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}✗ MySQL is not installed${NC}"
    echo "Please ensure XAMPP MySQL is running"
    exit 1
fi
echo -e "${GREEN}✓ MySQL is available${NC}"

# Install root dependencies
echo -e "\n${YELLOW}Installing root dependencies...${NC}"
npm install 2>/dev/null
echo -e "${GREEN}✓ Root dependencies installed${NC}"

# Install server dependencies
echo -e "\n${YELLOW}Installing server dependencies...${NC}"
cd server
npm install 2>/dev/null
echo -e "${GREEN}✓ Server dependencies installed${NC}"
cd ..

# Install client dependencies
echo -e "\n${YELLOW}Installing client dependencies...${NC}"
cd client
npm install 2>/dev/null
echo -e "${GREEN}✓ Client dependencies installed${NC}"
cd ..

echo -e "\n${BLUE}================================${NC}"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo -e "${BLUE}================================${NC}"

echo -e "\n${YELLOW}Next Steps:${NC}"
echo -e "${BLUE}1. Create MySQL database (see DATABASE_SETUP.md)${NC}"
echo -e "${BLUE}2. Run the application:${NC}"
echo -e "   ${GREEN}npm run dev${NC}"
echo -e "${BLUE}3. Open browser to:${NC}"
echo -e "   ${GREEN}http://localhost:3000${NC}"

echo -e "\n${YELLOW}For detailed setup, see:${NC}"
echo -e "${BLUE}COMPLETE_SETUP.md${NC}\n"

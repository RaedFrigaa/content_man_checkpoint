#!/bin/bash

echo ""
echo "================================================"
echo "  CMS Full-Stack Installation Script"
echo "================================================"
echo ""

cd "$(dirname "$0")"

echo "Installing root dependencies..."
npm install

echo ""
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo ""
echo "================================================"
echo "  Installation Complete!"
echo "================================================"
echo ""
echo "To start development:"
echo "  npm run dev"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo ""

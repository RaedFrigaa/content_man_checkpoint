@echo off
echo.
echo ================================================
echo   CMS Full-Stack Installation Script
echo ================================================
echo.

cd /d %~dp0

echo Installing root dependencies...
call npm install

echo.
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo.
echo ================================================
echo   Installation Complete!
echo ================================================
echo.
echo To start development:
echo   npm run dev
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
pause

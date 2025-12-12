@echo off
echo ========================================
echo ToolHub - Frontend Server Only
echo ========================================
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

cd frontend

if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install frontend dependencies
        cd ..
        pause
        exit /b 1
    )
)

echo Starting Vite development server...
echo.
echo Server will be available at:
echo   http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

cd ..
pause


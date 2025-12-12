@echo off
echo ========================================
echo ToolHub - Installation
echo ========================================
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)

echo Python found!
python --version
echo.

REM Install Python dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    echo Try: pip install --upgrade pip
    pause
    exit /b 1
)

echo.
echo Python dependencies installed!
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo WARNING: Node.js is not installed or not in PATH
    echo React frontend will not work without Node.js
    echo Please install Node.js 16+ from https://nodejs.org/
    echo.
    pause
    exit /b 0
)

echo Node.js found!
node --version
echo.

REM Install React dependencies
cd frontend
if exist package.json (
    echo Installing frontend dependencies...
    call npm install
    
    if errorlevel 1 (
        echo ERROR: Failed to install React dependencies
        cd ..
        pause
        exit /b 1
    )
    
    echo React dependencies installed!
) else (
    echo ERROR: frontend/package.json not found
    echo Frontend may not be set up correctly
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo Installation complete!
echo ========================================
echo.
echo To start development servers:
echo   run_dev.bat
echo.
echo To start production server:
echo   run_prod.bat
echo.
pause

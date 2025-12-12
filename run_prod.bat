@echo off
echo ========================================
echo ToolHub - Production Mode
echo ========================================
echo.

REM Check if Python dependencies are installed
python -c "import fastapi" >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python dependencies not installed
    echo Please run install.bat first
    pause
    exit /b 1
)

REM Check if React build exists
if not exist "frontend\build" (
    echo React build not found. Building...
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
    
    echo Building frontend app...
    call npm run build
    
    if errorlevel 1 (
        echo ERROR: Failed to build React app
        cd ..
        pause
        exit /b 1
    )
    
    cd ..
    echo Build complete!
    echo.
)

echo Starting FastAPI server (serving React build)...
echo Server will be available at: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

python -m uvicorn backend.app:app --host 0.0.0.0 --port 5000

pause

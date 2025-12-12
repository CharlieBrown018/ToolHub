@echo off
echo ========================================
echo ToolHub - Development Mode
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

echo [1/2] Starting FastAPI backend server...
echo Opening in new window: FastAPI Server - Port 5000
start "FastAPI Server - Port 5000" cmd /k "python -m uvicorn backend.app:app --reload --port 5000 --host 0.0.0.0"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Vite development server...
echo Opening in new window: Vite Dev Server - Port 3000

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

start "Vite Dev Server - Port 3000" cmd /k "npm run dev"

cd ..

echo.
echo ========================================
echo Servers Starting!
echo ========================================
echo.
echo Two windows have opened with server logs:
echo   - FastAPI Server (Port 5000)
echo   - Vite Dev Server (Port 3000)
echo.
echo URLs:
echo   FastAPI:    http://localhost:5000
echo   Frontend:   http://localhost:3000
echo   API Docs:   http://localhost:5000/docs
echo.
echo IMPORTANT: Check the server windows for logs and errors!
echo The servers will show their output in those windows.
echo.
echo Press any key to close this window...
echo (Servers will keep running in their own windows)
pause >nul

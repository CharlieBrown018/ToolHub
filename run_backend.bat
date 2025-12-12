@echo off
echo ========================================
echo ToolHub - Backend Server Only
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

echo Starting FastAPI backend server...
echo.
echo Server will be available at:
echo   http://localhost:5000
echo   http://localhost:5000/docs (API Documentation)
echo.
echo Press Ctrl+C to stop the server
echo.

python -m uvicorn backend.app:app --reload --port 5000 --host 0.0.0.0

pause


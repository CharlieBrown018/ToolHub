"""
ToolHub Backend Configuration
"""

from pathlib import Path

# Base directory (backend folder)
BASE_DIR = Path(__file__).parent.parent

# Data directories
UPLOAD_FOLDER = BASE_DIR / 'uploads'
OUTPUT_FOLDER = BASE_DIR / 'outputs'

# Create directories
UPLOAD_FOLDER.mkdir(exist_ok=True)
OUTPUT_FOLDER.mkdir(exist_ok=True)

# Application settings
MAX_CONTENT_LENGTH = 100 * 1024 * 1024  # 100MB
API_VERSION = "2.0.0"

# Frontend paths
FRONTEND_BUILD_DIR = BASE_DIR / 'frontend' / 'build'
FRONTEND_STATIC_DIR = FRONTEND_BUILD_DIR / 'static' if FRONTEND_BUILD_DIR.exists() else None


"""
ToolHub Backend Configuration
Loads configuration from appconfig.json with fallback defaults
"""

import json
from pathlib import Path
from typing import Dict, Any

# Base directory (backend folder)
BASE_DIR = Path(__file__).parent.parent
CONFIG_FILE = BASE_DIR / "appconfig.json"


def load_config() -> Dict[str, Any]:
    """Load configuration from appconfig.json"""
    if CONFIG_FILE.exists():
        try:
            with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Warning: Failed to load config from {CONFIG_FILE}: {e}")
            return get_default_config()
    return get_default_config()


def get_default_config() -> Dict[str, Any]:
    """Get default configuration"""
    return {
        "app": {
            "name": "ToolHub",
            "version": "2.0.0",
            "environment": "development",
            "debug": True
        },
        "server": {
            "host": "0.0.0.0",
            "port": 5000,
            "reload": True,
            "workers": 1
        },
        "logging": {
            "level": "INFO",
            "log_to_file": True,
            "log_to_console": True
        },
        "paths": {
            "uploads": "uploads",
            "outputs": "outputs"
        },
        "limits": {
            "max_content_length_mb": 100,
            "max_file_size_mb": 50,
            "max_files_per_request": 100
        },
        "features": {
            "ocr_enabled": True,
            "tesseract_required": True,
            "weasyprint_enabled": True
        },
        "cors": {
            "allowed_origins": ["*"],
            "allowed_methods": ["*"],
            "allowed_headers": ["*"],
            "allow_credentials": True
        }
    }


# Load configuration
_config = load_config()

# App settings
APP_NAME = _config["app"]["name"]
API_VERSION = _config["app"]["version"]
ENVIRONMENT = _config["app"]["environment"]
DEBUG = _config["app"]["debug"]

# Server settings
SERVER_HOST = _config["server"]["host"]
SERVER_PORT = _config["server"]["port"]
SERVER_RELOAD = _config["server"]["reload"]
SERVER_WORKERS = _config["server"]["workers"]

# Logging settings
LOG_LEVEL = _config["logging"]["level"]
LOG_TO_FILE = _config["logging"]["log_to_file"]
LOG_TO_CONSOLE = _config["logging"]["log_to_console"]

# Paths
UPLOAD_FOLDER = BASE_DIR / _config["paths"]["uploads"]
OUTPUT_FOLDER = BASE_DIR / _config["paths"]["outputs"]

# Create directories
UPLOAD_FOLDER.mkdir(exist_ok=True)
OUTPUT_FOLDER.mkdir(exist_ok=True)

# Limits
MAX_CONTENT_LENGTH = _config["limits"]["max_content_length_mb"] * 1024 * 1024
MAX_FILE_SIZE = _config["limits"]["max_file_size_mb"] * 1024 * 1024
MAX_FILES_PER_REQUEST = _config["limits"]["max_files_per_request"]

# Features
OCR_ENABLED = _config["features"]["ocr_enabled"]
TESSERACT_REQUIRED = _config["features"]["tesseract_required"]
WEASYPRINT_ENABLED = _config["features"]["weasyprint_enabled"]

# CORS
CORS_ORIGINS = _config["cors"]["allowed_origins"]
CORS_METHODS = _config["cors"]["allowed_methods"]
CORS_HEADERS = _config["cors"]["allowed_headers"]
CORS_CREDENTIALS = _config["cors"]["allow_credentials"]

# Frontend paths
FRONTEND_BUILD_DIR = BASE_DIR / 'frontend' / 'build'
FRONTEND_STATIC_DIR = FRONTEND_BUILD_DIR / 'static' if FRONTEND_BUILD_DIR.exists() else None


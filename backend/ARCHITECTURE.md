# ToolHub Backend Architecture

## Overview

ToolHub follows a **layered architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────┐
│         API Routes Layer            │  (FastAPI endpoints)
│    /tools/{tool}/routes.py          │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        Service Layer                 │  (Business logic)
│    /services/{tool}_service.py       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        Utilities Layer               │  (Shared utilities)
│    /utils/{logging,messages}.py      │
└─────────────────────────────────────┘
```

## Directory Structure

```
backend/
├── app.py                    # FastAPI application entry point
├── config.py                 # Configuration loader (from appconfig.json)
├── appconfig.json            # Application configuration
├── ARCHITECTURE.md           # This file
│
├── services/                 # Service Layer (Business Logic)
│   ├── __init__.py
│   └── datavalidator_service.py
│
├── tools/                    # API Routes Layer
│   ├── datavalidator/
│   │   └── routes.py         # API endpoints (thin layer)
│   ├── scan2pdf/
│   ├── documark/
│   └── colorpalette/
│
└── utils/                    # Utilities Layer
    ├── logging.py            # Centralized logging
    └── messages.py            # Message/code configuration
```

## Architecture Layers

### 1. **API Routes Layer** (`/tools/{tool}/routes.py`)

**Purpose**: Handle HTTP requests/responses, input validation

**Responsibilities**:
- Define FastAPI routes and endpoints
- Parse and validate request data (Pydantic models)
- Call service layer methods
- Return HTTP responses
- Log API-level events

**Example**:
```python
@router.post("/validate")
async def validate(request: ValidateRequest):
    logger.info(f"Validation request received for format: {request.format}")
    return service.validate(request.content, request.format)
```

### 2. **Service Layer** (`/services/{tool}_service.py`)

**Purpose**: Business logic, data processing, error handling

**Responsibilities**:
- Implement core business logic
- Handle data transformations
- Manage errors and exceptions
- Log business-level events
- Use message system for standardized responses

**Example**:
```python
class DataValidatorService:
    @staticmethod
    def validate(content: str, format: FormatType) -> Dict[str, Any]:
        logger.info(f"Validating {format.upper()} content")
        # Business logic here
        return {"valid": True, "format": format, "error": None}
```

### 3. **Utilities Layer** (`/utils/`)

**Purpose**: Shared utilities and helpers

#### **Logging** (`utils/logging.py`)
- Centralized logging configuration
- Colored console output
- File logging with rotation
- Structured logging support

**Usage**:
```python
from backend.utils.logging import get_logger
logger = get_logger(__name__)
logger.info("Operation started")
```

#### **Messages** (`utils/messages.py`)
- Centralized message codes
- HTTP status code mapping
- Toast variant mapping
- Standardized response format

**Usage**:
```python
from backend.utils.messages import MessageCode, error_response
raise error_response(MessageCode.MISSING_CONTENT)
```

## Configuration Management

### `appconfig.json`

Centralized configuration file loaded at startup:

```json
{
  "app": {
    "name": "ToolHub",
    "version": "2.0.0",
    "environment": "development",
    "debug": true
  },
  "server": {
    "host": "0.0.0.0",
    "port": 5000,
    "reload": true
  },
  "logging": {
    "level": "INFO",
    "log_to_file": true,
    "log_to_console": true
  },
  "limits": {
    "max_content_length_mb": 100
  }
}
```

### `config.py`

Loads configuration from `appconfig.json` with fallback defaults:
- Environment-specific settings
- Path configurations
- Feature flags
- CORS settings

## Logging System

### Features

1. **Structured Logging**: Consistent format across all modules
2. **Colored Console**: Easy-to-read terminal output
3. **File Logging**: Persistent logs in `logs/` directory
4. **Log Levels**: DEBUG, INFO, WARNING, ERROR, CRITICAL
5. **Module-Specific Loggers**: Each module gets its own logger

### Usage Pattern

```python
from backend.utils.logging import get_logger

logger = get_logger(__name__)

logger.debug("Detailed debug information")
logger.info("General information")
logger.warning("Warning message")
logger.error("Error occurred", exc_info=True)
logger.critical("Critical error")
```

## Message System

### Purpose

Centralized message management similar to tsoa's response configuration:
- Consistent error messages
- HTTP status code mapping
- Toast variant mapping
- Code-based error handling

### Message Codes

```python
class MessageCode(str, Enum):
    SUCCESS = "SUCCESS"
    VALIDATION_SUCCESS = "VALIDATION_SUCCESS"
    VALIDATION_ERROR = "VALIDATION_ERROR"
    MISSING_CONTENT = "MISSING_CONTENT"
    # ... more codes
```

### Usage

```python
from backend.utils.messages import MessageCode, error_response, success_response

# In service layer
raise error_response(MessageCode.MISSING_CONTENT)

# Or return success
return success_response(MessageCode.VALIDATION_SUCCESS, data={...})
```

## Best Practices

### 1. **Route Layer Should Be Thin**
- Routes should only handle HTTP concerns
- Delegate business logic to services
- Keep routes focused on request/response

### 2. **Service Layer Contains Business Logic**
- All data processing happens here
- Services are testable independently
- Services use logging and message system

### 3. **Error Handling**
- Use message system for standardized errors
- Log errors with context
- Return appropriate HTTP status codes

### 4. **Logging**
- Log at appropriate levels
- Include context (format, file size, etc.)
- Use `exc_info=True` for exceptions

### 5. **Configuration**
- Use `appconfig.json` for all settings
- Environment-specific configs via `config.py`
- Never hardcode configuration values

## Example: Adding a New Tool

1. **Create Service** (`services/newtool_service.py`):
```python
from backend.utils.logging import get_logger
from backend.utils.messages import MessageCode, error_response

logger = get_logger(__name__)

class NewToolService:
    @staticmethod
    def process(data: str) -> Dict[str, Any]:
        logger.info("Processing data")
        # Business logic
        return {"result": "success"}
```

2. **Create Routes** (`tools/newtool/routes.py`):
```python
from fastapi import APIRouter
from backend.utils.logging import get_logger
from backend.services.newtool_service import NewToolService

router = APIRouter()
logger = get_logger(__name__)
service = NewToolService()

@router.post("/process")
async def process(request: ProcessRequest):
    logger.info("Process request received")
    return service.process(request.data)
```

3. **Register Router** (`app.py`):
```python
from backend.tools.newtool.routes import router as newtool_router
app.include_router(newtool_router, prefix="/api/tools/newtool", tags=["NewTool"])
```

## Benefits

1. **Separation of Concerns**: Clear boundaries between layers
2. **Testability**: Services can be tested independently
3. **Maintainability**: Easy to locate and modify code
4. **Consistency**: Shared utilities ensure uniform behavior
5. **Scalability**: Easy to add new tools following the pattern
6. **Configuration**: Centralized config management
7. **Logging**: Comprehensive logging across all layers
8. **Error Handling**: Standardized error responses

## Frontend-Backend Communication

For details on how the backend communicates with the frontend, see [`COMMUNICATION_ARCHITECTURE.md`](../COMMUNICATION_ARCHITECTURE.md).

**Quick Summary**:
- Frontend: Components → Hooks → Services → Base API Client → HTTP
- Backend: HTTP → Routes → Services → Utilities → Response
- Communication: RESTful API with JSON payloads
- Type Safety: TypeScript interfaces ↔ Pydantic models
- Error Handling: Backend message system → Frontend toast notifications


# ToolHub Backend Documentation

FastAPI backend for ToolHub - A unified platform for file conversion and utility tools.

## 📁 Structure

```
backend/
├── app.py                 # Main FastAPI application
├── config.py             # Configuration and paths
├── tools/                 # Tool modules
│   ├── scan2pdf/        # Scan2PDF tool
│   │   ├── __init__.py
│   │   └── routes.py    # API routes
│   └── documark/        # DocuMark tool
│       ├── __init__.py
│       └── routes.py    # API routes
└── utils/                # Shared utilities
    └── image_converter.py # Image/PDF conversion logic
```

## 🚀 Getting Started

### Installation

```bash
pip install -r requirements.txt
```

### Running the Server

**Development:**
```bash
python -m uvicorn backend.app:app --reload --port 5000
```

**Production:**
```bash
python -m uvicorn backend.app:app --host 0.0.0.0 --port 5000
```

## 🏗️ Architecture

### Main Application (`app.py`)

- Creates FastAPI app instance
- Configures CORS middleware
- Registers tool routers
- Serves React build in production
- Provides API endpoints for tools list and health check

### Configuration (`config.py`)

Centralized configuration:
- Base directory paths
- Upload/output folder paths
- Max content length
- Frontend build paths
- API version

### Tool Modules (`tools/`)

Each tool is a self-contained module:
- **scan2pdf/** - Image to PDF OCR converter
- **documark/** - Markdown to PDF converter

Each tool module contains:
- `routes.py` - FastAPI router with endpoints
- `__init__.py` - Package initialization

### Shared Utilities (`utils/`)

- `image_converter.py` - Core image/PDF conversion logic
  - Tesseract OCR integration
  - PDF creation from images
  - PDF OCR processing

## 🔌 API Endpoints

### Tools API

#### `GET /api/tools`
Returns list of all available tools.

**Response:**
```json
[
  {
    "id": "image-to-pdf",
    "title": "Scan2PDF",
    "display_name": "Scan2PDF",
    "description": "Convert images and PDFs to searchable PDFs",
    "icon": "fas fa-image",
    "color": "blue",
    "features": ["Batch processing", "OCR text layer"],
    "route": "/tools/image-to-pdf"
  }
]
```

#### `GET /api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "version": "2.0.0"
}
```

### Scan2PDF API

#### `GET /api/tools/image-to-pdf/status`
Check Tesseract OCR availability.

**Response:**
```json
{
  "tesseract_available": true,
  "tesseract_path": "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"
}
```

#### `POST /api/tools/image-to-pdf/convert`
Convert images/PDFs to searchable PDFs.

**Request Body:**
```json
{
  "input_files": ["path/to/file1.png", "path/to/file2.jpg"],
  "input_path": "",
  "output_path": "path/to/output",
  "skip_existing": true,
  "combine_pdfs": false
}
```

**Response:** Server-Sent Events (SSE) stream with progress updates.

**Event Types:**
- `progress` - Conversion progress
- `file_start` - File processing started
- `file_complete` - File processing completed
- `combining` - Combining PDFs
- `complete` - All files processed
- `error` - Error occurred

#### `POST /api/tools/image-to-pdf/browse-files`
Open native file picker (Windows).

**Response:**
```json
{
  "success": true,
  "files": ["path/to/file1.png", "path/to/file2.jpg"],
  "path": "path/to/parent"
}
```

#### `POST /api/tools/image-to-pdf/browse-folder`
Open native folder picker (Windows).

**Response:**
```json
{
  "success": true,
  "path": "path/to/folder"
}
```

#### `POST /api/tools/image-to-pdf/upload-files`
Upload files via drag-and-drop.

**Request:** Multipart form data with `files` field.

**Response:**
```json
{
  "success": true,
  "files": ["uploads/file1.png", "uploads/file2.jpg"]
}
```

#### `GET /api/tools/image-to-pdf/preview-pdf`
Preview a PDF file.

**Query Parameters:**
- `path` - Path to PDF file

**Response:** PDF file stream

### DocuMark API

#### `POST /api/tools/md-to-pdf/convert`
Convert markdown file to PDF.

**Request:** Multipart form data with `file` field (.md, .markdown, or .txt)

**Response:** PDF file download

#### `POST /api/tools/md-to-pdf/convert-text`
Convert markdown text to PDF.

**Request Body:**
```json
{
  "content": "# Markdown content here..."
}
```

**Response:** PDF file download

## 🔧 Adding a New Tool

### Step 1: Create Tool Module

```bash
backend/tools/your_tool/
├── __init__.py
└── routes.py
```

### Step 2: Create Routes

```python
# backend/tools/your_tool/routes.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/status")
async def status():
    return {"status": "ok"}

@router.post("/process")
async def process(data: YourRequestModel):
    # Your logic here
    return {"result": "success"}
```

### Step 3: Register Router

```python
# backend/app.py
from backend.tools.your_tool.routes import router as your_tool_router

app.include_router(
    your_tool_router,
    prefix="/api/tools/your-tool",
    tags=["Your Tool"]
)
```

### Step 4: Add to Tools List

```python
# backend/app.py - get_tools() function
{
    'id': 'your-tool',
    'title': 'Your Tool',
    'display_name': 'Your Tool',
    'description': 'Tool description',
    'icon': 'fas fa-icon',
    'color': 'blue',
    'features': ['Feature 1', 'Feature 2'],
    'route': '/tools/your-tool'
}
```

## 📦 Dependencies

See `requirements.txt` for full list:

- **fastapi** - Web framework
- **uvicorn** - ASGI server
- **pydantic** - Data validation
- **pytesseract** - OCR library
- **Pillow** - Image processing
- **PyPDF2** - PDF manipulation
- **markdown** - Markdown parsing
- **weasyprint** - HTML to PDF
- **werkzeug** - Utilities

## 🎯 Design Principles

### Separation of Concerns (SOC)
- Each tool is a separate module
- Shared utilities in `utils/`
- Configuration centralized in `config.py`

### Don't Repeat Yourself (DRY)
- Shared conversion logic in `utils/`
- Reusable configuration
- Common patterns abstracted

### Type Safety
- Pydantic models for request/response validation
- Type hints throughout
- FastAPI auto-generates OpenAPI schema

## 🔍 Code Examples

### Creating a Route with Pydantic Model

```python
from pydantic import BaseModel
from fastapi import APIRouter

router = APIRouter()

class ProcessRequest(BaseModel):
    input: str
    options: dict = {}

@router.post("/process")
async def process(request: ProcessRequest):
    # Type-safe access to request.input and request.options
    return {"result": f"Processed {request.input}"}
```

### Streaming Response (SSE)

```python
from fastapi.responses import StreamingResponse
import json

@router.post("/stream")
async def stream():
    async def generate():
        for i in range(10):
            yield f"data: {json.dumps({'progress': i * 10})}\n\n"
            await asyncio.sleep(1)
    
    return StreamingResponse(generate(), media_type='text/event-stream')
```

## 🐛 Troubleshooting

**Import errors:**
- Ensure you're running from project root
- Check Python path includes project root
- Verify all dependencies installed

**Tesseract not found:**
- Install Tesseract OCR
- Check paths in `utils/image_converter.py`
- Tool will work without OCR but with limited functionality

**Port already in use:**
- Change port in uvicorn command
- Or kill process using port 5000

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [Uvicorn Documentation](https://www.uvicorn.org/)


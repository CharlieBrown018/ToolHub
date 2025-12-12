"""
ToolHub - FastAPI Backend
A unified platform for various file conversion and utility tools
"""

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from backend.config import (
    BASE_DIR, UPLOAD_FOLDER, OUTPUT_FOLDER, MAX_CONTENT_LENGTH,
    API_VERSION, FRONTEND_BUILD_DIR, FRONTEND_STATIC_DIR
)
from backend.tools.scan2pdf.routes import router as scan2pdf_router
from backend.tools.documark.routes import router as documark_router
from backend.tools.datavalidator.routes import router as datavalidator_router
from backend.tools.colorpalette.routes import router as colorpalette_router

# Create FastAPI app
app = FastAPI(
    title="ToolHub",
    version=API_VERSION,
    description="A unified platform for file conversion and utility tools"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store config in app state
app.state.upload_folder = UPLOAD_FOLDER
app.state.output_folder = OUTPUT_FOLDER
app.state.max_content_length = MAX_CONTENT_LENGTH

# Register tool routers
app.include_router(scan2pdf_router, prefix="/api/tools/image-to-pdf", tags=["Scan2PDF"])
app.include_router(documark_router, prefix="/api/tools/md-to-pdf", tags=["DocuMark"])
app.include_router(datavalidator_router, prefix="/api/tools/data-validator", tags=["DataValidator"])
app.include_router(colorpalette_router, prefix="/api/tools/color-palette", tags=["ColorPalette"])

# Serve static files (for React build in production)
if FRONTEND_STATIC_DIR and FRONTEND_STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(FRONTEND_STATIC_DIR)), name="static")

# API routes
@app.get("/api/tools")
async def get_tools():
    """Get list of available tools"""
    return [
        {
            'id': 'image-to-pdf',
            'title': 'Scan2PDF',
            'display_name': 'Scan2PDF',
            'description': 'Convert images and PDFs to searchable PDFs with OCR technology',
            'icon': 'fas fa-image',
            'color': 'blue',
            'features': ['Batch processing', 'OCR text layer', 'Multiple formats'],
            'route': '/tools/image-to-pdf'
        },
        {
            'id': 'md-to-pdf',
            'title': 'DocuMark',
            'display_name': 'DocuMark',
            'description': 'Convert Markdown files to beautifully formatted PDF documents',
            'icon': 'fas fa-file-alt',
            'color': 'green',
            'features': ['Syntax highlighting', 'Custom styling', 'Table support'],
            'route': '/tools/md-to-pdf',
            'available': True  # Will be set based on WeasyPrint availability
        },
        {
            'id': 'data-validator',
            'title': 'DataValidator',
            'display_name': 'DataValidator',
            'description': 'Validate and convert between JSON, XML, YAML, CSV, and TOML formats',
            'icon': 'fas fa-check-circle',
            'color': 'purple',
            'features': ['Multi-format validation', 'Format conversion', 'Beautify & minify'],
            'route': '/tools/data-validator'
        },
        {
            'id': 'color-palette',
            'title': 'ColorPalette',
            'display_name': 'ColorPalette',
            'description': 'Generate beautiful color palettes from images using AI-powered extraction',
            'icon': 'fas fa-palette',
            'color': 'orange',
            'features': ['Image upload', 'Dominant colors', 'Vibrant extraction'],
            'route': '/tools/color-palette'
        }
    ]

@app.get("/api/health")
async def health():
    """Health check endpoint"""
    return {"status": "ok", "version": API_VERSION}

# Serve React app for all non-API routes (production)
@app.get("/{full_path:path}", response_class=HTMLResponse)
async def serve_react(full_path: str):
    """
    Serve React app for all routes except API routes.
    In production, this serves the React build.
    In development, React dev server handles routing.
    """
    # Don't serve React for API routes
    if full_path.startswith("api"):
        return {"error": "Not found"}
    
    # Serve React index.html
    react_index = FRONTEND_BUILD_DIR / "index.html"
    if react_index.exists():
        return FileResponse(react_index)
    
    # Fallback: return simple HTML if React build doesn't exist
    return HTMLResponse(content="""
    <!DOCTYPE html>
    <html>
    <head>
        <title>ToolHub</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <h1>ToolHub</h1>
        <p>React frontend not built. Run <code>npm run build</code> in the frontend directory.</p>
        <p>For development, start React dev server separately.</p>
    </body>
    </html>
    """)

if __name__ == '__main__':
    import uvicorn
    print("\n" + "="*60)
    print("🚀 ToolHub FastAPI Server Starting...")
    print("="*60)
    print(f"📁 Base Directory: {BASE_DIR}")
    print(f"📤 Upload Folder: {UPLOAD_FOLDER}")
    print(f"📥 Output Folder: {OUTPUT_FOLDER}")
    print("\n🌐 Server URLs:")
    print("📍 API Docs: http://localhost:5000/docs")
    print("📍 ToolHub: http://localhost:5000")
    print("📍 Scan2PDF API: http://localhost:5000/api/tools/image-to-pdf")
    print("📍 DocuMark API: http://localhost:5000/api/tools/md-to-pdf")
    print("\n" + "="*60 + "\n")
    
    uvicorn.run(
        "backend.app:app",
        host="0.0.0.0",
        port=5000,
        reload=True
    )


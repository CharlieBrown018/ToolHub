"""
DocuMark - FastAPI Routes
Markdown to PDF Converter
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path
import markdown
import tempfile

# Try to import WeasyPrint (requires GTK+ on Windows)
try:
    from weasyprint import HTML
    from weasyprint.text.fonts import FontConfiguration
    WEASYPRINT_AVAILABLE = True
except (ImportError, OSError) as e:
    WEASYPRINT_AVAILABLE = False
    WEASYPRINT_ERROR = str(e)

router = APIRouter()

@router.get("/status")
async def status():
    """Get DocuMark status"""
    return {
        'weasyprint_available': WEASYPRINT_AVAILABLE,
        'error': WEASYPRINT_ERROR if not WEASYPRINT_AVAILABLE else None
    }

class ConvertTextRequest(BaseModel):
    content: str

ALLOWED_EXTENSIONS = {'.md', '.markdown', '.txt'}

def allowed_file(filename):
    return Path(filename).suffix.lower() in ALLOWED_EXTENSIONS

def markdown_to_pdf(md_content, output_path, style=None):
    """Convert markdown content to PDF"""
    if not WEASYPRINT_AVAILABLE:
        error_msg = WEASYPRINT_ERROR if 'WEASYPRINT_ERROR' in globals() else 'Please install GTK+ libraries for Windows.'
        return False, f"WeasyPrint is not available. {error_msg}"
    
    try:
        md_extensions = [
            'codehilite',
            'tables',
            'fenced_code',
            'toc',
            'nl2br'
        ]
        
        html_content = markdown.markdown(
            md_content,
            extensions=md_extensions
        )
        
        html_template = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                {style or get_default_css()}
            </style>
        </head>
        <body>
            {html_content}
        </body>
        </html>
        """
        
        font_config = FontConfiguration()
        HTML(string=html_template).write_pdf(
            output_path,
            font_config=font_config
        )
        
        return True, None
    except Exception as e:
        return False, str(e)

def get_default_css():
    """Get default CSS styling for PDF"""
    return """
        @page {
            size: A4;
            margin: 2cm;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        h1, h2, h3, h4, h5, h6 {
            color: #2c3e50;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }
        
        h1 { font-size: 2em; border-bottom: 2px solid #3498db; padding-bottom: 0.3em; }
        h2 { font-size: 1.5em; border-bottom: 1px solid #e0e0e0; padding-bottom: 0.3em; }
        h3 { font-size: 1.25em; }
        
        code {
            background-color: #f4f4f4;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        
        pre {
            background-color: #f4f4f4;
            padding: 1em;
            border-radius: 5px;
            overflow-x: auto;
            border-left: 4px solid #3498db;
        }
        
        pre code {
            background-color: transparent;
            padding: 0;
        }
        
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
        }
        
        table th, table td {
            border: 1px solid #ddd;
            padding: 0.75em;
            text-align: left;
        }
        
        table th {
            background-color: #3498db;
            color: white;
            font-weight: 600;
        }
        
        table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        blockquote {
            border-left: 4px solid #3498db;
            margin: 1em 0;
            padding-left: 1em;
            color: #666;
            font-style: italic;
        }
        
        a {
            color: #3498db;
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        img {
            max-width: 100%;
            height: auto;
        }
        
        ul, ol {
            margin: 1em 0;
            padding-left: 2em;
        }
        
        li {
            margin: 0.5em 0;
        }
    """

@router.post("/convert")
async def convert(file: UploadFile = File(...)):
    """Convert markdown file to PDF"""
    try:
        if not file.filename:
            raise HTTPException(status_code=400, detail='No file selected')
        
        if not allowed_file(file.filename):
            raise HTTPException(status_code=400, detail='Invalid file type. Please upload .md, .markdown, or .txt files')
        
        # Read markdown content
        md_content = (await file.read()).decode('utf-8')
        
        # Generate output filename
        input_filename = file.filename
        output_filename = Path(input_filename).stem + '.pdf'
        output_path = Path(tempfile.gettempdir()) / output_filename
        
        # Convert to PDF
        success, error = markdown_to_pdf(md_content, str(output_path))
        
        if not success:
            raise HTTPException(status_code=500, detail=f'Conversion failed: {error}')
        
        # Return PDF file
        return FileResponse(
            str(output_path),
            media_type='application/pdf',
            filename=output_filename
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error: {str(e)}')

@router.post("/convert-text")
async def convert_text(request: ConvertTextRequest):
    """Convert markdown text to PDF"""
    try:
        md_content = request.content
        
        if not md_content:
            raise HTTPException(status_code=400, detail='No content provided')
        
        # Generate output filename
        output_filename = 'markdown_output.pdf'
        output_path = Path(tempfile.gettempdir()) / output_filename
        
        # Convert to PDF
        success, error = markdown_to_pdf(md_content, str(output_path))
        
        if not success:
            raise HTTPException(status_code=500, detail=f'Conversion failed: {error}')
        
        # Return PDF file
        return FileResponse(
            str(output_path),
            media_type='application/pdf',
            filename=output_filename
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error: {str(e)}')


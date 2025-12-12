"""
Scan2PDF - FastAPI Routes
Image to PDF OCR Converter
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse, FileResponse
from pydantic import BaseModel
from pathlib import Path
import json
import os
import tkinter as tk
from tkinter import filedialog
from werkzeug.utils import secure_filename
from PyPDF2 import PdfReader, PdfWriter
from typing import Optional, List

from backend.utils.image_converter import (
    create_searchable_pdf, tesseract_available, find_tesseract
)
from backend.config import UPLOAD_FOLDER

router = APIRouter()

class ConvertRequest(BaseModel):
    input_files: Optional[List[str]] = []
    input_path: Optional[str] = ''
    output_path: str
    skip_existing: bool = True
    combine_pdfs: bool = False

@router.get("/status")
async def status():
    """Get system status"""
    return {
        'tesseract_available': tesseract_available,
        'tesseract_path': find_tesseract() or 'Not found'
    }

@router.post("/convert")
async def convert(convert_request: ConvertRequest):
    """Convert images to PDF with real-time progress via SSE"""
    async def generate():
        try:
            data = convert_request.dict()
            input_files = data.get('input_files', [])
            input_path = data.get('input_path', '')
            output_path = data.get('output_path')
            skip_existing = data.get('skip_existing', True)
            combine_pdfs = data.get('combine_pdfs', False)
            
            if not output_path:
                yield f"data: {json.dumps({'type': 'error', 'error': 'Output path is required'})}\n\n"
                return
            
            supported_extensions = {'.png', '.jpg', '.jpeg', '.bmp', '.tiff', '.tif', '.gif', '.pdf'}
            input_files_list = []
            
            if input_files:
                input_files_list = [Path(f) for f in input_files if Path(f).suffix.lower() in supported_extensions]
            elif input_path:
                input_path_obj = Path(input_path)
                if input_path_obj.is_file():
                    if input_path_obj.suffix.lower() in supported_extensions:
                        input_files_list = [input_path_obj]
                elif input_path_obj.is_dir():
                    input_files_list = sorted([f for f in input_path_obj.iterdir() 
                                         if f.suffix.lower() in supported_extensions], reverse=True)
                else:
                    yield f"data: {json.dumps({'type': 'error', 'error': 'Input path does not exist'})}\n\n"
                    return
            else:
                yield f"data: {json.dumps({'type': 'error', 'error': 'Input files or path is required'})}\n\n"
                return
            
            if not input_files_list:
                yield f"data: {json.dumps({'type': 'error', 'error': 'No supported files found'})}\n\n"
                return
            
            output_dir = Path(output_path)
            output_dir.mkdir(parents=True, exist_ok=True)
            
            total_files = len(input_files_list)
            successful = 0
            failed = 0
            skipped = 0
            files = []
            successful_pdf_paths = []
            
            yield f"data: {json.dumps({'type': 'progress', 'current': 0, 'total': total_files, 'percent': 0})}\n\n"
            
            for idx, file_path in enumerate(input_files_list):
                if file_path.suffix.lower() == '.pdf':
                    pdf_name = file_path.stem + '_ocr.pdf'
                else:
                    pdf_name = file_path.stem + '.pdf'
                pdf_path = output_dir / pdf_name
                
                input_file_name = file_path.name
                yield f"data: {json.dumps({'type': 'file_start', 'file': input_file_name, 'index': idx + 1, 'total': total_files})}\n\n"
                
                success, message = create_searchable_pdf(file_path, pdf_path, skip_if_exists=skip_existing)
                
                if success:
                    if "already exists" in message.lower() or "skipped" in message.lower():
                        skipped += 1
                        file_status = 'skipped'
                        if pdf_path.exists():
                            successful_pdf_paths.append(pdf_path)
                    else:
                        successful += 1
                        file_status = 'success'
                        successful_pdf_paths.append(pdf_path)
                else:
                    failed += 1
                    file_status = 'failed'
                
                files.append({
                    'name': pdf_name,
                    'status': file_status,
                    'message': message
                })
                
                progress_percent = int(((idx + 1) / total_files) * 100)
                output_file_path = str(pdf_path) if file_status in ['success', 'skipped'] else None
                yield f"data: {json.dumps({'type': 'file_complete', 'file': input_file_name, 'output_file': pdf_name, 'output_path': output_file_path, 'status': file_status, 'message': message, 'current': idx + 1, 'total': total_files, 'percent': progress_percent})}\n\n"
            
            # Combine PDFs if requested
            if combine_pdfs and successful_pdf_paths:
                try:
                    successful_pdf_paths = sorted(successful_pdf_paths, reverse=True)
                    combined_path = output_dir / 'combined.pdf'
                    
                    yield f"data: {json.dumps({'type': 'combining', 'message': f'Combining {len(successful_pdf_paths)} PDFs...'})}\n\n"
                    
                    writer = PdfWriter()
                    for pdf_path in successful_pdf_paths:
                        reader = PdfReader(str(pdf_path))
                        for page in reader.pages:
                            writer.add_page(page)
                    
                    with open(combined_path, 'wb') as f:
                        writer.write(f)
                    
                    files.append({
                        'name': 'combined.pdf',
                        'status': 'success',
                        'message': f'Combined {len(successful_pdf_paths)} PDFs'
                    })
                    
                    yield f"data: {json.dumps({'type': 'combined', 'file': 'combined.pdf', 'output_path': str(combined_path), 'count': len(successful_pdf_paths)})}\n\n"
                except Exception as e:
                    yield f"data: {json.dumps({'type': 'error', 'error': f'Failed to combine PDFs: {str(e)}'})}\n\n"
            
            yield f"data: {json.dumps({'type': 'complete', 'successful': successful, 'failed': failed, 'skipped': skipped, 'total': total_files, 'files': files})}\n\n"
            
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'error': str(e)})}\n\n"
    
    return StreamingResponse(generate(), media_type='text/event-stream')

@router.post("/browse-files")
async def browse_files():
    """Open native file picker for files"""
    try:
        root = tk.Tk()
        root.withdraw()
        root.attributes('-topmost', True)
        
        files = filedialog.askopenfilenames(
            title="Select Image or PDF Files",
            filetypes=[
                ("Image and PDF files", "*.png *.jpg *.jpeg *.bmp *.tiff *.tif *.gif *.pdf"),
                ("Image files", "*.png *.jpg *.jpeg *.bmp *.tiff *.tif *.gif"),
                ("PDF files", "*.pdf"),
                ("All files", "*.*")
            ]
        )
        
        root.destroy()
        
        if files:
            return {
                'success': True,
                'files': list(files),
                'path': str(Path(files[0]).parent) if files else ''
            }
        else:
            return {'success': False, 'message': 'No files selected'}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload-files")
async def upload_files(files: list[UploadFile] = File(...)):
    """Upload files from drag-and-drop"""
    try:
        if not files:
            raise HTTPException(status_code=400, detail='No files provided')
        
        uploaded_files = []
        for file in files:
            if file.filename:
                filename = secure_filename(file.filename)
                filepath = UPLOAD_FOLDER / filename
                contents = await file.read()
                with open(filepath, 'wb') as f:
                    f.write(contents)
                uploaded_files.append(str(filepath))
        
        return {
            'success': True,
            'files': uploaded_files
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/browse-folder")
async def browse_folder():
    """Open native folder picker"""
    try:
        root = tk.Tk()
        root.withdraw()
        root.attributes('-topmost', True)
        
        folder = filedialog.askdirectory(title="Select Folder")
        root.destroy()
        
        if folder:
            return {
                'success': True,
                'path': folder
            }
        else:
            return {'success': False, 'message': 'No folder selected'}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/preview-pdf")
async def preview_pdf(path: str):
    """Preview PDF file"""
    try:
        file_path = Path(path)
        if not file_path.exists():
            raise HTTPException(status_code=404, detail='File not found')
        
        if not file_path.suffix.lower() == '.pdf':
            raise HTTPException(status_code=400, detail='Only PDF files can be previewed')
        
        return FileResponse(
            str(file_path),
            media_type='application/pdf',
            filename=file_path.name
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


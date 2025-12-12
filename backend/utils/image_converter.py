"""
Image to PDF OCR Converter - Core Logic
Shared utility module for image-to-pdf conversion
"""

import os
from pathlib import Path
from PIL import Image
import pytesseract
import img2pdf
from PyPDF2 import PdfReader, PdfWriter
from io import BytesIO

try:
    from pdf2image import convert_from_path
    PDF2IMAGE_AVAILABLE = True
except ImportError:
    PDF2IMAGE_AVAILABLE = False

def get_tesseract_paths():
    """Get list of possible Tesseract installation paths"""
    username = os.getenv('USERNAME', '')
    paths = [
        r'C:\Program Files\Tesseract-OCR\tesseract.exe',
        r'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe',
        r'C:\Users\{}\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'.format(username),
        r'C:\ProgramData\chocolatey\bin\tesseract.exe',
    ]
    local_app_data = os.getenv('LOCALAPPDATA', '')
    if local_app_data:
        paths.append(os.path.join(local_app_data, r'Programs\Tesseract-OCR\tesseract.exe'))
    return paths

def find_tesseract():
    """Find Tesseract OCR executable"""
    for path in get_tesseract_paths():
        if os.path.exists(path):
            pytesseract.pytesseract.tesseract_cmd = path
            return path
    
    try:
        pytesseract.get_tesseract_version()
        return "found in PATH"
    except:
        pass
    
    return None

# Check Tesseract availability
tesseract_available = find_tesseract() is not None

def create_searchable_pdf_from_image(image_path, output_path, skip_if_exists=True):
    """Create a searchable PDF from an image using OCR"""
    if skip_if_exists and Path(output_path).exists():
        try:
            if Path(output_path).stat().st_size > 0:
                return True, "PDF already exists (skipped)"
        except Exception:
            pass
    
    if not Path(image_path).exists():
        return False, "Source image file not found"
    
    try:
        with Image.open(image_path) as test_img:
            test_img.verify()
    except Exception as e:
        return False, f"Invalid or corrupted image: {str(e)}"
    
    try:
        img = Image.open(image_path)
        
        if not tesseract_available:
            with open(output_path, 'wb') as f:
                f.write(img2pdf.convert(str(image_path)))
            return True, "PDF created without OCR (Tesseract not available)"
        
        try:
            pdf_bytes = pytesseract.image_to_pdf_or_hocr(img, extension='pdf')
            with open(output_path, 'wb') as f:
                f.write(pdf_bytes)
            
            if Path(output_path).exists() and Path(output_path).stat().st_size > 0:
                return True, "Searchable PDF created successfully"
            else:
                return False, "PDF file was not created properly"
        except Exception as e:
            try:
                with open(output_path, 'wb') as f:
                    f.write(img2pdf.convert(str(image_path)))
                return True, f"PDF created without OCR (OCR failed)"
            except Exception as e2:
                return False, f"Failed to create PDF: {str(e2)}"
    except Exception as e:
        return False, f"Error processing image: {str(e)}"

def create_searchable_pdf_from_pdf(pdf_path, output_path, skip_if_exists=True):
    """Create a searchable PDF from a non-searchable PDF using OCR"""
    if skip_if_exists and Path(output_path).exists():
        try:
            if Path(output_path).stat().st_size > 0:
                return True, "PDF already exists (skipped)"
        except Exception:
            pass
    
    if not Path(pdf_path).exists():
        return False, "Source PDF file not found"
    
    if not tesseract_available:
        return False, "Tesseract OCR not available - cannot process PDF"
    
    if not PDF2IMAGE_AVAILABLE:
        return False, "pdf2image library not installed"
    
    try:
        images = convert_from_path(str(pdf_path), dpi=300)
        
        if not images:
            return False, "No pages found in PDF"
        
        ocr_pdfs = []
        for i, img in enumerate(images):
            try:
                pdf_bytes = pytesseract.image_to_pdf_or_hocr(img, extension='pdf')
                ocr_pdfs.append(pdf_bytes)
            except Exception as e:
                try:
                    temp_path = Path(output_path).parent / f"temp_page_{i}.pdf"
                    with open(temp_path, 'wb') as f:
                        f.write(img2pdf.convert(img))
                    with open(temp_path, 'rb') as f:
                        ocr_pdfs.append(f.read())
                    temp_path.unlink()
                except:
                    return False, f"Failed to process page {i+1}: {str(e)}"
        
        writer = PdfWriter()
        for pdf_bytes in ocr_pdfs:
            reader = PdfReader(BytesIO(pdf_bytes))
            for page in reader.pages:
                writer.add_page(page)
        
        with open(output_path, 'wb') as f:
            writer.write(f)
        
        if Path(output_path).exists() and Path(output_path).stat().st_size > 0:
            return True, f"Searchable PDF created from {len(images)} page(s)"
        else:
            return False, "PDF file was not created properly"
            
    except Exception as e:
        return False, f"Error processing PDF: {str(e)}"

def create_searchable_pdf(input_path, output_path, skip_if_exists=True):
    """Create a searchable PDF from an image or PDF file"""
    input_path = Path(input_path)
    
    if input_path.suffix.lower() == '.pdf':
        return create_searchable_pdf_from_pdf(input_path, output_path, skip_if_exists)
    else:
        return create_searchable_pdf_from_image(input_path, output_path, skip_if_exists)


"""
DataValidator - Validate and convert JSON, XML, YAML, CSV, TOML
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Literal
from backend.utils.logging import get_logger
from backend.utils.responses import api_success_response, api_error_response
from backend.utils.messages import MessageCode
from backend.services.datavalidator_service import DataValidatorService, TOML_AVAILABLE

router = APIRouter()
logger = get_logger(__name__)
service = DataValidatorService()

class ValidateRequest(BaseModel):
    content: str
    format: Literal['json', 'xml', 'yaml', 'csv', 'toml']

class ConvertRequest(BaseModel):
    content: str
    from_format: Literal['json', 'xml', 'yaml', 'csv', 'toml']
    to_format: Literal['json', 'xml', 'yaml', 'csv', 'toml']
    options: Optional[dict] = None

class FormatRequest(BaseModel):
    content: str
    format: Literal['json', 'xml', 'yaml']
    indent: Optional[int] = 2

@router.get("/status")
async def status():
    """Check available formats"""
    logger.info("Checking available formats")
    return api_success_response(
        MessageCode.SUCCESS,
        data={
            "formats": {
                "json": True,
                "xml": True,
                "yaml": True,
                "csv": True,
                "toml": TOML_AVAILABLE
            }
        }
    )

@router.post("/validate")
async def validate(request: ValidateRequest):
    """Validate content in specified format"""
    logger.info(f"Validation request received for format: {request.format}")
    result = service.validate(request.content, request.format)
    
    # Validation result is always a success response (200 OK)
    # The "valid" flag in data indicates whether content is valid
    # Invalid content is not an HTTP error - it's a valid validation result
    if result.get("valid"):
        return api_success_response(
            MessageCode.VALIDATION_SUCCESS,
            data=result,
            format=request.format.upper()
        )
    else:
        # Still return 200 OK, but use SUCCESS code with validation failure in data
        return api_success_response(
            MessageCode.SUCCESS,
            data=result,
            format=request.format.upper()
        )

@router.post("/convert")
async def convert(request: ConvertRequest):
    """Convert content from one format to another"""
    logger.info(f"Conversion request: {request.from_format} -> {request.to_format}")
    result = service.convert(request.content, request.from_format, request.to_format, request.options)
    
    return api_success_response(
        MessageCode.CONVERSION_SUCCESS,
        data=result,
        from_format=request.from_format.upper(),
        to_format=request.to_format.upper()
    )

@router.post("/format")
async def format(request: FormatRequest):
    """Format/beautify content"""
    logger.info(f"Format request for format: {request.format}")
    result = service.format_content(request.content, request.format, request.indent or 2)
    
    return api_success_response(
        MessageCode.FORMAT_SUCCESS,
        data=result
    )

@router.post("/minify")
async def minify(request: FormatRequest):
    """Minify JSON content"""
    logger.info("Minify request received")
    if request.format != 'json':
        raise api_error_response(
            MessageCode.INVALID_FORMAT,
            format=f"{request.format} (only JSON supported)"
        )
    
    result = service.minify(request.content)
    return api_success_response(
        MessageCode.MINIFY_SUCCESS,
        data=result
    )


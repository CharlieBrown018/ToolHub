"""
ToolHub API Messages Configuration
Centralized message, code, and HTTP status code definitions
Similar to tsoa's response configuration
"""

from enum import Enum
from typing import Dict, Any, Optional
from fastapi import HTTPException, status


class MessageCode(str, Enum):
    """Message codes for API responses
    
    HTTP Status Code Guidelines:
    - 200 OK: Standard success response for GET, PUT, DELETE operations
    - 201 Created: Resource successfully created (POST operations that create resources)
    - 202 Accepted: Request accepted but processing not yet completed (async operations)
    - 400 Bad Request: Client error - invalid input, missing required fields
    - 404 Not Found: Resource not found
    - 413 Payload Too Large: Request entity too large
    - 500 Internal Server Error: Unexpected server error
    - 503 Service Unavailable: Service temporarily unavailable
    
    Note: ToolHub is an open static tool without authentication, so 401/403 codes are not used.
    """
    # Success codes (2xx)
    SUCCESS = "SUCCESS"  # 200 OK - Standard success
    CREATED = "CREATED"  # 201 Created - Resource created
    ACCEPTED = "ACCEPTED"  # 202 Accepted - Request accepted, processing
    
    VALIDATION_SUCCESS = "VALIDATION_SUCCESS"  # 200 OK
    CONVERSION_SUCCESS = "CONVERSION_SUCCESS"  # 200 OK
    CONVERSION_STARTED = "CONVERSION_STARTED"  # 202 Accepted - Async processing
    FORMAT_SUCCESS = "FORMAT_SUCCESS"  # 200 OK
    MINIFY_SUCCESS = "MINIFY_SUCCESS"  # 200 OK
    FILE_UPLOAD_SUCCESS = "FILE_UPLOAD_SUCCESS"  # 201 Created
    FILE_CONVERSION_SUCCESS = "FILE_CONVERSION_SUCCESS"  # 200 OK
    PALETTE_GENERATED = "PALETTE_GENERATED"  # 200 OK
    PALETTE_EXTRACTED = "PALETTE_EXTRACTED"  # 200 OK
    PALETTE_SAVED = "PALETTE_SAVED"  # 201 Created
    
    # Client error codes (4xx)
    VALIDATION_ERROR = "VALIDATION_ERROR"  # 400 Bad Request
    CONVERSION_ERROR = "CONVERSION_ERROR"  # 400 Bad Request
    FORMAT_ERROR = "FORMAT_ERROR"  # 400 Bad Request
    MINIFY_ERROR = "MINIFY_ERROR"  # 400 Bad Request
    INVALID_FORMAT = "INVALID_FORMAT"  # 400 Bad Request
    MISSING_CONTENT = "MISSING_CONTENT"  # 400 Bad Request
    MISSING_FILES = "MISSING_FILES"  # 400 Bad Request
    MISSING_OUTPUT_PATH = "MISSING_OUTPUT_PATH"  # 400 Bad Request
    FILE_NOT_FOUND = "FILE_NOT_FOUND"  # 404 Not Found
    INVALID_FILE_TYPE = "INVALID_FILE_TYPE"  # 400 Bad Request
    FILE_TOO_LARGE = "FILE_TOO_LARGE"  # 413 Payload Too Large
    INVALID_COLOR = "INVALID_COLOR"  # 400 Bad Request - Invalid hex color
    INVALID_HEX_COLOR = "INVALID_HEX_COLOR"  # 400 Bad Request - Invalid hex color format
    NO_FOLDER_SELECTED = "NO_FOLDER_SELECTED"  # 400 Bad Request
    
    # Server error codes (5xx)
    OCR_NOT_AVAILABLE = "OCR_NOT_AVAILABLE"  # 503 Service Unavailable
    INTERNAL_ERROR = "INTERNAL_ERROR"  # 500 Internal Server Error
    PROCESSING_ERROR = "PROCESSING_ERROR"  # 500 Internal Server Error


class MessageConfig:
    """Configuration for API messages"""
    
    MESSAGES: Dict[MessageCode, Dict[str, Any]] = {
        # Success messages - 200 OK
        MessageCode.SUCCESS: {
            "message": "Operation completed successfully",
            "http_status": status.HTTP_200_OK,
            "toast_variant": "success",
        },
        MessageCode.VALIDATION_SUCCESS: {
            "message": "{format} is valid",
            "http_status": status.HTTP_200_OK,
            "toast_variant": "success",
        },
        MessageCode.CONVERSION_SUCCESS: {
            "message": "Converted from {from_format} to {to_format}",
            "http_status": status.HTTP_200_OK,
            "toast_variant": "success",
        },
        MessageCode.FORMAT_SUCCESS: {
            "message": "Content formatted successfully",
            "http_status": status.HTTP_200_OK,
            "toast_variant": "success",
        },
        MessageCode.MINIFY_SUCCESS: {
            "message": "Content minified successfully",
            "http_status": status.HTTP_200_OK,
            "toast_variant": "success",
        },
        MessageCode.FILE_CONVERSION_SUCCESS: {
            "message": "File converted successfully",
            "http_status": status.HTTP_200_OK,
            "toast_variant": "success",
        },
        MessageCode.PALETTE_GENERATED: {
            "message": "Palette generated successfully",
            "http_status": status.HTTP_200_OK,
            "toast_variant": "success",
        },
        MessageCode.PALETTE_EXTRACTED: {
            "message": "Palette extracted successfully",
            "http_status": status.HTTP_200_OK,
            "toast_variant": "success",
        },
        
        # Created messages - 201 Created
        MessageCode.CREATED: {
            "message": "Resource created successfully",
            "http_status": status.HTTP_201_CREATED,
            "toast_variant": "success",
        },
        MessageCode.FILE_UPLOAD_SUCCESS: {
            "message": "{count} file(s) uploaded successfully",
            "http_status": status.HTTP_201_CREATED,  # Changed from 200 to 201
            "toast_variant": "success",
        },
        MessageCode.PALETTE_SAVED: {
            "message": "Palette saved successfully",
            "http_status": status.HTTP_201_CREATED,
            "toast_variant": "success",
        },
        
        # Accepted messages - 202 Accepted (async operations)
        MessageCode.ACCEPTED: {
            "message": "Request accepted, processing started",
            "http_status": status.HTTP_202_ACCEPTED,
            "toast_variant": "success",
        },
        MessageCode.CONVERSION_STARTED: {
            "message": "Conversion started",
            "http_status": status.HTTP_202_ACCEPTED,
            "toast_variant": "success",
        },
        
        # Error messages
        MessageCode.VALIDATION_ERROR: {
            "message": "Validation failed: {error}",
            "http_status": status.HTTP_400_BAD_REQUEST,
            "toast_variant": "destructive",
        },
        MessageCode.CONVERSION_ERROR: {
            "message": "Conversion failed: {error}",
            "http_status": status.HTTP_400_BAD_REQUEST,
            "toast_variant": "destructive",
        },
        MessageCode.FORMAT_ERROR: {
            "message": "Formatting failed: {error}",
            "http_status": status.HTTP_400_BAD_REQUEST,
            "toast_variant": "destructive",
        },
        MessageCode.MINIFY_ERROR: {
            "message": "Minification failed: {error}",
            "http_status": status.HTTP_400_BAD_REQUEST,
            "toast_variant": "destructive",
        },
        MessageCode.INVALID_FORMAT: {
            "message": "Invalid format: {format}",
            "http_status": status.HTTP_400_BAD_REQUEST,
            "toast_variant": "destructive",
        },
        MessageCode.MISSING_CONTENT: {
            "message": "Please provide content",
            "http_status": status.HTTP_400_BAD_REQUEST,
            "toast_variant": "destructive",
        },
        MessageCode.MISSING_FILES: {
            "message": "Please select files",
            "http_status": status.HTTP_400_BAD_REQUEST,
            "toast_variant": "destructive",
        },
        MessageCode.MISSING_OUTPUT_PATH: {
            "message": "Please select output folder",
            "http_status": status.HTTP_400_BAD_REQUEST,
            "toast_variant": "destructive",
        },
        MessageCode.FILE_NOT_FOUND: {
            "message": "File not found: {file}",
            "http_status": status.HTTP_404_NOT_FOUND,
            "toast_variant": "destructive",
        },
        MessageCode.INVALID_FILE_TYPE: {
            "message": "Invalid file type: {file_type}",
            "http_status": status.HTTP_400_BAD_REQUEST,
            "toast_variant": "destructive",
        },
        MessageCode.FILE_TOO_LARGE: {
            "message": "File too large. Maximum size: {max_size}",
            "http_status": status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            "toast_variant": "destructive",
        },
        MessageCode.INVALID_COLOR: {
            "message": "Invalid color: {color}",
            "http_status": status.HTTP_400_BAD_REQUEST,
            "toast_variant": "destructive",
        },
        MessageCode.INVALID_HEX_COLOR: {
            "message": "Invalid hex color format. Expected format: #RRGGBB",
            "http_status": status.HTTP_400_BAD_REQUEST,
            "toast_variant": "destructive",
        },
        MessageCode.NO_FOLDER_SELECTED: {
            "message": "No folder selected",
            "http_status": status.HTTP_400_BAD_REQUEST,
            "toast_variant": "destructive",
        },
        MessageCode.OCR_NOT_AVAILABLE: {
            "message": "OCR not available. Please install Tesseract OCR",
            "http_status": status.HTTP_503_SERVICE_UNAVAILABLE,
            "toast_variant": "destructive",
        },
        MessageCode.INTERNAL_ERROR: {
            "message": "Internal server error: {error}",
            "http_status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "toast_variant": "destructive",
        },
        MessageCode.PROCESSING_ERROR: {
            "message": "Processing error: {error}",
            "http_status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "toast_variant": "destructive",
        },
    }
    
    @classmethod
    def get_message(cls, code: MessageCode, **kwargs) -> str:
        """Get formatted message string"""
        config = cls.MESSAGES.get(code)
        if not config:
            return f"Unknown error: {code.value}"
        
        message = config["message"]
        return message.format(**kwargs) if kwargs else message
    
    @classmethod
    def get_http_status(cls, code: MessageCode) -> int:
        """Get HTTP status code for message code"""
        config = cls.MESSAGES.get(code)
        return config["http_status"] if config else status.HTTP_500_INTERNAL_SERVER_ERROR
    
    @classmethod
    def get_toast_variant(cls, code: MessageCode) -> str:
        """Get toast variant for message code"""
        config = cls.MESSAGES.get(code)
        return config["toast_variant"] if config else "default"
    
    @classmethod
    def create_response(cls, code: MessageCode, data: Optional[Any] = None, **kwargs) -> Dict[str, Any]:
        """Create standardized API response
        
        Note: toast_variant is metadata for frontend styling, not displayed to users
        """
        response = {
            "code": code.value,
            "message": cls.get_message(code, **kwargs),
        }
        
        # Only include data if provided
        if data is not None:
            response["data"] = data
        
        # Include toast_variant as metadata (for frontend styling, not user display)
        toast_variant = cls.get_toast_variant(code)
        if toast_variant:
            response["toast_variant"] = toast_variant
        
        return response
    
    @classmethod
    def raise_exception(cls, code: MessageCode, **kwargs) -> HTTPException:
        """Raise HTTPException with configured message and status"""
        return HTTPException(
            status_code=cls.get_http_status(code),
            detail=cls.create_response(code, **kwargs)
        )


def success_response(code: MessageCode, data: Optional[Any] = None, **kwargs) -> Dict[str, Any]:
    """Helper function for success responses"""
    return MessageConfig.create_response(code, data, **kwargs)


def error_response(code: MessageCode, **kwargs) -> HTTPException:
    """Helper function for error responses"""
    return MessageConfig.raise_exception(code, **kwargs)


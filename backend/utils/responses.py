"""
Standardized API Response Wrapper
Provides consistent response format across all API endpoints

This module integrates with the existing message system (utils/messages.py)
to provide a standardized ApiResponse<T> format similar to the IFS reference project.
"""

from typing import Optional, TypeVar, Generic, Dict, Any
from fastapi.responses import JSONResponse
from fastapi import HTTPException
from backend.utils.messages import MessageCode, MessageConfig

T = TypeVar('T')


class ApiResponse(Generic[T]):
    """
    Standardized API response wrapper
    
    Provides consistent structure:
    {
        "code": str,           # MessageCode enum value
        "message": str,        # Human-readable message
        "data": T,            # Response payload (optional)
        "toast_variant": str  # Frontend toast styling hint (optional)
    }
    
    Note: This matches the IFS reference project pattern but integrates
    with ToolHub's existing MessageCode system.
    """
    
    def __init__(
        self, 
        code: str, 
        message: str, 
        data: Optional[T] = None, 
        toast_variant: Optional[str] = None
    ):
        self.code = code
        self.message = message
        self.data = data
        self.toast_variant = toast_variant
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for JSON response"""
        result: Dict[str, Any] = {
            "code": self.code,
            "message": self.message
        }
        if self.data is not None:
            result["data"] = self.data
        if self.toast_variant:
            result["toast_variant"] = self.toast_variant
        return result


def api_success_response(
    message_code: MessageCode, 
    data: Optional[T] = None, 
    **kwargs
) -> JSONResponse:
    """
    Create standardized success response using message system
    
    This function wraps MessageConfig.create_response() to return a JSONResponse
    with consistent format matching the IFS reference project pattern.
    
    Args:
        message_code: MessageCode enum value
        data: Optional response payload
        **kwargs: Format parameters for message text
    
    Returns:
        JSONResponse with standardized format:
        {
            "code": "MESSAGE_CODE",
            "message": "Formatted message",
            "data": {...},
            "toast_variant": "success"
        }
    """
    response_dict = MessageConfig.create_response(message_code, data, **kwargs)
    http_status = MessageConfig.get_http_status(message_code)
    return JSONResponse(content=response_dict, status_code=http_status)


def api_error_response(
    message_code: MessageCode, 
    error: Optional[str] = None, 
    **kwargs
) -> HTTPException:
    """
    Create standardized error response using message system
    
    This function wraps MessageConfig.raise_exception() to provide consistent
    error format matching the IFS reference project pattern.
    
    Args:
        message_code: MessageCode enum value
        error: Optional detailed error message (added to response)
        **kwargs: Format parameters for message text
    
    Returns:
        HTTPException with standardized format:
        {
            "code": "MESSAGE_CODE",
            "message": "Formatted message",
            "error": "Detailed error" (if provided),
            "toast_variant": "destructive"
        }
    """
    response_dict = MessageConfig.create_response(message_code, None, **kwargs)
    if error:
        response_dict["error"] = error
    http_status = MessageConfig.get_http_status(message_code)
    raise HTTPException(status_code=http_status, detail=response_dict)


# HTTP Status Codes Usage Guide

This document explains how HTTP status codes are used in ToolHub's API.

## Status Code Categories

### 2xx Success Codes

#### 200 OK
**Usage**: Standard success response for most operations
- GET requests (retrieving data)
- PUT requests (updating resources)
- DELETE requests (deleting resources)
- POST requests that process/transform data (not creating resources)

**Examples**:
- `GET /api/tools/data-validator/status` → 200 OK
- `POST /api/tools/data-validator/validate` → 200 OK
- `POST /api/tools/data-validator/convert` → 200 OK
- `POST /api/tools/data-validator/format` → 200 OK

**Message Codes**:
- `SUCCESS`
- `VALIDATION_SUCCESS`
- `CONVERSION_SUCCESS`
- `FORMAT_SUCCESS`
- `MINIFY_SUCCESS`
- `FILE_CONVERSION_SUCCESS`
- `PALETTE_GENERATED`
- `PALETTE_EXTRACTED`

#### 201 Created
**Usage**: Resource successfully created
- POST requests that create new resources
- File uploads that create new files

**Examples**:
- `POST /api/tools/scan2pdf/upload` → 201 Created (files uploaded)
- `POST /api/tools/color-palette/save` → 201 Created (palette saved)

**Message Codes**:
- `CREATED`
- `FILE_UPLOAD_SUCCESS`
- `PALETTE_SAVED`

#### 202 Accepted
**Usage**: Request accepted but processing not yet completed
- Async operations that start processing
- Long-running operations that return immediately

**Examples**:
- `POST /api/tools/scan2pdf/convert` → 202 Accepted (conversion started, processing in background)

**Message Codes**:
- `ACCEPTED`
- `CONVERSION_STARTED`

### 4xx Client Error Codes

#### 400 Bad Request
**Usage**: Client error - invalid input or missing required fields
- Invalid request format
- Missing required parameters
- Invalid data format
- Validation errors

**Examples**:
- Missing content → 400 Bad Request
- Invalid JSON format → 400 Bad Request
- Invalid file type → 400 Bad Request

**Message Codes**:
- `VALIDATION_ERROR`
- `CONVERSION_ERROR`
- `FORMAT_ERROR`
- `MINIFY_ERROR`
- `INVALID_FORMAT`
- `MISSING_CONTENT`
- `MISSING_FILES`
- `MISSING_OUTPUT_PATH`
- `INVALID_FILE_TYPE`

#### 404 Not Found
**Usage**: Resource not found
- File not found
- Endpoint not found
- Resource doesn't exist

**Examples**:
- `GET /api/tools/file/123` → 404 Not Found (file doesn't exist)

**Message Codes**:
- `FILE_NOT_FOUND`

#### 413 Payload Too Large
**Usage**: Request entity too large
- File exceeds maximum size limit
- Request body too large

**Examples**:
- Uploading 500MB file when limit is 100MB → 413 Payload Too Large

**Message Codes**:
- `FILE_TOO_LARGE`

### 5xx Server Error Codes

#### 500 Internal Server Error
**Usage**: Unexpected server error
- Unhandled exceptions
- Server configuration errors
- Processing failures

**Examples**:
- Database connection error → 500 Internal Server Error
- Unexpected exception during processing → 500 Internal Server Error

**Message Codes**:
- `INTERNAL_ERROR`
- `PROCESSING_ERROR`

#### 503 Service Unavailable
**Usage**: Service temporarily unavailable
- Required service/dependency not available
- Service maintenance
- Rate limiting

**Examples**:
- Tesseract OCR not installed → 503 Service Unavailable
- External API unavailable → 503 Service Unavailable

**Message Codes**:
- `OCR_NOT_AVAILABLE`

## Usage Examples

### Example 1: File Upload
```python
@router.post("/upload")
async def upload_files(files: List[UploadFile]):
    # Files uploaded successfully → 201 Created
    return api_success_response(
        MessageCode.FILE_UPLOAD_SUCCESS,
        data={"files": uploaded_files},
        count=len(uploaded_files)
    )
```

### Example 2: Async Conversion
```python
@router.post("/convert")
async def convert_files(request: ConvertRequest):
    # Start conversion process → 202 Accepted
    start_conversion(request)
    return api_success_response(
        MessageCode.CONVERSION_STARTED,
        data={"job_id": job_id}
    )
```

### Example 3: Validation
```python
@router.post("/validate")
async def validate(request: ValidateRequest):
    result = service.validate(request.content, request.format)
    if result.get("valid"):
        # Valid content → 200 OK
        return api_success_response(
            MessageCode.VALIDATION_SUCCESS,
            data=result,
            format=request.format.upper()
        )
    else:
        # Invalid content is still 200 OK (validation completed successfully)
        return api_success_response(
            MessageCode.SUCCESS,
            data=result
        )
```

### Example 4: Error Handling
```python
@router.post("/process")
async def process(request: ProcessRequest):
    if not request.content:
        # Missing content → 400 Bad Request
        raise api_error_response(MessageCode.MISSING_CONTENT)
    
    if request.file_size > MAX_SIZE:
        # File too large → 413 Payload Too Large
        raise api_error_response(
            MessageCode.FILE_TOO_LARGE,
            max_size=f"{MAX_SIZE / 1024 / 1024}MB"
        )
    
    # Process successfully → 200 OK
    return api_success_response(
        MessageCode.SUCCESS,
        data={"result": processed_data}
    )
```

## Best Practices

1. **Use 200 OK** for successful operations that don't create resources
2. **Use 201 Created** for successful resource creation
3. **Use 202 Accepted** for async operations that start processing
4. **Use 400 Bad Request** for client errors (invalid input)
5. **Use 404 Not Found** for missing resources
6. **Use 413 Payload Too Large** for oversized requests
7. **Use 500 Internal Server Error** for unexpected server errors
8. **Use 503 Service Unavailable** for unavailable dependencies

**Note**: ToolHub is an open static tool without authentication, so 401/403 status codes are not used.

## Status Code Selection Flowchart

```
Is the request successful?
├─ Yes
│  ├─ Does it create a new resource?
│  │  ├─ Yes → 201 Created
│  │  └─ No
│  │     ├─ Is it async/processing started?
│  │     │  ├─ Yes → 202 Accepted
│  │     │  └─ No → 200 OK
│  │     └─
│  └─
└─ No (Error)
   ├─ Is it a client error?
   │  ├─ Missing/invalid input? → 400 Bad Request
   │  ├─ Resource not found? → 404 Not Found
   │  └─ Payload too large? → 413 Payload Too Large
   └─ Is it a server error?
      ├─ Service unavailable? → 503 Service Unavailable
      └─ Unexpected error? → 500 Internal Server Error
```


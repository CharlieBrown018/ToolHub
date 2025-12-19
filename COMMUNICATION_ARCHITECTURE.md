# Frontend-Backend Communication Architecture

## Overview

This document explains how the frontend and backend architectures communicate, including the request/response flow, error handling, and type contracts.

## Architecture Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Components (UI Layer)                                       │
│  └─> Hooks (State Management)                                │
│      └─> Services (API Client Layer)                        │
│          └─> Base API Client (HTTP Layer)                    │
│              │                                               │
│              └───────────────────────────────────────────────┼─┐
│                                                              │ │
└─────────────────────────────────────────────────────────────┘ │
                                                                │ HTTP/REST API
┌─────────────────────────────────────────────────────────────┐ │
│                    BACKEND ARCHITECTURE                      │ │
├─────────────────────────────────────────────────────────────┤ │
│                                                              │ │
│  API Routes (HTTP Layer)                                     │ │
│  └─> Service Layer (Business Logic)                          │ │
│      └─> Utilities (Logging, Messages)                       │ │
│          └─> Configuration (appconfig.json)                   │ │
│                                                              │ │
└─────────────────────────────────────────────────────────────┘ │
                                                                │
                                                                └─┘
```

## Frontend Architecture Layers

### 1. **Components Layer** (`/components/`)
**Purpose**: UI components that trigger actions

**Example**: `DataValidator.tsx`
```typescript
const onValidate = () => {
  handleValidate(inputContent, inputFormat);
};
```

### 2. **Hooks Layer** (`/hooks/`)
**Purpose**: State management and business logic coordination

**Example**: `useDataValidator.ts`
```typescript
const handleValidate = async (content: string, format: FormatType) => {
  const result = await validate(content, format); // Calls service
  // Handle result, update state, show toast
};
```

### 3. **Services Layer** (`/services/`)
**Purpose**: API client functions, type definitions, request/response mapping

**Example**: `datavalidator.ts`
```typescript
export async function validate(
  content: string,
  format: FormatType
): Promise<ValidationResponse> {
  return apiRequest<ValidationResponse>('/api/tools/data-validator/validate', {
    method: 'POST',
    body: JSON.stringify({ content, format }),
  });
}
```

### 4. **Base API Client** (`/services/api.ts`)
**Purpose**: HTTP communication layer, error handling, request/response transformation

**Functions**:
- `apiRequest<T>()` - JSON requests/responses
- `apiUpload<T>()` - File uploads (FormData)
- `apiDownload()` - File downloads (Blob)
- `apiStream()` - Server-Sent Events (SSE)

## Backend Architecture Layers

### 1. **API Routes Layer** (`/tools/{tool}/routes.py`)
**Purpose**: HTTP endpoints, request validation, response formatting

**Example**: `datavalidator/routes.py`
```python
@router.post("/validate")
async def validate(request: ValidateRequest):
    logger.info(f"Validation request received for format: {request.format}")
    return service.validate(request.content, request.format)
```

### 2. **Service Layer** (`/services/{tool}_service.py`)
**Purpose**: Business logic, data processing, error handling

**Example**: `datavalidator_service.py`
```python
class DataValidatorService:
    @staticmethod
    def validate(content: str, format: FormatType) -> Dict[str, Any]:
        logger.info(f"Validating {format.upper()} content")
        # Business logic here
        return {"valid": True, "format": format, "error": None}
```

### 3. **Utilities Layer** (`/utils/`)
**Purpose**: Shared utilities (logging, messages, helpers)

## Communication Flow

### Request Flow (Frontend → Backend)

```
1. User Action (Component)
   ↓
2. Hook Handler (useDataValidator)
   ↓
3. Service Function (datavalidator.ts)
   ↓
4. Base API Client (api.ts)
   ↓ HTTP Request
5. FastAPI Route (routes.py)
   ↓
6. Service Method (datavalidator_service.py)
   ↓
7. Business Logic Execution
   ↓
8. Response Formation
```

### Example: Validation Request

**Frontend** (`DataValidator.tsx`):
```typescript
// 1. Component triggers action
const onValidate = () => {
  handleValidate(inputContent, inputFormat);
};
```

**Hook** (`useDataValidator.ts`):
```typescript
// 2. Hook coordinates the flow
const handleValidate = async (content: string, format: FormatType) => {
  setIsProcessing(true);
  try {
    // 3. Call service
    const result = await validate(content, format);
    setValidationResult({ valid: result.valid, error: result.error });
    
    // Show toast based on result
    if (result.valid) {
      toast({ title: 'Valid', variant: 'success' });
    } else {
      toast({ title: 'Invalid', variant: 'destructive' });
    }
  } catch (err) {
    toast({ title: 'Error', variant: 'destructive' });
  } finally {
    setIsProcessing(false);
  }
};
```

**Service** (`datavalidator.ts`):
```typescript
// 4. Service makes HTTP request
export async function validate(
  content: string,
  format: FormatType
): Promise<ValidationResponse> {
  return apiRequest<ValidationResponse>('/api/tools/data-validator/validate', {
    method: 'POST',
    body: JSON.stringify({ content, format }),
  });
}
```

**Base API Client** (`api.ts`):
```typescript
// 5. Base client handles HTTP
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      detail: `HTTP ${response.status}: ${response.statusText}`,
    }));
    throw new Error(errorData.detail || 'Request failed');
  }
  
  return await response.json();
}
```

**Backend Route** (`routes.py`):
```python
# 6. Route receives request
@router.post("/validate")
async def validate(request: ValidateRequest):
    logger.info(f"Validation request received for format: {request.format}")
    # 7. Delegate to service
    return service.validate(request.content, request.format)
```

**Backend Service** (`datavalidator_service.py`):
```python
# 8. Service executes business logic
@staticmethod
def validate(content: str, format: FormatType) -> Dict[str, Any]:
    logger.info(f"Validating {format.upper()} content")
    # Business logic
    if format == 'json':
        json.loads(content)
        return {"valid": True, "format": "json", "error": None}
    # ...
```

### Response Flow (Backend → Frontend)

```
1. Service returns result
   ↓
2. Route formats HTTP response
   ↓ HTTP Response (JSON)
3. Base API Client receives response
   ↓
4. Service function returns typed data
   ↓
5. Hook updates state
   ↓
6. Component re-renders with new data
```

## Type Contracts

### Frontend Types

**Service Layer Types** (`datavalidator.ts`):
```typescript
export interface ValidationResponse {
  valid: boolean;
  format: string;
  error?: string;
}

export interface ConvertResponse {
  success: boolean;
  output: string;
  from_format: string;
  to_format: string;
}
```

### Backend Types

**Pydantic Models** (`routes.py`):
```python
class ValidateRequest(BaseModel):
    content: str
    format: Literal['json', 'xml', 'yaml', 'csv', 'toml']
```

**Service Return Types** (`datavalidator_service.py`):
```python
def validate(content: str, format: FormatType) -> Dict[str, Any]:
    return {"valid": True, "format": format, "error": None}
```

### Type Safety

- **Frontend**: TypeScript interfaces ensure type safety
- **Backend**: Pydantic models validate request data
- **Contract**: JSON schema matches between frontend types and backend responses

## Error Handling

### Frontend Error Flow

```
1. API Request fails
   ↓
2. Base API Client catches error
   ↓
3. Throws Error with message
   ↓
4. Hook catches error
   ↓
5. Shows toast notification
   ↓
6. Updates error state
```

**Example**:
```typescript
try {
  const result = await validate(content, format);
} catch (error) {
  toast({
    title: 'Error',
    description: error.message,
    variant: 'destructive',
  });
}
```

### Backend Error Flow

```
1. Service encounters error
   ↓
2. Uses message system (MessageCode)
   ↓
3. Raises HTTPException with status code
   ↓
4. FastAPI formats error response
   ↓
5. Returns JSON error response
```

**Example**:
```python
if not content.strip():
    raise error_response(MessageCode.MISSING_CONTENT)
    # Returns: HTTP 400 with {"success": false, "code": "MISSING_CONTENT", ...}
```

### Error Response Format

**Backend Error Response**:
```json
{
  "success": false,
  "code": "MISSING_CONTENT",
  "message": "Please provide content",
  "toast_variant": "destructive"
}
```

**Frontend Handling**:
```typescript
// Base API client extracts error message
const errorData = await response.json();
throw new Error(errorData.detail || errorData.message || 'Request failed');
```

## Message System Integration

### Backend → Frontend Communication

The backend message system (`utils/messages.py`) provides:
- **Message codes**: Standardized error codes
- **HTTP status codes**: Proper status mapping
- **Toast variants**: Frontend toast styling hints

**Backend**:
```python
raise error_response(MessageCode.VALIDATION_ERROR, error="Invalid JSON")
# Returns HTTP 400 with toast_variant: "destructive"
```

**Frontend**:
```typescript
// Frontend can use toast_variant from response if needed
// Currently uses error type to determine variant
toast({ title: 'Error', variant: 'destructive' });
```

## API Endpoint Structure

### Endpoint Pattern

```
/api/tools/{tool-name}/{action}
```

**Examples**:
- `/api/tools/data-validator/validate`
- `/api/tools/data-validator/convert`
- `/api/tools/image-to-pdf/convert`
- `/api/tools/color-palette/generate`

### Request/Response Patterns

**GET Requests**:
```typescript
// Frontend
const status = await getStatus();

// Backend
@router.get("/status")
async def status():
    return {"formats": {...}}
```

**POST Requests (JSON)**:
```typescript
// Frontend
const result = await validate(content, format);

// Backend
@router.post("/validate")
async def validate(request: ValidateRequest):
    return service.validate(request.content, request.format)
```

**POST Requests (File Upload)**:
```typescript
// Frontend
const formData = new FormData();
formData.append('file', file);
const result = await apiUpload('/api/tools/color-palette/extract', formData);

// Backend
@router.post("/extract")
async def extract(file: UploadFile = File(...)):
    return service.extract_palette(file)
```

## Configuration

### Frontend API Configuration

**Environment Variable** (`.env`):
```env
VITE_API_URL=http://localhost:5000
```

**Base API Client** (`api.ts`):
```typescript
const API_BASE = import.meta.env.VITE_API_URL || '';
```

### Backend Configuration

**appconfig.json**:
```json
{
  "server": {
    "host": "0.0.0.0",
    "port": 5000
  },
  "cors": {
    "allowed_origins": ["*"]
  }
}
```

## Best Practices

### 1. **Type Safety**
- ✅ Define TypeScript interfaces for all API responses
- ✅ Use Pydantic models for request validation
- ✅ Keep types in sync between frontend and backend

### 2. **Error Handling**
- ✅ Use backend message system for consistent errors
- ✅ Show user-friendly error messages via toasts
- ✅ Log errors on both frontend and backend

### 3. **Separation of Concerns**
- ✅ Components don't directly call API
- ✅ Hooks coordinate between components and services
- ✅ Services handle API communication
- ✅ Routes delegate to services

### 4. **Logging**
- ✅ Log API requests/responses
- ✅ Log business logic operations
- ✅ Use appropriate log levels

### 5. **Configuration**
- ✅ Use environment variables for API URLs
- ✅ Centralize backend config in `appconfig.json`
- ✅ Don't hardcode endpoints or URLs

## Example: Complete Flow

### Scenario: User validates JSON content

1. **User clicks "Validate" button** (`DataValidator.tsx`)
2. **Hook handles click** (`useDataValidator.ts`)
   - Sets `isProcessing = true`
   - Calls `validate()` service function
3. **Service makes HTTP request** (`datavalidator.ts`)
   - `POST /api/tools/data-validator/validate`
   - Body: `{content: "...", format: "json"}`
4. **Base API client** (`api.ts`)
   - Adds headers, handles errors
   - Returns typed response
5. **Backend route receives** (`routes.py`)
   - Validates request with Pydantic
   - Logs request
   - Calls service method
6. **Backend service executes** (`datavalidator_service.py`)
   - Validates JSON content
   - Logs operation
   - Returns result
7. **Response flows back** (reverse of request flow)
8. **Hook updates state** (`useDataValidator.ts`)
   - Sets `validationResult`
   - Shows success toast
   - Sets `isProcessing = false`
9. **Component re-renders** (`DataValidator.tsx`)
   - Shows validation result
   - Updates UI

## Summary

### Communication Flow

```
Frontend:  Component → Hook → Service → Base API Client → HTTP Request
                                                              ↓
Backend:   HTTP Request → Route → Service → Utilities → Response
                                                              ↓
Frontend:  HTTP Response → Base API Client → Service → Hook → Component Update
```

### Key Points

1. **Frontend Architecture**:
   - **Components**: UI layer, user interactions
   - **Hooks**: State management, coordinates API calls
   - **Services**: API client functions, type definitions
   - **Base API Client**: HTTP communication, error handling

2. **Backend Architecture**:
   - **Routes**: HTTP endpoints, request validation
   - **Services**: Business logic, data processing
   - **Utilities**: Logging, messages, helpers
   - **Configuration**: appconfig.json

3. **Communication Protocol**:
   - **Protocol**: RESTful API over HTTP
   - **Format**: JSON request/response bodies
   - **Type Safety**: TypeScript interfaces ↔ Pydantic models
   - **Error Handling**: Backend message system → Frontend toasts

4. **Data Flow**:
   - Request: User action → Hook → Service → API Client → HTTP → Route → Service → Response
   - Response: Service result → Route → HTTP → API Client → Service → Hook → Component update

### Benefits

- ✅ **Clear Separation**: Each layer has a single responsibility
- ✅ **Type Safety**: TypeScript + Pydantic ensure type correctness
- ✅ **Consistent Errors**: Message system provides standardized error handling
- ✅ **Testability**: Each layer can be tested independently
- ✅ **Maintainability**: Easy to locate and modify code
- ✅ **Scalability**: Easy to add new tools following the pattern
- ✅ **Observability**: Comprehensive logging on both sides


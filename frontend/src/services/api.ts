/**
 * Base API client configuration
 */

const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Standardized API Response format (matches backend ApiResponse<T>)
 * 
 * HTTP Status Codes (ToolHub is an open static tool, no authentication):
 * - 200 OK: Standard success response
 * - 201 Created: Resource successfully created
 * - 202 Accepted: Request accepted, processing started (async)
 * - 400 Bad Request: Client error (invalid input)
 * - 404 Not Found: Resource not found
 * - 413 Payload Too Large: Request entity too large
 * - 500 Internal Server Error: Server error
 * - 503 Service Unavailable: Service unavailable
 */
interface ApiResponse<T = any> {
  code: string;           // MessageCode enum value
  message: string;       // Human-readable message
  data?: T;             // Response payload
  toast_variant?: string; // Frontend toast styling hint
}

/**
 * API response with metadata for toast handling
 */
export interface ApiResponseWithMetadata<T> {
  data: T;
  message: string;
  code: string;
  toastVariant?: string;
}

/**
 * Base fetch wrapper with error handling and standardized response parsing
 * 
 * @param showToast - If true, returns metadata for automatic toast handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit & { showToast?: boolean } = {}
): Promise<T | ApiResponseWithMetadata<T>> {
  const { showToast, ...fetchOptions } = options;
  const url = `${API_BASE}${endpoint}`;
  
  try {
    // Don't set Content-Type for FormData - browser sets it automatically with boundary
    const isFormData = fetchOptions.body instanceof FormData;
    const headers = isFormData
      ? { ...fetchOptions.headers } // Don't set Content-Type for FormData
      : {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        };

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    const responseData: ApiResponse<T> | { detail: ApiResponse<T> } = await response.json().catch(() => ({
      detail: {
        code: 'ERROR',
        message: `HTTP ${response.status}: ${response.statusText}`,
      },
    }));

    // Handle FastAPI error format (errors have 'detail' wrapper)
    const apiResponse: ApiResponse<T> = 'detail' in responseData 
      ? responseData.detail 
      : responseData;

    // Success status codes: 200 OK, 201 Created, 202 Accepted
    const isSuccess = response.ok && (
      response.status === 200 || 
      response.status === 201 || 
      response.status === 202
    );

    // Check if response indicates an error (4xx, 5xx, or error code in response)
    if (!isSuccess || apiResponse.code?.endsWith('ERROR') || apiResponse.code?.includes('ERROR')) {
      const errorMessage = apiResponse.message || `HTTP ${response.status}: ${response.statusText}`;
      const error = new Error(errorMessage);
      
      // Attach metadata for error handling
      (error as any).code = apiResponse.code;
      (error as any).status = response.status;
      (error as any).toastVariant = apiResponse.toast_variant || 'destructive';
      (error as any).message = apiResponse.message;
      
      throw error;
    }

    // If showToast is true, return metadata along with data
    if (showToast && apiResponse.data !== undefined) {
      return {
        data: apiResponse.data,
        message: apiResponse.message,
        code: apiResponse.code,
        toastVariant: apiResponse.toast_variant,
      } as ApiResponseWithMetadata<T>;
    }

    // Return data if present, otherwise return full response
    // This allows backward compatibility with endpoints that return data directly
    return apiResponse.data !== undefined ? apiResponse.data : (apiResponse as T);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
}

/**
 * Upload files with FormData
 */
async function apiUpload<T>(
  endpoint: string,
  formData: FormData
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const responseData: ApiResponse | { detail: ApiResponse } = await response.json().catch(() => ({
        detail: {
          code: 'ERROR',
          message: `HTTP ${response.status}: ${response.statusText}`,
        },
      }));

      const apiResponse: ApiResponse = 'detail' in responseData ? responseData.detail : responseData;
      const errorMessage = apiResponse.message || `HTTP ${response.status}: ${response.statusText}`;
      const error = new Error(errorMessage);
      
      (error as any).code = apiResponse.code;
      (error as any).toastVariant = apiResponse.toast_variant || 'destructive';
      
      throw error;
    }

    const responseData: ApiResponse<T> = await response.json();
    return responseData.data !== undefined ? responseData.data : (responseData as T);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
}

/**
 * Download file as blob
 */
async function apiDownload(endpoint: string, options: RequestInit = {}): Promise<Blob> {
  const url = `${API_BASE}${endpoint}`;
  
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const responseData: ApiResponse | { detail: ApiResponse } = await response.json().catch(() => ({
        detail: {
          code: 'ERROR',
          message: `HTTP ${response.status}: ${response.statusText}`,
        },
      }));

      const apiResponse: ApiResponse = 'detail' in responseData ? responseData.detail : responseData;
      const errorMessage = apiResponse.message || `HTTP ${response.status}: ${response.statusText}`;
      const error = new Error(errorMessage);
      
      (error as any).code = apiResponse.code;
      (error as any).toastVariant = apiResponse.toast_variant || 'destructive';
      
      throw error;
    }

    return await response.blob();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
}

/**
 * Stream response for SSE (Server-Sent Events)
 */
async function apiStream(
  endpoint: string,
  body: any,
  onMessage: (data: any) => void,
  onError?: (error: Error) => void
): Promise<void> {
  const url = `${API_BASE}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        detail: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error(errorData.detail || 'Stream failed');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('Response body is not readable');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            onMessage(data);
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      onError?.(error);
      throw error;
    }
    throw new Error('Network error occurred');
  }
}

export { apiRequest, apiUpload, apiDownload, apiStream };


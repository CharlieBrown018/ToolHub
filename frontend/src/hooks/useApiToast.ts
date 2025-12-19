/**
 * Primary toast hook - Use this for ALL API calls
 * Automatically shows toasts using backend-provided messages
 * 
 * For UI-only actions (no API), use the `toast` function directly
 */

import { useToast as useBaseToast } from './useToast';
import { apiRequest } from '../services/api';

export interface ApiToastOptions {
  showSuccess?: boolean;  // Show toast on success (default: true)
  showError?: boolean;   // Show toast on error (default: true)
  successTitle?: string; // Override success title (uses backend message if not provided)
  errorTitle?: string;   // Override error title (default: "Error")
}

/**
 * Hook for API calls with automatic toast handling
 * 
 * This is the PRIMARY hook for all API interactions.
 * It automatically extracts backend messages and shows toasts.
 * 
 * @example
 * const { callApi } = useApiToast();
 * 
 * const handleAction = async () => {
 *   try {
 *     const data = await callApi(
 *       '/api/tools/data-validator/validate',
 *       {
 *         method: 'POST',
 *         body: JSON.stringify({ content, format }),
 *       }
 *     );
 *     // Toast automatically shown with backend message!
 *   } catch (error) {
 *     // Error toast already shown
 *   }
 * }
 */
export function useApiToast() {
  const { toast } = useBaseToast();

  /**
   * Call API endpoint and automatically show toast with backend message
   * 
   * @param endpoint - API endpoint (e.g., '/api/tools/data-validator/validate')
   * @param options - Fetch options (method, body, headers, etc.)
   * @param toastOptions - Toast display options
   * @returns Promise with response data
   */
  const callApi = async <T>(
    endpoint: string,
    options: RequestInit & { body?: BodyInit | null } = {},
    toastOptions: ApiToastOptions = {}
  ): Promise<T> => {
    const {
      showSuccess = true,
      showError = true,
      successTitle,
      errorTitle = 'Error',
    } = toastOptions;

    try {
      // Always use showToast: true to get backend messages
      // apiRequest handles FormData automatically (doesn't set Content-Type)
      const response = await apiRequest<T>(
        endpoint,
        {
          ...options,
          showToast: true,
        }
      ) as any;

      // Extract data and metadata
      const data = response.data !== undefined ? response.data : response;
      const message = response.message;
      const toastVariant = response.toastVariant || 'success';

      // Show success toast if enabled
      if (showSuccess && message) {
        toast({
          title: successTitle || 'Success',
          description: message,
          variant: (toastVariant as 'success' | 'destructive' | 'default') || 'success',
        });
      }

      return data as T;
    } catch (error: unknown) {
      // Show error toast if enabled
      if (showError && error instanceof Error) {
        const toastVariant = (error as any).toastVariant || 'destructive';
        const errorMessage = (error as any).message || error.message || 'An error occurred';

        toast({
          title: errorTitle,
          description: errorMessage,
          variant: toastVariant as 'success' | 'destructive' | 'default',
        });
      }

      throw error;
    }
  };

  /**
   * Legacy wrapper for backward compatibility
   * Use callApi instead
   */
  const callWithToast = async <T>(
    apiCall: () => Promise<T | { data: T; message: string; code: string; toastVariant?: string }>,
    options: ApiToastOptions = {}
  ): Promise<T> => {
    // This is a wrapper - prefer using callApi directly
    const result = await apiCall();
    
    if (result && typeof result === 'object' && 'data' in result && 'message' in result) {
      const { data, message, toastVariant } = result as { data: T; message: string; toastVariant?: string };
      
      if (options.showSuccess !== false) {
        toast({
          title: options.successTitle || 'Success',
          description: message,
          variant: (toastVariant as 'success' | 'destructive' | 'default') || 'success',
        });
      }
      
      return data;
    }
    
    return result as T;
  };

  return {
    callApi,        // Primary method - use this for all API calls
    callWithToast,  // Legacy wrapper - for backward compatibility
    toast,          // Direct access to base toast function for UI-only actions
  };
}

/**
 * Export base toast function for UI-only actions (no API)
 * 
 * Only use this for actions that don't involve API calls:
 * - "Copied to clipboard"
 * - "File selected" (local file picker)
 * - "Settings saved" (local state)
 * 
 * For API calls, use useApiToast().callApi() instead
 */
export { useBaseToast as useToast };


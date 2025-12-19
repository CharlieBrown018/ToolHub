/**
 * Scan2PDF API service
 */

import { apiRequest, apiUpload, apiStream } from './api';

// Type definitions match the 'data' field from standardized ApiResponse<T>
export interface TesseractStatus {
  tesseract_available: boolean;
  tesseract_path?: string;
}

export interface BrowseFilesResponse {
  files: string[];
  path: string;
}

export interface BrowseFolderResponse {
  path: string;
}

export interface UploadFilesResponse {
  files: string[];
}

export interface ConvertProgress {
  type: 'progress' | 'file_complete' | 'complete' | 'error';
  current?: number;
  total?: number;
  percent?: number;
  file?: string;
  status?: 'success' | 'failed' | 'skipped';
  message?: string;
  output_path?: string;
  successful?: number;
  failed?: number;
  skipped?: number;
}

/**
 * Check Tesseract OCR availability
 */
export async function checkTesseractStatus(): Promise<TesseractStatus> {
  const response = await apiRequest<TesseractStatus>('/api/tools/image-to-pdf/status');
  // Extract data if wrapped in ApiResponseWithMetadata
  if (response && typeof response === 'object' && 'data' in response) {
    return (response as any).data as TesseractStatus;
  }
  return response as TesseractStatus;
}

/**
 * Open file picker dialog
 */
export async function browseFiles(): Promise<BrowseFilesResponse> {
  const response = await apiRequest<BrowseFilesResponse>('/api/tools/image-to-pdf/browse-files', {
    method: 'POST',
  });
  // Extract data if wrapped in ApiResponseWithMetadata
  if (response && typeof response === 'object' && 'data' in response) {
    return (response as any).data as BrowseFilesResponse;
  }
  return response as BrowseFilesResponse;
}

/**
 * Open folder picker dialog
 */
export async function browseFolder(): Promise<BrowseFolderResponse> {
  const response = await apiRequest<BrowseFolderResponse>('/api/tools/image-to-pdf/browse-folder', {
    method: 'POST',
  });
  // Extract data if wrapped in ApiResponseWithMetadata
  if (response && typeof response === 'object' && 'data' in response) {
    return (response as any).data as BrowseFolderResponse;
  }
  return response as BrowseFolderResponse;
}

/**
 * Upload files
 */
export async function uploadFiles(files: File[]): Promise<UploadFilesResponse> {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  
  return apiUpload<UploadFilesResponse>('/api/tools/image-to-pdf/upload-files', formData);
}

/**
 * Convert files with progress streaming
 */
export async function convertFiles(
  inputFiles: string[],
  outputPath: string,
  options: {
    skipExisting?: boolean;
    combinePdfs?: boolean;
  },
  onProgress: (progress: ConvertProgress) => void,
  onError?: (error: Error) => void
): Promise<void> {
  return apiStream(
    '/api/tools/image-to-pdf/convert',
    {
      input_files: inputFiles,
      output_path: outputPath,
      skip_existing: options.skipExisting ?? true,
      combine_pdfs: options.combinePdfs ?? false,
    },
    onProgress,
    onError
  );
}

/**
 * Preview PDF - Returns URL for PDF preview
 */
export function previewPdf(filePath: string): string {
  const url = `${import.meta.env.VITE_API_URL || ''}/api/tools/image-to-pdf/preview-pdf?file=${encodeURIComponent(filePath)}`;
  return url;
}


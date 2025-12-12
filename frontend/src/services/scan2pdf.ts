/**
 * Scan2PDF API service
 */

import { apiRequest, apiUpload, apiStream } from './api';

export interface TesseractStatus {
  tesseract_available: boolean;
  tesseract_path?: string;
}

export interface BrowseFilesResponse {
  success: boolean;
  files?: string[];
  error?: string;
}

export interface BrowseFolderResponse {
  success: boolean;
  path?: string;
  error?: string;
}

export interface UploadFilesResponse {
  success: boolean;
  files?: string[];
  error?: string;
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
  return apiRequest<TesseractStatus>('/api/tools/image-to-pdf/status');
}

/**
 * Open file picker dialog
 */
export async function browseFiles(): Promise<BrowseFilesResponse> {
  return apiRequest<BrowseFilesResponse>('/api/tools/image-to-pdf/browse-files', {
    method: 'POST',
  });
}

/**
 * Open folder picker dialog
 */
export async function browseFolder(): Promise<BrowseFolderResponse> {
  return apiRequest<BrowseFolderResponse>('/api/tools/image-to-pdf/browse-folder', {
    method: 'POST',
  });
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


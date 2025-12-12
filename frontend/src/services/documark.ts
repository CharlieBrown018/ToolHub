/**
 * DocuMark API service
 */

import { apiRequest, apiDownload } from './api';

export interface DocuMarkStatus {
  weasyprint_available: boolean;
  error?: string;
}

export interface ConvertTextResponse {
  success: boolean;
  pdf_path?: string;
  error?: string;
}

/**
 * Check WeasyPrint availability
 */
export async function checkWeasyPrintStatus(): Promise<DocuMarkStatus> {
  return apiRequest<DocuMarkStatus>('/api/tools/md-to-pdf/status');
}

/**
 * Convert markdown text to PDF
 */
export async function convertText(markdown: string): Promise<Blob> {
  return apiDownload('/api/tools/md-to-pdf/convert-text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: markdown }),
  });
}

/**
 * Convert markdown file to PDF
 */
export async function convertFile(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);
  
  return apiDownload('/api/tools/md-to-pdf/convert', {
    method: 'POST',
    body: formData,
  });
}


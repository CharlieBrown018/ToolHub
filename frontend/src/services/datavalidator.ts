/**
 * DataValidator API service
 */

import { apiRequest, apiUpload } from './api';

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

export interface FormatResponse {
  success: boolean;
  formatted: string;
}

export interface StatusResponse {
  formats: {
    json: boolean;
    xml: boolean;
    yaml: boolean;
    csv: boolean;
    toml: boolean;
  };
}

export type FormatType = 'json' | 'xml' | 'yaml' | 'csv' | 'toml';

/**
 * Check available formats
 */
export async function getStatus(): Promise<StatusResponse> {
  return apiRequest<StatusResponse>('/api/tools/data-validator/status');
}

/**
 * Validate content in specified format
 */
export async function validate(
  content: string,
  format: FormatType
): Promise<ValidationResponse> {
  return apiRequest<ValidationResponse>('/api/tools/data-validator/validate', {
    method: 'POST',
    body: JSON.stringify({ content, format }),
  });
}

/**
 * Convert content from one format to another
 */
export async function convert(
  content: string,
  fromFormat: FormatType,
  toFormat: FormatType,
  options?: { indent?: number }
): Promise<ConvertResponse> {
  return apiRequest<ConvertResponse>('/api/tools/data-validator/convert', {
    method: 'POST',
    body: JSON.stringify({
      content,
      from_format: fromFormat,
      to_format: toFormat,
      options,
    }),
  });
}

/**
 * Format/beautify content
 */
export async function format(
  content: string,
  format: FormatType,
  indent?: number
): Promise<FormatResponse> {
  return apiRequest<FormatResponse>('/api/tools/data-validator/format', {
    method: 'POST',
    body: JSON.stringify({ content, format, indent }),
  });
}

/**
 * Minify JSON content
 */
export async function minify(content: string): Promise<FormatResponse> {
  return apiRequest<FormatResponse>('/api/tools/data-validator/minify', {
    method: 'POST',
    body: JSON.stringify({ content, format: 'json' }),
  });
}


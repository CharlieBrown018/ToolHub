/**
 * Tools API service
 */

import { apiRequest } from './api';
import { Tool } from '../types/tool';

/**
 * Get all available tools
 */
export async function getTools(): Promise<Tool[]> {
  return apiRequest<Tool[]>('/api/tools');
}

/**
 * Search tools by query
 */
export async function searchTools(query: string): Promise<Tool[]> {
  return apiRequest<Tool[]>(`/api/tools/search?q=${encodeURIComponent(query)}`);
}

/**
 * Health check
 */
export async function healthCheck(): Promise<{ status: string }> {
  return apiRequest<{ status: string }>('/api/health');
}


/**
 * ColorPalette API service
 */

import { apiRequest, apiUpload } from './api';

export interface Color {
  hex: string;
  rgb: number[];
  hsl: number[];
  frequency?: number;
  percentage?: number;
  saturation?: number;
}

export interface PaletteResponse {
  success: boolean;
  colors: Color[];
  method: string;
  num_colors: number;
}

export interface AnalyzeResponse {
  success: boolean;
  dimensions: {
    width: number;
    height: number;
  };
  total_pixels: number;
  average_color: {
    hex: string;
    rgb: number[];
  };
  dominant_colors: Color[];
}

export interface RandomPaletteResponse {
  success: boolean;
  colors: Color[];
  harmony: string;
  num_colors: number;
}

export interface ShadesResponse {
  success: boolean;
  shades: Color[];
  base_color: string;
}

export interface ContrastResponse {
  success: boolean;
  contrast_ratio: number;
  wcag: {
    aa_normal: boolean;
    aa_large: boolean;
    aaa_normal: boolean;
    aaa_large: boolean;
  };
  rating: string;
}

/**
 * Generate color palette from image
 */
export async function generatePalette(
  file: File,
  numColors: number = 5,
  method: 'dominant' | 'vibrant' = 'dominant'
): Promise<PaletteResponse> {
  const formData = new FormData();
  formData.append('file', file);
  
  const params = new URLSearchParams({
    num_colors: numColors.toString(),
    method,
  });
  
  return apiUpload<PaletteResponse>(
    `/api/tools/color-palette/generate?${params.toString()}`,
    formData
  );
}

/**
 * Analyze image and return color information
 */
export async function analyzeImage(file: File): Promise<AnalyzeResponse> {
  const formData = new FormData();
  formData.append('file', file);
  
  return apiUpload<AnalyzeResponse>(
    '/api/tools/color-palette/analyze',
    formData
  );
}

/**
 * Generate random color palette with harmony rules
 */
export async function generateRandomPalette(
  harmony: 'random' | 'complementary' | 'triadic' | 'analogous' | 'monochromatic' | 'tetradic' = 'random',
  numColors: number = 5,
  saturation: number = 0.7,
  lightness: number = 0.5
): Promise<RandomPaletteResponse> {
  return apiRequest<RandomPaletteResponse>('/api/tools/color-palette/random', {
    method: 'POST',
    body: JSON.stringify({
      harmony,
      num_colors: numColors,
      saturation,
      lightness,
    }),
  });
}

/**
 * Generate shades and tints from a base color
 */
export async function generateShades(
  hexColor: string,
  numShades: number = 10
): Promise<ShadesResponse> {
  return apiRequest<ShadesResponse>('/api/tools/color-palette/shades', {
    method: 'POST',
    body: JSON.stringify({
      hex_color: hexColor,
      num_shades: numShades,
    }),
  });
}

/**
 * Check contrast ratio between two colors
 */
export async function checkContrast(
  color1: string,
  color2: string
): Promise<ContrastResponse> {
  return apiRequest<ContrastResponse>('/api/tools/color-palette/contrast', {
    method: 'POST',
    body: JSON.stringify({
      color1,
      color2,
    }),
  });
}


import { type Color } from '../../../services/colorpalette';

export type TabType = 'extract' | 'random' | 'custom' | 'shades' | 'contrast';

export interface SavedPalette {
  id: string;
  name: string;
  colors: Color[];
  createdAt: string;
}

export interface ContrastResult {
  contrast_ratio: number;
  rating: string;
  wcag: {
    aa_normal: boolean;
    aa_large: boolean;
    aaa_normal: boolean;
    aaa_large: boolean;
  };
}


import { useState, useEffect } from 'react';
import { type SavedPalette } from '../../components/tools/colorpalette/types';

const STORAGE_KEY = 'colorPalettes';

export function useSavedPalettes() {
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSavedPalettes(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved palettes', e);
      }
    }
  }, []);

  const savePalette = (palette: SavedPalette) => {
    const updated = [...savedPalettes, palette];
    setSavedPalettes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  };

  const deletePalette = (id: string) => {
    const updated = savedPalettes.filter(p => p.id !== id);
    setSavedPalettes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  };

  return {
    savedPalettes,
    savePalette,
    deletePalette,
  };
}


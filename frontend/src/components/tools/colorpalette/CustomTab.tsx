import { useState } from 'react';
import { Button } from '../../ui/button';
import { useToast } from '../../ui/use-toast';
import { Plus, Trash, Eye } from '@phosphor-icons/react';
import { type Color } from '../../../services/colorpalette';
import { type SavedPalette } from './types';

interface CustomTabProps {
  colors: Color[];
  onColorsChange: (colors: Color[]) => void;
  savedPalettes: SavedPalette[];
  onLoadPalette: (palette: SavedPalette) => void;
  onDeletePalette: (id: string) => void;
}

export function CustomTab({
  colors,
  onColorsChange,
  savedPalettes,
  onLoadPalette,
  onDeletePalette,
}: CustomTabProps) {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const { toast } = useToast();

  const handleAddCustomColor = () => {
    const hex = prompt('Enter hex color (e.g., #3b82f6):');
    if (hex && /^#[0-9A-F]{6}$/i.test(hex)) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const h = ((r + g + b) / 3) / 255;
      const newColor: Color = {
        hex: hex.toUpperCase(),
        rgb: [r, g, b],
        hsl: [0, 0, Math.round(h * 100)],
      };
      onColorsChange([...colors, newColor]);
    } else {
      toast({
        title: 'Error',
        description: 'Invalid hex color format',
        variant: 'destructive',
      });
    }
  };

  const handleColorPickerChange = (hex: string) => {
    setBaseColor(hex);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const newColor: Color = {
      hex: hex.toUpperCase(),
      rgb: [r, g, b],
      hsl: [0, 0, 50],
    };
    onColorsChange([...colors, newColor]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          onClick={handleAddCustomColor}
          variant="outline"
          className="flex-1"
        >
          <Plus className="h-4 w-4 mr-2" weight="duotone" />
          Add Color
        </Button>
        <input
          type="color"
          value={baseColor}
          onChange={(e) => handleColorPickerChange(e.target.value)}
          className="h-10 w-20 rounded border border-border cursor-pointer"
        />
      </div>
      {colors.length > 0 && (
        <div className="space-y-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 rounded bg-background/50"
            >
              <div
                className="w-12 h-12 rounded border border-border"
                style={{ backgroundColor: color.hex }}
              />
              <div className="flex-1">
                <div className="font-mono text-sm">{color.hex}</div>
                <div className="text-xs text-muted-foreground">
                  RGB: {color.rgb.join(', ')}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const updated = colors.filter((_, i) => i !== index);
                  onColorsChange(updated);
                }}
              >
                <Trash className="h-4 w-4" weight="duotone" />
              </Button>
            </div>
          ))}
        </div>
      )}
      {savedPalettes.length > 0 && (
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-semibold mb-2">Saved Palettes</h4>
          <div className="space-y-2">
            {savedPalettes.map((palette) => (
              <div
                key={palette.id}
                className="flex items-center justify-between p-2 rounded bg-background/50"
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {palette.colors.slice(0, 5).map((c, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded border border-border"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                  <span className="text-sm">{palette.name}</span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onLoadPalette(palette)}
                  >
                    <Eye className="h-4 w-4" weight="duotone" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeletePalette(palette.id)}
                  >
                    <Trash className="h-4 w-4" weight="duotone" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


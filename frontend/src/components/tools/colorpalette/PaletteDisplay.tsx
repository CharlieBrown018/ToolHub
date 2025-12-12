import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Copy, Download, Palette } from '@phosphor-icons/react';
import { type Color } from '../../../services/colorpalette';

interface PaletteDisplayProps {
  colors: Color[];
  onSave?: () => void;
  onExport?: (format: 'css' | 'json' | 'scss') => void;
  onCopyColor?: (hex: string) => void;
}

export function PaletteDisplay({ colors, onSave, onExport, onCopyColor }: PaletteDisplayProps) {
  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    onCopyColor?.(hex);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Color Palette</CardTitle>
            <CardDescription>
              {colors.length > 0
                ? `${colors.length} colors`
                : 'Colors will appear here'}
            </CardDescription>
          </div>
          {colors.length > 0 && (
            <div className="flex gap-2">
              {onSave && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onSave}
                >
                  <Download className="h-4 w-4 mr-2" weight="duotone" />
                  Save
                </Button>
              )}
              {onExport && (
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onExport('css')}
                  >
                    CSS
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onExport('scss')}
                  >
                    SCSS
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onExport('json')}
                  >
                    JSON
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {colors.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="group relative rounded-lg overflow-hidden border border-border hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => handleCopyColor(color.hex)}
                >
                  <div
                    className="h-24 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-3 bg-background/90 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-semibold">
                        {color.hex}
                      </span>
                      <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" weight="duotone" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      RGB: {color.rgb.join(', ')}
                    </div>
                    {color.hsl && (
                      <div className="text-xs text-muted-foreground">
                        HSL: {color.hsl.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-semibold mb-2">Color Values</h4>
              <div className="space-y-2 font-mono text-xs max-h-64 overflow-y-auto">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded bg-background/50 hover:bg-background transition-colors cursor-pointer"
                    onClick={() => handleCopyColor(color.hex)}
                  >
                    <span>{color.hex}</span>
                    <Copy className="h-3 w-3 opacity-50" weight="duotone" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Palette className="h-12 w-12 mb-4 opacity-50" weight="duotone" />
            <p className="text-sm">Generate or extract colors to see them here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


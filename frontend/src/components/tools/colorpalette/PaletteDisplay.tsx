import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '../../ui/glass-card';
import { GlassButton } from '../../ui/glass-button';
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
    <GlassCard hover={false} animated={false} className="border-orange-500/20">
      <GlassCardHeader>
        <div className="flex items-center justify-between">
          <div>
            <GlassCardTitle>Color Palette</GlassCardTitle>
            <GlassCardDescription>
              {colors.length > 0
                ? `${colors.length} colors`
                : 'Colors will appear here'}
            </GlassCardDescription>
          </div>
          {colors.length > 0 && (
            <div className="flex gap-2">
              {onSave && (
                <GlassButton
                  variant="orange"
                  size="sm"
                  onClick={onSave}
                >
                  <Download className="h-4 w-4 mr-2" weight="duotone" />
                  Save
                </GlassButton>
              )}
              {onExport && (
                <div className="flex gap-1">
                  <GlassButton
                    variant="orange"
                    size="sm"
                    onClick={() => onExport('css')}
                  >
                    CSS
                  </GlassButton>
                  <GlassButton
                    variant="orange"
                    size="sm"
                    onClick={() => onExport('scss')}
                  >
                    SCSS
                  </GlassButton>
                  <GlassButton
                    variant="orange"
                    size="sm"
                    onClick={() => onExport('json')}
                  >
                    JSON
                  </GlassButton>
                </div>
              )}
            </div>
          )}
        </div>
      </GlassCardHeader>
      <GlassCardContent>
        {colors.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="group relative rounded-lg overflow-hidden border border-glass-border hover:scale-105 transition-transform cursor-pointer shadow-glass-sm"
                  onClick={() => handleCopyColor(color.hex)}
                >
                  <div
                    className="h-24 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-3 bg-glass-white-lg backdrop-blur-md border-t border-glass-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-semibold text-gray-100">
                        {color.hex}
                      </span>
                      <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300" weight="duotone" />
                    </div>
                    <div className="text-xs text-gray-400">
                      RGB: {color.rgb.join(', ')}
                    </div>
                    {color.hsl && (
                      <div className="text-xs text-gray-400">
                        HSL: {color.hsl.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-glass-border">
              <h4 className="text-sm font-semibold mb-2 text-gray-100">Color Values</h4>
              <div className="space-y-2 font-mono text-xs max-h-64 overflow-y-auto custom-scrollbar">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-glass-white-md backdrop-blur-sm border border-glass-border hover:bg-glass-white-lg transition-colors cursor-pointer"
                    onClick={() => handleCopyColor(color.hex)}
                  >
                    <span className="text-gray-100">{color.hex}</span>
                    <Copy className="h-3 w-3 opacity-50 text-gray-400" weight="duotone" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Palette className="h-12 w-12 mb-4 opacity-50" weight="duotone" />
            <p className="text-sm">Generate or extract colors to see them here</p>
          </div>
        )}
      </GlassCardContent>
    </GlassCard>
  );
}


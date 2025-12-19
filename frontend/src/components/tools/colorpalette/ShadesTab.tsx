import { useState } from 'react';
import { GlassButton } from '../../ui/glass-button';
import { useApiToast } from '../../../hooks/useApiToast';
import { CircleNotch, Stack } from '@phosphor-icons/react';
import { type Color } from '../../../services/colorpalette';

interface ShadesTabProps {
  onColorsGenerated: (colors: Color[]) => void;
  isProcessing: boolean;
  onProcessingChange: (processing: boolean) => void;
}

export function ShadesTab({ onColorsGenerated, isProcessing, onProcessingChange }: ShadesTabProps) {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [numShades, setNumShades] = useState(10);
  const { callApi } = useApiToast();

  const handleGenerateShades = async () => {
    onProcessingChange(true);
    try {
      // Use callApi - automatically shows toast with backend message
      const result = await callApi<{ shades: Color[]; base_color: string }>(
        '/api/tools/color-palette/shades',
        {
          method: 'POST',
          body: JSON.stringify({
            hex_color: baseColor,
            num_shades: numShades,
          }),
        }
      );
      
      onColorsGenerated(result.shades);
    } catch (err: unknown) {
      // Error toast already shown by callApi
    } finally {
      onProcessingChange(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block text-gray-100">Base Color:</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="h-10 w-20 rounded-lg border border-glass-border bg-glass-white-md backdrop-blur-sm cursor-pointer hover:border-glass-border-hover transition-colors"
          />
          <input
            type="text"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-glass-white-md backdrop-blur-sm border border-glass-border text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent-orange"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block text-gray-100">
          Number of Shades: {numShades}
        </label>
        <input
          type="range"
          min="5"
          max="20"
          value={numShades}
          onChange={(e) => setNumShades(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg bg-glass-white-md backdrop-blur-sm cursor-pointer"
          style={{ accentColor: '#f97316' }}
        />
      </div>
      <GlassButton
        onClick={handleGenerateShades}
        variant="orange"
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? (
            <CircleNotch className="h-4 w-4 mr-2 animate-spin" weight="duotone" />
        ) : (
          <Stack className="h-4 w-4 mr-2" weight="duotone" />
        )}
        Generate Shades
      </GlassButton>
    </div>
  );
}


import { useState } from 'react';
import { GlassButton } from '../../ui/glass-button';
import { useToast } from '../../../hooks/useToast';
import { CircleNotch, Stack } from '@phosphor-icons/react';
import { generateShades, type Color } from '../../../services/colorpalette';

interface ShadesTabProps {
  onColorsGenerated: (colors: Color[]) => void;
  isProcessing: boolean;
  onProcessingChange: (processing: boolean) => void;
}

export function ShadesTab({ onColorsGenerated, isProcessing, onProcessingChange }: ShadesTabProps) {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [numShades, setNumShades] = useState(10);
  const { toast } = useToast();

  const handleGenerateShades = async () => {
    onProcessingChange(true);
    try {
      const result = await generateShades(baseColor, numShades);
      onColorsGenerated(result.shades);
      toast({
        title: 'Success',
        description: `Generated ${result.shades.length} shades`,
      });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Failed to generate shades';
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
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
            className="flex-1 px-3 py-2 rounded-lg bg-glass-white-md backdrop-blur-sm border border-glass-border text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
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
          className="w-full h-2 rounded-lg accent-orange-500 bg-glass-white-md backdrop-blur-sm cursor-pointer"
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


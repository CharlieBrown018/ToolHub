import { useState } from 'react';
import { Button } from '../../ui/button';
import { useToast } from '../../ui/use-toast';
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
        <label className="text-sm font-medium mb-2 block">Base Color:</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="h-10 w-20 rounded border border-border cursor-pointer"
          />
          <input
            type="text"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="flex-1 px-3 py-2 rounded-md bg-background border border-border font-mono text-sm"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Number of Shades: {numShades}
        </label>
        <input
          type="range"
          min="5"
          max="20"
          value={numShades}
          onChange={(e) => setNumShades(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      <Button
        onClick={handleGenerateShades}
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? (
            <CircleNotch className="h-4 w-4 mr-2 animate-spin" weight="duotone" />
        ) : (
          <Stack className="h-4 w-4 mr-2" weight="duotone" />
        )}
        Generate Shades
      </Button>
    </div>
  );
}


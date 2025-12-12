import { useState } from 'react';
import { Button } from '../../ui/button';
import { useToast } from '../../ui/use-toast';
import { CircleNotch, Sparkle } from '@phosphor-icons/react';
import { generateRandomPalette, type Color } from '../../../services/colorpalette';

interface RandomTabProps {
  onColorsGenerated: (colors: Color[]) => void;
  isProcessing: boolean;
  onProcessingChange: (processing: boolean) => void;
}

export function RandomTab({ onColorsGenerated, isProcessing, onProcessingChange }: RandomTabProps) {
  const [harmony, setHarmony] = useState<'random' | 'complementary' | 'triadic' | 'analogous' | 'monochromatic' | 'tetradic'>('random');
  const [randomNumColors, setRandomNumColors] = useState(5);
  const [saturation, setSaturation] = useState(0.7);
  const [lightness, setLightness] = useState(0.5);
  const { toast } = useToast();

  const handleRandomPalette = async () => {
    onProcessingChange(true);
    try {
      const result = await generateRandomPalette(harmony, randomNumColors, saturation, lightness);
      onColorsGenerated(result.colors);
      toast({
        title: 'Success',
        description: `Generated ${harmony} palette`,
      });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Failed to generate palette';
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
        <label className="text-sm font-medium mb-2 block">Color Harmony:</label>
        <select
          value={harmony}
          onChange={(e) => setHarmony(e.target.value as any)}
          className="w-full px-3 py-2 rounded-md bg-background border border-border text-sm"
        >
          <option value="random">Random</option>
          <option value="complementary">Complementary</option>
          <option value="triadic">Triadic</option>
          <option value="analogous">Analogous</option>
          <option value="monochromatic">Monochromatic</option>
          <option value="tetradic">Tetradic</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Number of Colors: {randomNumColors}
        </label>
        <input
          type="range"
          min="3"
          max="12"
          value={randomNumColors}
          onChange={(e) => setRandomNumColors(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Saturation: {Math.round(saturation * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={saturation}
          onChange={(e) => setSaturation(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Lightness: {Math.round(lightness * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={lightness}
          onChange={(e) => setLightness(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
      <Button
        onClick={handleRandomPalette}
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? (
            <CircleNotch className="h-4 w-4 mr-2 animate-spin" weight="duotone" />
        ) : (
          <Sparkle className="h-4 w-4 mr-2" weight="duotone" />
        )}
        Generate Random Palette
      </Button>
    </div>
  );
}


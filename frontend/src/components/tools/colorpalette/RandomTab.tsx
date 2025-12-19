import { useState } from 'react';
import { GlassButton } from '../../ui/glass-button';
import { useToast } from '../../../hooks/useToast';
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
        <label className="text-sm font-medium mb-2 block text-gray-100">Color Harmony:</label>
        <select
          value={harmony}
          onChange={(e) => setHarmony(e.target.value as any)}
          className="w-full px-3 py-2 rounded-lg bg-glass-white-md backdrop-blur-sm border border-glass-border text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500/50 hover:bg-glass-white-lg transition-colors cursor-pointer"
        >
          <option value="random" className="bg-bg-primary">Random</option>
          <option value="complementary" className="bg-bg-primary">Complementary</option>
          <option value="triadic" className="bg-bg-primary">Triadic</option>
          <option value="analogous" className="bg-bg-primary">Analogous</option>
          <option value="monochromatic" className="bg-bg-primary">Monochromatic</option>
          <option value="tetradic" className="bg-bg-primary">Tetradic</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block text-gray-100">
          Number of Colors: {randomNumColors}
        </label>
        <input
          type="range"
          min="3"
          max="12"
          value={randomNumColors}
          onChange={(e) => setRandomNumColors(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg accent-orange-500 bg-glass-white-md backdrop-blur-sm cursor-pointer"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block text-gray-100">
          Saturation: {Math.round(saturation * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={saturation}
          onChange={(e) => setSaturation(parseFloat(e.target.value))}
          className="w-full h-2 rounded-lg accent-orange-500 bg-glass-white-md backdrop-blur-sm cursor-pointer"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block text-gray-100">
          Lightness: {Math.round(lightness * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={lightness}
          onChange={(e) => setLightness(parseFloat(e.target.value))}
          className="w-full h-2 rounded-lg accent-orange-500 bg-glass-white-md backdrop-blur-sm cursor-pointer"
        />
      </div>
      <GlassButton
        onClick={handleRandomPalette}
        variant="orange"
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? (
            <CircleNotch className="h-4 w-4 mr-2 animate-spin" weight="duotone" />
        ) : (
          <Sparkle className="h-4 w-4 mr-2" weight="duotone" />
        )}
        Generate Random Palette
      </GlassButton>
    </div>
  );
}


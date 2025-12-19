import { useState } from 'react';
import { GlassButton } from '../../ui/glass-button';
import { useApiToast } from '../../../hooks/useApiToast';
import { CircleNotch, Sparkle } from '@phosphor-icons/react';
import { type Color } from '../../../services/colorpalette';
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from '../../ui/glass-select';

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
  const { callApi } = useApiToast();

  const handleRandomPalette = async () => {
    onProcessingChange(true);
    try {
      // Use callApi - automatically shows toast with backend message
      const result = await callApi<{ colors: Color[]; harmony: string; num_colors: number }>(
        '/api/tools/color-palette/random',
        {
          method: 'POST',
          body: JSON.stringify({
            harmony,
            num_colors: randomNumColors,
            saturation,
            lightness,
          }),
        }
      );
      
      onColorsGenerated(result.colors);
    } catch (err: unknown) {
      // Error toast already shown by callApi
    } finally {
      onProcessingChange(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block text-gray-100">Color Harmony:</label>
        <GlassSelect value={harmony} onValueChange={(value: string) => setHarmony(value as typeof harmony)}>
          <GlassSelectTrigger variant="orange" className="w-full">
            <GlassSelectValue placeholder="Select harmony" />
          </GlassSelectTrigger>
          <GlassSelectContent variant="orange">
            <GlassSelectItem value="random" variant="orange">Random</GlassSelectItem>
            <GlassSelectItem value="complementary" variant="orange">Complementary</GlassSelectItem>
            <GlassSelectItem value="triadic" variant="orange">Triadic</GlassSelectItem>
            <GlassSelectItem value="analogous" variant="orange">Analogous</GlassSelectItem>
            <GlassSelectItem value="monochromatic" variant="orange">Monochromatic</GlassSelectItem>
            <GlassSelectItem value="tetradic" variant="orange">Tetradic</GlassSelectItem>
          </GlassSelectContent>
        </GlassSelect>
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
          className="w-full h-2 rounded-lg bg-glass-white-md backdrop-blur-sm cursor-pointer"
          style={{ accentColor: '#f97316' }}
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
          className="w-full h-2 rounded-lg bg-glass-white-md backdrop-blur-sm cursor-pointer"
          style={{ accentColor: '#f97316' }}
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
          className="w-full h-2 rounded-lg bg-glass-white-md backdrop-blur-sm cursor-pointer"
          style={{ accentColor: '#f97316' }}
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


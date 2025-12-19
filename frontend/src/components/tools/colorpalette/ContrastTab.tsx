import { useState } from 'react';
import { GlassButton } from '../../ui/glass-button';
import { useApiToast } from '../../../hooks/useApiToast';
import { CircleNotch, Eye } from '@phosphor-icons/react';
import { type ContrastResult } from './types';

interface ContrastTabProps {
  isProcessing: boolean;
  onProcessingChange: (processing: boolean) => void;
  onResultChange: (result: ContrastResult | null) => void;
}

export function ContrastTab({ isProcessing, onProcessingChange, onResultChange }: ContrastTabProps) {
  const [contrastColor1, setContrastColor1] = useState('#000000');
  const [contrastColor2, setContrastColor2] = useState('#ffffff');
  const { callApi } = useApiToast();

  const handleCheckContrast = async () => {
    onProcessingChange(true);
    try {
      // Use callApi - automatically shows toast with backend message
      const result = await callApi<ContrastResult>(
        '/api/tools/color-palette/contrast',
        {
          method: 'POST',
          body: JSON.stringify({
            color1: contrastColor1,
            color2: contrastColor2,
          }),
        }
      );
      
      onResultChange(result);
    } catch (err: unknown) {
      // Error toast already shown by callApi
      onResultChange(null);
    } finally {
      onProcessingChange(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block text-gray-100">Color 1:</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={contrastColor1}
            onChange={(e) => setContrastColor1(e.target.value)}
            className="h-10 w-20 rounded-lg border border-glass-border bg-glass-white-md backdrop-blur-sm cursor-pointer hover:border-glass-border-hover transition-colors"
          />
          <input
            type="text"
            value={contrastColor1}
            onChange={(e) => setContrastColor1(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-glass-white-md backdrop-blur-sm border border-glass-border text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent-orange"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block text-gray-100">Color 2:</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={contrastColor2}
            onChange={(e) => setContrastColor2(e.target.value)}
            className="h-10 w-20 rounded-lg border border-glass-border bg-glass-white-md backdrop-blur-sm cursor-pointer hover:border-glass-border-hover transition-colors"
          />
          <input
            type="text"
            value={contrastColor2}
            onChange={(e) => setContrastColor2(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-glass-white-md backdrop-blur-sm border border-glass-border text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent-orange"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div
          className="flex-1 h-20 rounded-lg border border-glass-border"
          style={{ backgroundColor: contrastColor1 }}
        />
        <div
          className="flex-1 h-20 rounded-lg border border-glass-border"
          style={{ backgroundColor: contrastColor2 }}
        />
      </div>
      <GlassButton
        onClick={handleCheckContrast}
        variant="orange"
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? (
            <CircleNotch className="h-4 w-4 mr-2 animate-spin" weight="duotone" />
        ) : (
          <Eye className="h-4 w-4 mr-2" weight="duotone" />
        )}
        Check Contrast
      </GlassButton>
    </div>
  );
}


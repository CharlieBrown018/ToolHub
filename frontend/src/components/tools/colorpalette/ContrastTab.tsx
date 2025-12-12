import { useState } from 'react';
import { Button } from '../../ui/button';
import { useToast } from '../../ui/use-toast';
import { CircleNotch, Eye } from '@phosphor-icons/react';
import { checkContrast } from '../../../services/colorpalette';
import { type ContrastResult } from './types';

interface ContrastTabProps {
  isProcessing: boolean;
  onProcessingChange: (processing: boolean) => void;
  onResultChange: (result: ContrastResult | null) => void;
}

export function ContrastTab({ isProcessing, onProcessingChange, onResultChange }: ContrastTabProps) {
  const [contrastColor1, setContrastColor1] = useState('#000000');
  const [contrastColor2, setContrastColor2] = useState('#ffffff');
  const { toast } = useToast();

  const handleCheckContrast = async () => {
    onProcessingChange(true);
    try {
      const result = await checkContrast(contrastColor1, contrastColor2);
      onResultChange(result);
      toast({
        title: 'Contrast Checked',
        description: `Ratio: ${result.contrast_ratio}:1 - ${result.rating}`,
      });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Failed to check contrast';
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
        <label className="text-sm font-medium mb-2 block">Color 1:</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={contrastColor1}
            onChange={(e) => setContrastColor1(e.target.value)}
            className="h-10 w-20 rounded border border-border cursor-pointer"
          />
          <input
            type="text"
            value={contrastColor1}
            onChange={(e) => setContrastColor1(e.target.value)}
            className="flex-1 px-3 py-2 rounded-md bg-background border border-border font-mono text-sm"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Color 2:</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={contrastColor2}
            onChange={(e) => setContrastColor2(e.target.value)}
            className="h-10 w-20 rounded border border-border cursor-pointer"
          />
          <input
            type="text"
            value={contrastColor2}
            onChange={(e) => setContrastColor2(e.target.value)}
            className="flex-1 px-3 py-2 rounded-md bg-background border border-border font-mono text-sm"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div
          className="flex-1 h-20 rounded border border-border"
          style={{ backgroundColor: contrastColor1 }}
        />
        <div
          className="flex-1 h-20 rounded border border-border"
          style={{ backgroundColor: contrastColor2 }}
        />
      </div>
      <Button
        onClick={handleCheckContrast}
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? (
            <CircleNotch className="h-4 w-4 mr-2 animate-spin" weight="duotone" />
        ) : (
          <Eye className="h-4 w-4 mr-2" weight="duotone" />
        )}
        Check Contrast
      </Button>
    </div>
  );
}


import { useState, useRef } from 'react';
import { Button } from '../../ui/button';
import { useToast } from '../../ui/use-toast';
import { CircleNotch, Palette, Image as ImageIcon } from '@phosphor-icons/react';
import { generatePalette, type Color } from '../../../services/colorpalette';

interface ExtractTabProps {
  onColorsGenerated: (colors: Color[]) => void;
  isProcessing: boolean;
  onProcessingChange: (processing: boolean) => void;
}

export function ExtractTab({ onColorsGenerated, isProcessing, onProcessingChange }: ExtractTabProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [numColors, setNumColors] = useState(5);
  const [method, setMethod] = useState<'dominant' | 'vibrant'>('dominant');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onColorsGenerated([]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onColorsGenerated([]);
    }
  };

  const handleExtractPalette = async () => {
    if (!selectedFile) {
      toast({
        title: 'Error',
        description: 'Please select an image',
        variant: 'destructive',
      });
      return;
    }

    onProcessingChange(true);
    try {
      const result = await generatePalette(selectedFile, numColors, method);
      onColorsGenerated(result.colors);
      toast({
        title: 'Success',
        description: `Generated ${result.colors.length} colors`,
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
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full max-h-64 mx-auto rounded-lg"
          />
        ) : (
          <div className="space-y-4">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" weight="duotone" />
            <p className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </p>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-32">Colors:</label>
          <input
            type="number"
            min="1"
            max="20"
            value={numColors}
            onChange={(e) => setNumColors(parseInt(e.target.value) || 5)}
            className="flex-1 px-3 py-1 rounded-md bg-background border border-border text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-32">Method:</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as 'dominant' | 'vibrant')}
            className="flex-1 px-3 py-1 rounded-md bg-background border border-border text-sm"
          >
            <option value="dominant">Dominant Colors</option>
            <option value="vibrant">Vibrant Colors</option>
          </select>
        </div>
        <Button
          onClick={handleExtractPalette}
          disabled={isProcessing || !selectedFile}
          className="w-full"
        >
          {isProcessing ? (
            <CircleNotch className="h-4 w-4 mr-2 animate-spin" weight="duotone" />
          ) : (
            <Palette className="h-4 w-4 mr-2" weight="duotone" />
          )}
          Extract Palette
        </Button>
      </div>
    </div>
  );
}


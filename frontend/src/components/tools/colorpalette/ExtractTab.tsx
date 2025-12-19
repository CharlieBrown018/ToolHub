import { useState, useRef } from 'react';
import { GlassButton } from '../../ui/glass-button';
import { useApiToast } from '../../../hooks/useApiToast';
import { CircleNotch, Palette, Image as ImageIcon } from '@phosphor-icons/react';
import { type Color } from '../../../services/colorpalette';
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from '../../ui/glass-select';

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
  const { callApi, toast } = useApiToast();

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
      // Use callApi with FormData - automatically shows toast with backend message
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const params = new URLSearchParams({
        num_colors: numColors.toString(),
        method,
      });
      
      const result = await callApi<{ colors: Color[]; method: string; num_colors: number }>(
        `/api/tools/color-palette/generate?${params.toString()}`,
        {
          method: 'POST',
          body: formData,
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
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-glass-border rounded-xl p-8 text-center bg-glass-white-md backdrop-blur-sm hover:border-accent-blue transition-all duration-200 cursor-pointer"
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
            <ImageIcon className="h-12 w-12 mx-auto text-gray-400" weight="duotone" />
            <p className="text-sm text-gray-400">
              Click to upload or drag and drop
            </p>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-32 text-gray-100">Colors:</label>
          <input
            type="number"
            min="1"
            max="20"
            value={numColors}
            onChange={(e) => setNumColors(parseInt(e.target.value) || 5)}
            className="flex-1 px-3 py-1 rounded-lg bg-glass-white-md backdrop-blur-sm border border-glass-border text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-orange"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-32 text-gray-100">Method:</label>
          <GlassSelect value={method} onValueChange={(value: string) => setMethod(value as 'dominant' | 'vibrant')}>
            <GlassSelectTrigger variant="orange" className="flex-1">
              <GlassSelectValue placeholder="Select method" />
            </GlassSelectTrigger>
            <GlassSelectContent variant="orange">
              <GlassSelectItem value="dominant" variant="orange">Dominant Colors</GlassSelectItem>
              <GlassSelectItem value="vibrant" variant="orange">Vibrant Colors</GlassSelectItem>
            </GlassSelectContent>
          </GlassSelect>
        </div>
        <GlassButton
          onClick={handleExtractPalette}
          variant="orange"
          disabled={isProcessing || !selectedFile}
          className="w-full"
        >
          {isProcessing ? (
            <CircleNotch className="h-4 w-4 mr-2 animate-spin" weight="duotone" />
          ) : (
            <Palette className="h-4 w-4 mr-2" weight="duotone" />
          )}
          Extract Palette
        </GlassButton>
      </div>
    </div>
  );
}


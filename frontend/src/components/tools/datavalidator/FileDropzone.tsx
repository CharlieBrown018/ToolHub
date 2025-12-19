import { useRef, useState } from 'react';
import { Upload } from '@phosphor-icons/react';
import { useApiToast } from '../../../hooks/useApiToast';
import { type FormatType } from '../../../services/datavalidator';

interface FileDropzoneProps {
  onFileLoad: (content: string, format: FormatType) => void;
  disabled?: boolean;
}

const SUPPORTED_FORMATS: Record<string, FormatType> = {
  'json': 'json',
  'xml': 'xml',
  'yaml': 'yaml',
  'yml': 'yaml',
  'csv': 'csv',
  'toml': 'toml',
};

export function FileDropzone({ onFileLoad, disabled }: FileDropzoneProps) {
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useApiToast();

  const detectFormat = (filename: string): FormatType | null => {
    const ext = filename.toLowerCase().split('.').pop();
    return ext ? SUPPORTED_FORMATS[ext] || null : null;
  };

  const readFile = async (file: File) => {
    const format = detectFormat(file.name);
    if (!format) {
      toast({
        title: 'Unsupported Format',
        description: `File "${file.name}" has an unsupported format. Supported: ${Object.keys(SUPPORTED_FORMATS).join(', ')}`,
        variant: 'destructive',
      });
      return;
    }

    try {
      const content = await file.text();
      onFileLoad(content, format);
      toast({
        title: 'File Loaded',
        description: `Loaded ${file.name} as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    dropzoneRef.current?.classList.remove('border-accent-purple/50');

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    // Only process the first file
    await readFile(files[0]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
    dropzoneRef.current?.classList.add('border-accent-purple/50');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    dropzoneRef.current?.classList.remove('border-accent-purple/50');
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await readFile(files[0]);
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.xml,.yaml,.yml,.csv,.toml"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />
      <div
        ref={dropzoneRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-4 transition-colors
          ${isDragging ? 'border-accent-purple/50 bg-accent-purple/10' : 'border-glass-border bg-glass-white-sm'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-accent-purple/30'}
        `}
        onClick={disabled ? undefined : handleBrowseClick}
      >
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <Upload className="h-8 w-8 text-accent-purple" weight="duotone" />
          <div className="text-sm text-gray-300">
            <span className="font-medium">Drop a file here</span> or{' '}
            <span className="text-accent-purple underline">browse</span>
          </div>
          <div className="text-xs text-gray-400">
            Supported: JSON, XML, YAML, CSV, TOML
          </div>
        </div>
      </div>
    </>
  );
}


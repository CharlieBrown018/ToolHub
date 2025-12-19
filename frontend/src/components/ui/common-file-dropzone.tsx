import { useRef, useState } from 'react';
import { Upload, FolderOpen } from '@phosphor-icons/react';
import { GlassButton } from './glass-button';
import { cn } from '../../lib/utils';

interface CommonFileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  onFolderSelected?: () => void;
  acceptedFileTypes?: string[];
  maxFiles?: number;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  accentColor?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'indigo' | 'cyan' | 'amber' | 'red' | 'teal';
  className?: string;
  showFolderSelect?: boolean;
  folderPath?: string;
}

export function CommonFileDropzone({
  onFilesSelected,
  onFolderSelected,
  acceptedFileTypes = ['*'],
  maxFiles,
  label,
  description,
  placeholder = 'Drag & drop files here or click to browse',
  disabled = false,
  accentColor = 'blue',
  className,
  showFolderSelect = false,
  folderPath,
}: CommonFileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected(maxFiles ? files.slice(0, maxFiles) : files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      onFilesSelected(maxFiles ? files.slice(0, maxFiles) : files);
    }
    // Reset value to allow selecting same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const accentColorClasses = {
    blue: 'hover:border-accent-blue/50 hover:bg-accent-blue/5 border-accent-blue/20',
    green: 'hover:border-accent-green/50 hover:bg-accent-green/5 border-accent-green/20',
    purple: 'hover:border-accent-purple/50 hover:bg-accent-purple/5 border-accent-purple/20',
    orange: 'hover:border-accent-orange/50 hover:bg-accent-orange/5 border-accent-orange/20',
    pink: 'hover:border-accent-pink/50 hover:bg-accent-pink/5 border-accent-pink/20',
    indigo: 'hover:border-accent-indigo/50 hover:bg-accent-indigo/5 border-accent-indigo/20',
    cyan: 'hover:border-accent-cyan/50 hover:bg-accent-cyan/5 border-accent-cyan/20',
    amber: 'hover:border-accent-amber/50 hover:bg-accent-amber/5 border-accent-amber/20',
    red: 'hover:border-accent-red/50 hover:bg-accent-red/5 border-accent-red/20',
    teal: 'hover:border-accent-teal/50 hover:bg-accent-teal/5 border-accent-teal/20',
  };

  const draggingClasses = {
    blue: 'border-accent-blue/50 bg-accent-blue/10',
    green: 'border-accent-green/50 bg-accent-green/10',
    purple: 'border-accent-purple/50 bg-accent-purple/10',
    orange: 'border-accent-orange/50 bg-accent-orange/10',
    pink: 'border-accent-pink/50 bg-accent-pink/10',
    indigo: 'border-accent-indigo/50 bg-accent-indigo/10',
    cyan: 'border-accent-cyan/50 bg-accent-cyan/10',
    amber: 'border-accent-amber/50 bg-accent-amber/10',
    red: 'border-accent-red/50 bg-accent-red/10',
    teal: 'border-accent-teal/50 bg-accent-teal/10',
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-200">{label}</label>}
        <div
          ref={dropzoneRef}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'relative group cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 backdrop-blur-sm',
            'bg-glass-white-md border-glass-border shadow-glass-depth',
            accentColorClasses[accentColor],
            isDragging && draggingClasses[accentColor],
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple={!maxFiles || maxFiles > 1}
            accept={acceptedFileTypes.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
          />
          <Upload 
            className={cn(
              'h-12 w-12 mx-auto mb-4 text-gray-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-accent-blue',
              accentColor === 'blue' && 'group-hover:text-accent-blue',
              accentColor === 'green' && 'group-hover:text-accent-green',
              accentColor === 'purple' && 'group-hover:text-accent-purple',
              accentColor === 'orange' && 'group-hover:text-accent-orange',
              accentColor === 'pink' && 'group-hover:text-accent-pink',
              accentColor === 'indigo' && 'group-hover:text-accent-indigo',
              accentColor === 'cyan' && 'group-hover:text-accent-cyan',
              accentColor === 'amber' && 'group-hover:text-accent-amber',
              accentColor === 'red' && 'group-hover:text-accent-red',
              accentColor === 'teal' && 'group-hover:text-accent-teal',
            )} 
            weight="duotone" 
          />
          <p className="text-sm font-medium text-gray-100">{placeholder}</p>
          {description && <p className="text-xs text-gray-400 mt-2">{description}</p>}
        </div>
      </div>

      {showFolderSelect && onFolderSelected && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Output Destination</label>
          <GlassButton
            type="button"
            variant={accentColor as any}
            onClick={onFolderSelected}
            disabled={disabled}
            className="w-full"
          >
            <FolderOpen className="h-4 w-4 mr-2" weight="duotone" />
            Select Output Folder
          </GlassButton>
          {folderPath && (
            <p className="text-xs text-gray-400 px-1 truncate italic">
              Selected: {folderPath}
            </p>
          )}
        </div>
      )}
    </div>
  );
}


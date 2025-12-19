import { useRef } from 'react';
import { GlassButton } from '../../ui/glass-button';
import { Upload, FolderOpen } from '@phosphor-icons/react';
import { useApiToast } from '../../../hooks/useApiToast';
import { apiRequest, apiUpload } from '../../../services/api';

interface FileDropzoneProps {
  inputFiles: string[];
  outputPath: string;
  onInputFilesChange: (files: string[]) => void;
  onOutputPathChange: (path: string) => void;
  disabled?: boolean;
}

export function FileDropzone({
  inputFiles,
  outputPath,
  onInputFilesChange,
  onOutputPathChange,
  disabled,
}: FileDropzoneProps) {
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const { callApi, toast } = useApiToast();

  const handleBrowseFiles = async () => {
    try {
      // Use callApi - automatically shows toast with backend message
      const response = await callApi<{ files: string[]; path: string }>(
        '/api/tools/image-to-pdf/browse-files',
        { method: 'POST' }
      );
      
      if (response.files && response.files.length > 0) {
        onInputFilesChange(response.files);
      }
    } catch (err: unknown) {
      // Error toast already shown by callApi
    }
  };

  const handleBrowseFolder = async () => {
    try {
      // Use callApi - automatically shows toast with backend message
      const response = await callApi<{ path: string }>(
        '/api/tools/image-to-pdf/browse-folder',
        { method: 'POST' }
      );
      
      if (response.path) {
        onOutputPathChange(response.path);
      }
    } catch (err: unknown) {
      // Error toast already shown by callApi
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    dropzoneRef.current?.classList.remove('border-primary');
    
    const files = Array.from(e.dataTransfer.files);
    const supportedExts = ['png', 'jpg', 'jpeg', 'bmp', 'tiff', 'tif', 'gif', 'pdf'];
    const supportedFiles = files.filter(f => {
      const ext = f.name.toLowerCase().split('.').pop();
      return supportedExts.includes(ext || '');
    });

    if (supportedFiles.length === 0) {
      toast({
        title: 'Error',
        description: 'No supported files found',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Use callApi with FormData - automatically shows toast with backend message
      const formData = new FormData();
      supportedFiles.forEach(file => formData.append('files', file));
      
      const response = await callApi<{ files: string[] }>(
        '/api/tools/image-to-pdf/upload-files',
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (response.files && response.files.length > 0) {
        onInputFilesChange(response.files);
      }
    } catch (err: unknown) {
      // Error toast already shown by callApi
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dropzoneRef.current?.classList.add('border-accent-blue/50');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dropzoneRef.current?.classList.remove('border-accent-blue/50');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-100">Input Files</label>
        <div
          ref={dropzoneRef}
          className="border-2 border-dashed border-glass-border rounded-xl p-8 text-center cursor-pointer transition-all duration-200 bg-glass-white-md backdrop-blur-sm hover:border-accent-blue/50 hover:bg-glass-white-lg"
          onClick={handleBrowseFiles}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" weight="duotone" />
          <p className="text-sm font-medium mb-1 text-gray-100">Drag & drop files here</p>
          <p className="text-xs text-gray-400">or click to browse</p>
        </div>
        <p className="text-xs text-gray-400">
          {inputFiles.length > 0
            ? `${inputFiles.length} file(s) selected`
            : 'No files selected'}
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-100">Output Folder</label>
        <GlassButton
          type="button"
          variant="blue"
          onClick={handleBrowseFolder}
          disabled={disabled}
          className="w-full"
        >
          <FolderOpen className="h-4 w-4 mr-2" weight="duotone" />
          Select Output Folder
        </GlassButton>
        <p className="text-xs text-gray-400">
          {outputPath || 'No folder selected'}
        </p>
      </div>
    </div>
  );
}


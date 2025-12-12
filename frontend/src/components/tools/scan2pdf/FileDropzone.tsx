import { useRef } from 'react';
import { Button } from '../../ui/button';
import { Upload, FolderOpen } from '@phosphor-icons/react';
import { browseFiles, browseFolder, uploadFiles } from '../../../services/scan2pdf';
import { useToast } from '../../ui/use-toast';

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
  const { toast } = useToast();

  const handleBrowseFiles = async () => {
    try {
      const response = await browseFiles();
      if (response.success && response.files && response.files.length > 0) {
        onInputFilesChange(response.files);
        toast({
          title: 'Files selected',
          description: `${response.files.length} file(s) selected`,
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'No files selected',
          variant: 'destructive',
        });
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      toast({
        title: 'Error',
        description: 'Failed to browse files: ' + error,
        variant: 'destructive',
      });
    }
  };

  const handleBrowseFolder = async () => {
    try {
      const response = await browseFolder();
      if (response.success && response.path) {
        onOutputPathChange(response.path);
        toast({
          title: 'Folder selected',
          description: response.path,
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'No folder selected',
          variant: 'destructive',
        });
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      toast({
        title: 'Error',
        description: 'Failed to browse folder: ' + error,
        variant: 'destructive',
      });
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
      const data = await uploadFiles(supportedFiles);
      if (data.success && data.files) {
        onInputFilesChange(data.files);
        toast({
          title: 'Files uploaded',
          description: `${supportedFiles.length} file(s) uploaded`,
        });
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      toast({
        title: 'Error',
        description: 'Failed to upload files: ' + error,
        variant: 'destructive',
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dropzoneRef.current?.classList.add('border-primary');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dropzoneRef.current?.classList.remove('border-primary');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Input Files</label>
        <div
          ref={dropzoneRef}
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary/50"
          onClick={handleBrowseFiles}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" weight="duotone" />
          <p className="text-sm font-medium mb-1">Drag & drop files here</p>
          <p className="text-xs text-muted-foreground">or click to browse</p>
        </div>
        <p className="text-xs text-muted-foreground">
          {inputFiles.length > 0
            ? `${inputFiles.length} file(s) selected`
            : 'No files selected'}
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Output Folder</label>
        <Button
          type="button"
          variant="outline"
          onClick={handleBrowseFolder}
          disabled={disabled}
          className="w-full"
        >
          <FolderOpen className="h-4 w-4 mr-2" weight="duotone" />
          Select Output Folder
        </Button>
        <p className="text-xs text-muted-foreground">
          {outputPath || 'No folder selected'}
        </p>
      </div>
    </div>
  );
}


import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '../../ui/glass-card';
import { GlassButton } from '../../ui/glass-button';
import { CircleNotch, Download } from '@phosphor-icons/react';
import { convertFile } from '../../../services/documark';
import { useToast } from '../../../hooks/useToast';

interface FileUploadProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  isConverting: boolean;
  onConvertingChange: (converting: boolean) => void;
}

export function FileUpload({
  selectedFile,
  onFileSelect,
  isConverting,
  onConvertingChange,
}: FileUploadProps) {
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onFileSelect(file);
    toast({
      title: 'File loaded',
      description: file.name,
    });
  };

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: 'Error',
        description: 'Please upload a file first',
        variant: 'destructive',
      });
      return;
    }

    onConvertingChange(true);

    try {
      const blob = await convertFile(selectedFile);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'markdown_output.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast({
        title: 'Success',
        description: 'PDF generated successfully',
      });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Conversion failed';
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      onConvertingChange(false);
    }
  };

  return (
    <GlassCard hover={false} animated={false} className="border-emerald-500/20">
      <GlassCardHeader>
        <GlassCardTitle>Upload Markdown File</GlassCardTitle>
        <GlassCardDescription>
          Upload a .md, .markdown, or .txt file to convert
        </GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent>
        <form onSubmit={handleConvert} className="space-y-4">
          <div className="relative">
            <input
              type="file"
              accept=".md,.markdown,.txt"
              onChange={handleFileChange}
              disabled={isConverting}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-glass-white-md file:backdrop-blur-sm file:border file:border-glass-border file:text-gray-100 hover:file:bg-glass-white-lg hover:file:border-glass-border-hover file:transition-all file:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 rounded-lg bg-glass-white-md backdrop-blur-sm border border-glass-border text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue/50"
            />
          </div>
          <GlassButton
            type="submit"
            variant="green"
            disabled={isConverting || !selectedFile}
            className="w-full"
          >
            {isConverting ? (
              <>
                <CircleNotch className="h-4 w-4 mr-2 animate-spin" weight="duotone" />
                Converting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" weight="duotone" />
                Convert to PDF
              </>
            )}
          </GlassButton>
        </form>
      </GlassCardContent>
    </GlassCard>
  );
}


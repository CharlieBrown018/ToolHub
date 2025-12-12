import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { CircleNotch, Download } from '@phosphor-icons/react';
import { convertFile } from '../../../services/documark';
import { useToast } from '../../ui/use-toast';

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
    <Card>
      <CardHeader>
        <CardTitle>Upload Markdown File</CardTitle>
        <CardDescription>
          Upload a .md, .markdown, or .txt file to convert
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleConvert} className="space-y-4">
          <input
            type="file"
            accept=".md,.markdown,.txt"
            onChange={handleFileChange}
            disabled={isConverting}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
          <Button
            type="submit"
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
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


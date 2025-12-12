import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { CircleNotch, FileText } from '@phosphor-icons/react';
import { convertText } from '../../../services/documark';
import { useToast } from '../../ui/use-toast';

interface MarkdownEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  isConverting: boolean;
  onConvertingChange: (converting: boolean) => void;
}

export function MarkdownEditor({
  content,
  onContentChange,
  isConverting,
  onConvertingChange,
}: MarkdownEditorProps) {
  const { toast } = useToast();

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter markdown content',
        variant: 'destructive',
      });
      return;
    }

    onConvertingChange(true);

    try {
      const blob = await convertText(content);
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
        <CardTitle>Or Paste Markdown</CardTitle>
        <CardDescription>
          Paste your markdown content directly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleConvert} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="# Enter your markdown here...

## Features
- Beautiful PDF output
- Syntax highlighting
- Table support
- Custom styling"
            disabled={isConverting}
            className="w-full min-h-[400px] p-4 rounded-md bg-background border border-border text-foreground font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            type="submit"
            disabled={isConverting || !content.trim()}
            className="w-full"
          >
            {isConverting ? (
              <>
                <CircleNotch className="h-4 w-4 mr-2 animate-spin" weight="duotone" />
                Converting...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" weight="duotone" />
                Convert to PDF
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


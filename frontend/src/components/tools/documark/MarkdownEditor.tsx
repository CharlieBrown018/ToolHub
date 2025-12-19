import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '../../ui/glass-card';
import { GlassButton } from '../../ui/glass-button';
import { CircleNotch, FileText } from '@phosphor-icons/react';
import { useApiToast } from '../../../hooks/useApiToast';
import { apiDownload } from '../../../services/api';

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
  const { toast } = useApiToast();

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
      // Use apiDownload for file downloads (returns Blob, not JSON)
      const blob = await apiDownload('/api/tools/md-to-pdf/convert-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'markdown_output.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      // Show success toast (apiDownload doesn't return JSON, so we use custom message)
      toast({
        title: 'Success',
        description: 'PDF generated successfully',
        variant: 'success',
      });
    } catch (err: unknown) {
      // Error handling - apiDownload throws errors with metadata
      const error = err as Error & { toastVariant?: string; message?: string };
      toast({
        title: 'Error',
        description: error.message || 'Conversion failed',
        variant: (error.toastVariant as 'destructive') || 'destructive',
      });
    } finally {
      onConvertingChange(false);
    }
  };

  return (
    <GlassCard hover={false} animated={false} className="border-accent-green/30 h-full">
      <GlassCardHeader>
        <GlassCardTitle>Or Paste Markdown</GlassCardTitle>
        <GlassCardDescription>
          Paste your markdown content directly
        </GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent>
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
            className="w-full min-h-[400px] p-4 rounded-lg bg-glass-white-md backdrop-blur-sm border border-glass-border text-gray-100 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue/50 custom-scrollbar"
          />
          <GlassButton
            type="submit"
            variant="green"
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
          </GlassButton>
        </form>
      </GlassCardContent>
    </GlassCard>
  );
}


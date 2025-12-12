import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { type ResultsState, type FileItem } from './types';
import { CheckCircle, XCircle, Info, FileText } from '@phosphor-icons/react';
import { Button } from '../../ui/button';
import { previewPdf } from '../../../services/scan2pdf';

interface ConversionStatsProps {
  results: ResultsState;
  fileList: FileItem[];
}

export function ConversionStats({ results, fileList }: ConversionStatsProps) {
  const handlePreviewPdf = (path: string) => {
    if (path) {
      window.open(previewPdf(path), '_blank');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Stats</CardTitle>
        <CardDescription>Real-time conversion progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="text-2xl font-bold text-primary">{results.successful}</div>
            <div className="text-xs text-muted-foreground">Successful</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted border border-border">
            <div className="text-2xl font-bold text-muted-foreground">{results.skipped}</div>
            <div className="text-xs text-muted-foreground">Skipped</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <div className="text-2xl font-bold text-destructive">{results.failed}</div>
            <div className="text-xs text-muted-foreground">Failed</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Converted Files</h3>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {fileList.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No files converted yet
              </p>
            ) : (
              fileList.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50"
                >
                  <div className="flex items-center gap-2">
                    {file.status === 'success' && <CheckCircle className="h-4 w-4 text-primary" weight="duotone" />}
                    {file.status === 'skipped' && <Info className="h-4 w-4 text-muted-foreground" weight="duotone" />}
                    {file.status === 'failed' && <XCircle className="h-4 w-4 text-destructive" weight="duotone" />}
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === 'success' && file.output_path && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePreviewPdf(file.output_path!)}
                      >
                        <FileText className="h-4 w-4" weight="duotone" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


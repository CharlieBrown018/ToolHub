import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '../../ui/glass-card';
import { type ResultsState, type FileItem } from './types';
import { CheckCircle, XCircle, Info, FileText } from '@phosphor-icons/react';
import { GlassButton } from '../../ui/glass-button';
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
    <GlassCard hover={false} animated={false} className="border-accent-blue/20">
      <GlassCardHeader>
        <GlassCardTitle>Conversion Stats</GlassCardTitle>
        <GlassCardDescription>Real-time conversion progress</GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-accent-blue/10 backdrop-blur-sm border border-accent-blue/20">
            <div className="text-2xl font-bold text-accent-blue">{results.successful}</div>
            <div className="text-xs text-gray-400">Successful</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-glass-white-md backdrop-blur-sm border border-glass-border">
            <div className="text-2xl font-bold text-gray-300">{results.skipped}</div>
            <div className="text-xs text-gray-400">Skipped</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-red-500/10 backdrop-blur-sm border border-red-500/20">
            <div className="text-2xl font-bold text-red-400">{results.failed}</div>
            <div className="text-xs text-gray-400">Failed</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-100">Converted Files</h3>
          <div className="max-h-96 overflow-y-auto space-y-2 custom-scrollbar">
            {fileList.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">
                No files converted yet
              </p>
            ) : (
              fileList.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-glass-white-md backdrop-blur-sm border border-glass-border"
                >
                  <div className="flex items-center gap-2">
                    {file.status === 'success' && <CheckCircle className="h-4 w-4 text-accent-blue" weight="duotone" />}
                    {file.status === 'skipped' && <Info className="h-4 w-4 text-gray-400" weight="duotone" />}
                    {file.status === 'failed' && <XCircle className="h-4 w-4 text-red-400" weight="duotone" />}
                    <span className="text-sm text-gray-100">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === 'success' && file.output_path && (
                      <GlassButton
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePreviewPdf(file.output_path!)}
                      >
                        <FileText className="h-4 w-4" weight="duotone" />
                      </GlassButton>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
}


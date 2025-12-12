import { useState } from 'react';
import { convertFiles, type ConvertProgress } from '../../services/scan2pdf';
import { useToast } from '../../components/ui/use-toast';
import { type ProgressState, type ResultsState, type FileItem } from '../../components/tools/scan2pdf/types';

interface ConversionOptions {
  skipExisting: boolean;
  combinePdfs: boolean;
}

export function useConversion() {
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState<ProgressState>({ current: 0, total: 0, percent: 0 });
  const [results, setResults] = useState<ResultsState>({ successful: 0, failed: 0, skipped: 0 });
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const { toast } = useToast();

  const startConversion = async (
    inputFiles: string[],
    outputPath: string,
    options: ConversionOptions
  ) => {
    setIsConverting(true);
    setProgress({ current: 0, total: 0, percent: 0 });
    setResults({ successful: 0, failed: 0, skipped: 0 });
    setFileList([]);

    try {
      await convertFiles(
        inputFiles,
        outputPath,
        options,
        (data: ConvertProgress) => {
          if (data.type === 'progress') {
            setProgress({
              current: data.current || 0,
              total: data.total || 0,
              percent: data.percent || 0,
            });
          } else if (data.type === 'file_complete') {
            setFileList(prev => [...prev, {
              name: data.file || '',
              status: data.status || 'success',
              message: data.message || '',
              output_path: data.output_path,
            }]);
          } else if (data.type === 'complete') {
            setResults({
              successful: data.successful || 0,
              failed: data.failed || 0,
              skipped: data.skipped || 0,
            });
            setIsConverting(false);
            toast({
              title: 'Conversion complete',
              description: `Successfully converted ${data.successful} file(s)`,
            });
          } else if (data.type === 'error') {
            setIsConverting(false);
            toast({
              title: 'Error',
              description: data.message || 'Conversion failed',
              variant: 'destructive',
            });
          }
        },
        (error: Error) => {
          setIsConverting(false);
          toast({
            title: 'Error',
            description: 'Conversion failed: ' + error.message,
            variant: 'destructive',
          });
        }
      );
    } catch (err: unknown) {
      setIsConverting(false);
      const error = err instanceof Error ? err.message : 'Unknown error';
      toast({
        title: 'Error',
        description: 'Conversion failed: ' + error,
        variant: 'destructive',
      });
    }
  };

  return {
    isConverting,
    progress,
    results,
    fileList,
    startConversion,
  };
}


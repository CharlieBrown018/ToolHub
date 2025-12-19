import { useState } from 'react';
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '../ui/glass-card';
import { GlassButton } from '../ui/glass-button';
import { useApiToast } from '../../hooks/useApiToast';
import { CircleNotch, Image } from '@phosphor-icons/react';
import { ToolLayout } from '../layouts/ToolLayout';
import { PageTransition } from '../animations/PageTransition';
import { FileDropzone } from './scan2pdf/FileDropzone';
import { ConversionStats } from './scan2pdf/ConversionStats';
import { ConversionOptions } from './scan2pdf/ConversionOptions';
import { ProgressDisplay } from './scan2pdf/ProgressDisplay';
import { useConversion } from '../../hooks/scan2pdf/useConversion';

function Scan2PDF() {
  const [inputFiles, setInputFiles] = useState<string[]>([]);
  const [outputPath, setOutputPath] = useState('');
  const [skipExisting, setSkipExisting] = useState(true);
  const [combinePdfs, setCombinePdfs] = useState(false);
  const { toast } = useApiToast(); // UI-only actions (validation messages)
  const { isConverting, progress, results, fileList, startConversion } = useConversion();

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputFiles.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select input files',
        variant: 'destructive',
      });
      return;
    }
    
    if (!outputPath) {
      toast({
        title: 'Error',
        description: 'Please select output folder',
        variant: 'destructive',
      });
      return;
    }

    await startConversion(inputFiles, outputPath, {
      skipExisting,
      combinePdfs,
    });
  };

  return (
    <PageTransition>
      <ToolLayout
        title="Scan2PDF"
        subtitle="Convert images and PDFs to searchable PDFs with OCR"
        icon={Image}
        iconColor="blue"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false} animated={false} className="border-accent-blue/30 h-full">
          <GlassCardHeader>
            <GlassCardTitle>Convert Files</GlassCardTitle>
            <GlassCardDescription>
                Select images or PDFs to convert to searchable PDFs
            </GlassCardDescription>
          </GlassCardHeader>
          <GlassCardContent>
              <form onSubmit={handleConvert} className="space-y-6">
                <FileDropzone
                  inputFiles={inputFiles}
                  outputPath={outputPath}
                  onInputFilesChange={setInputFiles}
                  onOutputPathChange={setOutputPath}
                  disabled={isConverting}
                />

                <ConversionOptions
                  skipExisting={skipExisting}
                  combinePdfs={combinePdfs}
                  onSkipExistingChange={setSkipExisting}
                  onCombinePdfsChange={setCombinePdfs}
                  disabled={isConverting}
                />

              <GlassButton
                  type="submit"
                variant="blue"
                  disabled={isConverting || inputFiles.length === 0 || !outputPath}
                  className="w-full"
                >
                  {isConverting ? (
                    <>
                      <CircleNotch className="h-4 w-4 mr-2 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    'Convert to PDF'
                  )}
              </GlassButton>

                {isConverting && <ProgressDisplay progress={progress} />}
              </form>
          </GlassCardContent>
        </GlassCard>

          <ConversionStats results={results} fileList={fileList} />
        </div>
      </ToolLayout>
    </PageTransition>
  );
}

export default Scan2PDF;

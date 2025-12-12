import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { CheckCircle, XCircle, CircleNotch } from '@phosphor-icons/react';
import { checkTesseractStatus } from '../../services/scan2pdf';
import { Header } from '../ui/header';
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
  const [tesseractAvailable, setTesseractAvailable] = useState(false);
  const { toast } = useToast();
  const { isConverting, progress, results, fileList, startConversion } = useConversion();

  useEffect(() => {
    checkTesseractStatus().then((status) => {
      setTesseractAvailable(status.tesseract_available);
    });
  }, []);

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

  const statusBadge = (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-background/50 border border-border/50">
      {tesseractAvailable ? (
        <>
          <CheckCircle className="h-4 w-4 text-primary" weight="duotone" />
          <span className="text-sm">Tesseract OCR Available</span>
        </>
      ) : (
        <>
          <XCircle className="h-4 w-4 text-yellow-400" weight="duotone" />
          <span className="text-sm">Tesseract OCR Not Found</span>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Scan2PDF"
        subtitle="Convert images and PDFs to searchable PDFs with OCR"
        statusBadge={statusBadge}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Convert Files</CardTitle>
              <CardDescription>
                Select images or PDFs to convert to searchable PDFs
              </CardDescription>
            </CardHeader>
            <CardContent>
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

                <Button
                  type="submit"
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
                </Button>

                {isConverting && <ProgressDisplay progress={progress} />}
              </form>
            </CardContent>
          </Card>

          <ConversionStats results={results} fileList={fileList} />
        </div>
      </div>
    </div>
  );
}

export default Scan2PDF;

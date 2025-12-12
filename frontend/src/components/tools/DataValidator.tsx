import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '../ui/use-toast';
import { type FormatType } from '../../services/datavalidator';
import { Header } from '../ui/header';
import { CodeEditor } from './datavalidator/CodeEditor';
import { ValidationResultDisplay } from './datavalidator/ValidationResult';
import { ActionButtons } from './datavalidator/ActionButtons';
import { useDataValidator } from '../../hooks/datavalidator/useDataValidator';

function DataValidator() {
  const [inputContent, setInputContent] = useState('');
  const [outputContent, setOutputContent] = useState('');
  const [inputFormat, setInputFormat] = useState<FormatType>('json');
  const [outputFormat, setOutputFormat] = useState<FormatType>('json');
  const { toast } = useToast();
  const {
    isProcessing,
    validationResult,
    handleValidate,
    handleConvert,
    handleFormat,
    handleMinify,
  } = useDataValidator();

  const onValidate = () => {
    handleValidate(inputContent, inputFormat);
  };

  const onConvert = async () => {
    const converted = await handleConvert(inputContent, inputFormat, outputFormat);
    if (converted) {
      setOutputContent(converted);
    }
  };

  const onFormat = async () => {
    const formatted = await handleFormat(inputContent, inputFormat);
    setInputContent(formatted);
  };

  const onMinify = async () => {
    const minified = await handleMinify(inputContent, inputFormat);
    setInputContent(minified);
  };

  const handleCopy = (content: string, type: 'input' | 'output') => {
    navigator.clipboard.writeText(content);
    toast({
      title: 'Copied',
      description: `${type === 'input' ? 'Input' : 'Output'} copied to clipboard`,
    });
  };

  const handleDownload = (content: string, format: FormatType) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `output.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: 'Downloaded',
      description: `File saved as output.${format}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="DataValidator"
        subtitle="Validate and convert between JSON, XML, YAML, CSV, and TOML formats"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Input</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeEditor
                content={inputContent}
                format={inputFormat}
                onContentChange={setInputContent}
                onFormatChange={setInputFormat}
                disabled={isProcessing}
                placeholder={`Enter ${inputFormat.toUpperCase()} content here...`}
              />
              <ActionButtons
                isProcessing={isProcessing}
                inputContent={inputContent}
                outputContent={outputContent}
                inputFormat={inputFormat}
                outputFormat={outputFormat}
                validationResult={validationResult}
                onValidate={onValidate}
                onConvert={onConvert}
                onFormat={onFormat}
                onMinify={onMinify}
                onCopy={handleCopy}
                onDownload={handleDownload}
              />
              <ValidationResultDisplay result={validationResult} />
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Output</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeEditor
                content={outputContent}
                format={outputFormat}
                onContentChange={setOutputContent}
                onFormatChange={setOutputFormat}
                disabled={isProcessing}
                readOnly
                placeholder={`${outputFormat.toUpperCase()} output will appear here...`}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DataValidator;

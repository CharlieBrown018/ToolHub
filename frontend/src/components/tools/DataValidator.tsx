import { useState } from 'react';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '../ui/glass-card';
import { useToast } from '../../hooks/useToast';
import { type FormatType } from '../../services/datavalidator';
import { ToolLayout } from '../layouts/ToolLayout';
import { PageTransition } from '../animations/PageTransition';
import { CodeEditor } from './datavalidator/CodeEditor';
import { ValidationResultDisplay } from './datavalidator/ValidationResult';
import { ActionButtons } from './datavalidator/ActionButtons';
import { useDataValidator } from '../../hooks/datavalidator/useDataValidator';
import { CheckCircle } from '@phosphor-icons/react';

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
    <PageTransition>
      <ToolLayout
        title="DataValidator"
        subtitle="Validate and convert between JSON, XML, YAML, CSV, and TOML formats"
        icon={CheckCircle}
        iconColor="purple"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <GlassCard hover={false} animated={false} className="border-accent-purple/20">
          <GlassCardHeader>
            <div className="flex items-center justify-between">
              <GlassCardTitle>Input</GlassCardTitle>
            </div>
          </GlassCardHeader>
          <GlassCardContent className="space-y-4">
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
          </GlassCardContent>
        </GlassCard>

        {/* Output Section */}
        <GlassCard hover={false} animated={false} className="border-accent-purple/20">
          <GlassCardHeader>
            <div className="flex items-center justify-between">
              <GlassCardTitle>Output</GlassCardTitle>
            </div>
          </GlassCardHeader>
          <GlassCardContent className="space-y-4">
            <CodeEditor
              content={outputContent}
              format={outputFormat}
              onContentChange={setOutputContent}
              onFormatChange={setOutputFormat}
              disabled={isProcessing}
              readOnly
              placeholder={`${outputFormat.toUpperCase()} output will appear here...`}
            />
            </GlassCardContent>
          </GlassCard>
        </div>
      </ToolLayout>
    </PageTransition>
  );
}

export default DataValidator;

import { GlassButton } from '../../ui/glass-button';
import { CircleNotch, CheckCircle, XCircle, Code, Copy, Download } from '@phosphor-icons/react';
import { type FormatType } from '../../../services/datavalidator';
import { type ValidationResult } from './types';

interface ActionButtonsProps {
  isProcessing: boolean;
  inputContent: string;
  outputContent: string;
  inputFormat: FormatType;
  outputFormat: FormatType;
  validationResult: ValidationResult | null;
  onValidate: () => void;
  onConvert: () => void;
  onFormat: () => void;
  onMinify: () => void;
  onCopy: (content: string, type: 'input' | 'output') => void;
  onDownload: (content: string, format: FormatType) => void;
}

export function ActionButtons({
  isProcessing,
  inputContent,
  outputContent,
  inputFormat,
  outputFormat,
  validationResult,
  onValidate,
  onConvert,
  onFormat,
  onMinify,
  onCopy,
  onDownload,
}: ActionButtonsProps) {
  return (
    <>
      {/* Input Actions */}
      <div className="flex flex-wrap gap-2">
        <GlassButton
          onClick={onValidate}
          disabled={isProcessing || !inputContent.trim()}
          variant="purple"
          size="sm"
        >
          {isProcessing ? (
            <CircleNotch className="h-4 w-4 mr-2 animate-spin" weight="duotone" />
          ) : validationResult?.valid ? (
            <CheckCircle className="h-4 w-4 mr-2 text-accent-blue" weight="duotone" />
          ) : validationResult?.valid === false ? (
            <XCircle className="h-4 w-4 mr-2 text-red-400" weight="duotone" />
          ) : (
            <Code className="h-4 w-4 mr-2" weight="duotone" />
          )}
          Validate
        </GlassButton>
        <GlassButton
          onClick={onFormat}
          disabled={isProcessing || !inputContent.trim()}
          variant="purple"
          size="sm"
        >
          Format
        </GlassButton>
        {inputFormat === 'json' && (
          <GlassButton
            onClick={onMinify}
            disabled={isProcessing || !inputContent.trim()}
            variant="purple"
            size="sm"
          >
            Minify
          </GlassButton>
        )}
        <GlassButton
          onClick={() => onCopy(inputContent, 'input')}
          disabled={!inputContent.trim()}
          variant="outline"
          size="sm"
        >
          <Copy className="h-4 w-4 mr-2" weight="duotone" />
          Copy
        </GlassButton>
      </div>

      {/* Output Actions */}
      <div className="flex flex-wrap gap-2">
        <GlassButton
          onClick={onConvert}
          disabled={isProcessing || !inputContent.trim()}
          className="flex-1"
        >
          {isProcessing ? (
            <>
              <CircleNotch className="h-4 w-4 mr-2 animate-spin" weight="duotone" />
              Converting...
            </>
          ) : (
            <>
              <Code className="h-4 w-4 mr-2" weight="duotone" />
              Convert
            </>
          )}
        </GlassButton>
        <GlassButton
          onClick={() => onCopy(outputContent, 'output')}
          disabled={!outputContent.trim()}
          variant="outline"
          size="sm"
        >
          <Copy className="h-4 w-4 mr-2" weight="duotone" />
          Copy
        </GlassButton>
        <GlassButton
          onClick={() => onDownload(outputContent, outputFormat)}
          disabled={!outputContent.trim()}
          variant="outline"
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" weight="duotone" />
          Download
        </GlassButton>
      </div>
    </>
  );
}


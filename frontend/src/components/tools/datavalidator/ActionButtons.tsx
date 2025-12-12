import { Button } from '../../ui/button';
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
        <Button
          onClick={onValidate}
          disabled={isProcessing || !inputContent.trim()}
          variant="outline"
          size="sm"
        >
          {isProcessing ? (
            <CircleNotch className="h-4 w-4 mr-2 animate-spin" weight="duotone" />
          ) : validationResult?.valid ? (
            <CheckCircle className="h-4 w-4 mr-2 text-primary" weight="duotone" />
          ) : validationResult?.valid === false ? (
            <XCircle className="h-4 w-4 mr-2 text-red-400" weight="duotone" />
          ) : (
            <Code className="h-4 w-4 mr-2" weight="duotone" />
          )}
          Validate
        </Button>
        <Button
          onClick={onFormat}
          disabled={isProcessing || !inputContent.trim()}
          variant="outline"
          size="sm"
        >
          Format
        </Button>
        {inputFormat === 'json' && (
          <Button
            onClick={onMinify}
            disabled={isProcessing || !inputContent.trim()}
            variant="outline"
            size="sm"
          >
            Minify
          </Button>
        )}
        <Button
          onClick={() => onCopy(inputContent, 'input')}
          disabled={!inputContent.trim()}
          variant="outline"
          size="sm"
        >
          <Copy className="h-4 w-4 mr-2" weight="duotone" />
          Copy
        </Button>
      </div>

      {/* Output Actions */}
      <div className="flex flex-wrap gap-2">
        <Button
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
        </Button>
        <Button
          onClick={() => onCopy(outputContent, 'output')}
          disabled={!outputContent.trim()}
          variant="outline"
          size="sm"
        >
          <Copy className="h-4 w-4 mr-2" weight="duotone" />
          Copy
        </Button>
        <Button
          onClick={() => onDownload(outputContent, outputFormat)}
          disabled={!outputContent.trim()}
          variant="outline"
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" weight="duotone" />
          Download
        </Button>
      </div>
    </>
  );
}


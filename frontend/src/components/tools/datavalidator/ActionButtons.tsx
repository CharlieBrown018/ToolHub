import { GlassButton } from '../../ui/glass-button';
import { CircleNotch, CheckCircle, XCircle, Code, Copy, Download } from '@phosphor-icons/react';
import { type FormatType } from '../../../services/datavalidator';
import { type ValidationResult } from './types';

interface InputActionsProps {
  isProcessing: boolean;
  inputContent: string;
  inputFormat: FormatType;
  validationResult: ValidationResult | null;
  onValidate: () => void;
  onConvert: () => void;
  onFormat: () => void;
  onMinify: () => void;
}

export function InputActions({
  isProcessing,
  inputContent,
  inputFormat,
  validationResult,
  onValidate,
  onConvert,
  onFormat,
  onMinify,
}: InputActionsProps) {
  return (
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
        onClick={onConvert}
        disabled={isProcessing || !inputContent.trim()}
        variant="purple"
        size="sm"
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
    </div>
  );
}

interface OutputActionsProps {
  outputContent: string;
  outputFormat: FormatType;
  onCopy: (content: string) => void;
  onDownload: (content: string, format: FormatType) => void;
}

export function OutputActions({
  outputContent,
  outputFormat,
  onCopy,
  onDownload,
}: OutputActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <GlassButton
        onClick={() => onCopy(outputContent)}
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
  );
}


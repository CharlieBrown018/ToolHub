import { useState } from 'react';
import { validate, convert, format as formatContent, minify, type FormatType } from '../../services/datavalidator';
import { useToast } from '../useToast';
import { type ValidationResult } from '../../components/tools/datavalidator/types';

export function useDataValidator() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const { toast } = useToast();

  const handleValidate = async (content: string, format: FormatType) => {
    if (!content.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter content to validate',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await validate(content, format);
      setValidationResult({ valid: result.valid, error: result.error });
      
      if (result.valid) {
        toast({
          title: 'Valid',
          description: `${format.toUpperCase()} is valid`,
        });
      } else {
        toast({
          title: 'Invalid',
          description: result.error || 'Validation failed',
          variant: 'destructive',
        });
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Validation failed';
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConvert = async (
    content: string,
    inputFormat: FormatType,
    outputFormat: FormatType
  ): Promise<string> => {
    if (!content.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter content to convert',
        variant: 'destructive',
      });
      return '';
    }

    setIsProcessing(true);
    try {
      const result = await convert(content, inputFormat, outputFormat);
      toast({
        title: 'Success',
        description: `Converted from ${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()}`,
      });
      return result.converted;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Conversion failed';
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
      return '';
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFormat = async (content: string, format: FormatType): Promise<string> => {
    if (!content.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter content to format',
        variant: 'destructive',
      });
      return content;
    }

    setIsProcessing(true);
    try {
      const result = await formatContent(content, format, 2);
      toast({
        title: 'Success',
        description: 'Content formatted',
      });
      return result.formatted;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Formatting failed';
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
      return content;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMinify = async (content: string, format: FormatType): Promise<string> => {
    if (!content.trim() || format !== 'json') {
      toast({
        title: 'Error',
        description: 'Minify only works with JSON',
        variant: 'destructive',
      });
      return content;
    }

    setIsProcessing(true);
    try {
      const result = await minify(content);
      toast({
        title: 'Success',
        description: 'JSON minified',
      });
      return result.minified;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Minification failed';
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
      return content;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    validationResult,
    handleValidate,
    handleConvert,
    handleFormat,
    handleMinify,
  };
}


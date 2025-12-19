import { useState } from 'react';
import { type FormatType } from '../../services/datavalidator';
import { useApiToast } from '../useApiToast';
import { type ValidationResult } from '../../components/tools/datavalidator/types';

export function useDataValidator() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const { callApi, toast } = useApiToast();

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
      // Use callApi - automatically shows toast with backend message
      const result = await callApi<ValidationResult>(
        '/api/tools/data-validator/validate',
        {
          method: 'POST',
          body: JSON.stringify({ content, format }),
        },
        {
          successTitle: 'Validation Result',
        }
      );
      
      setValidationResult({ valid: result.valid, error: result.error });
    } catch (err: unknown) {
      // Error toast already shown by callApi
      setValidationResult(null);
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
      // Use callApi - automatically shows toast with backend message
      const result = await callApi<{ converted: string }>(
        '/api/tools/data-validator/convert',
        {
          method: 'POST',
          body: JSON.stringify({
            content,
            from_format: inputFormat,
            to_format: outputFormat,
          }),
        }
      );
      
      return result.converted || '';
    } catch (err: unknown) {
      // Error toast already shown by callApi
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
      // Use callApi - automatically shows toast with backend message
      const result = await callApi<{ formatted: string }>(
        '/api/tools/data-validator/format',
        {
          method: 'POST',
          body: JSON.stringify({ content, format, indent: 2 }),
        }
      );
      
      return result.formatted || content;
    } catch (err: unknown) {
      // Error toast already shown by callApi
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
      // Use callApi - automatically shows toast with backend message
      const result = await callApi<{ minified: string }>(
        '/api/tools/data-validator/minify',
        {
          method: 'POST',
          body: JSON.stringify({ content, format: 'json' }),
        }
      );
      
      return result.minified || content;
    } catch (err: unknown) {
      // Error toast already shown by callApi
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


import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { type ValidationResult } from './types';

interface ValidationResultProps {
  result: ValidationResult;
}

export function ValidationResultDisplay({ result }: ValidationResultProps) {
  if (!result) return null;

  return (
    <div className={`p-3 rounded-md border ${
      result.valid
        ? 'bg-primary/5 border-primary/20 text-primary'
        : 'bg-destructive/10 border-destructive/20 text-destructive'
    }`}>
      <div className="flex items-center gap-2">
        {result.valid ? (
          <CheckCircle className="h-4 w-4" weight="duotone" />
        ) : (
          <XCircle className="h-4 w-4" weight="duotone" />
        )}
        <span className="text-sm font-medium">
          {result.valid ? 'Valid' : 'Invalid'}
        </span>
      </div>
      {result.error && (
        <p className="text-xs mt-1">{result.error}</p>
      )}
    </div>
  );
}


import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { type ValidationResult } from './types';

interface ValidationResultProps {
  result: ValidationResult;
}

export function ValidationResultDisplay({ result }: ValidationResultProps) {
  if (!result) return null;

  return (
    <div className={`p-3 rounded-lg border backdrop-blur-sm ${
      result.valid
        ? 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue'
        : 'bg-red-500/10 border-red-500/20 text-red-400'
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
        <p className="text-xs mt-1 text-gray-300">{result.error}</p>
      )}
    </div>
  );
}


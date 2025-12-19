import { type ContrastResult } from './types';

interface ContrastResultProps {
  result: ContrastResult;
}

export function ContrastResultDisplay({ result }: ContrastResultProps) {
  return (
    <div className="p-4 rounded-lg bg-glass-white-md backdrop-blur-sm border border-glass-border">
      <div className="text-2xl font-bold mb-2 text-gray-100">
        {result.contrast_ratio}:1
      </div>
      <div className="text-sm mb-2 text-gray-300">{result.rating}</div>
      <div className="text-xs space-y-1 text-gray-400">
        <div>AA Normal: {result.wcag.aa_normal ? '✓' : '✗'}</div>
        <div>AA Large: {result.wcag.aa_large ? '✓' : '✗'}</div>
        <div>AAA Normal: {result.wcag.aaa_normal ? '✓' : '✗'}</div>
        <div>AAA Large: {result.wcag.aaa_large ? '✓' : '✗'}</div>
      </div>
    </div>
  );
}


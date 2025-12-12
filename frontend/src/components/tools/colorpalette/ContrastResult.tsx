import { type ContrastResult } from './types';

interface ContrastResultProps {
  result: ContrastResult;
}

export function ContrastResultDisplay({ result }: ContrastResultProps) {
  return (
    <div className="p-4 rounded-lg bg-background/50 border border-border">
      <div className="text-2xl font-bold mb-2">
        {result.contrast_ratio}:1
      </div>
      <div className="text-sm mb-2">{result.rating}</div>
      <div className="text-xs space-y-1">
        <div>AA Normal: {result.wcag.aa_normal ? '✓' : '✗'}</div>
        <div>AA Large: {result.wcag.aa_large ? '✓' : '✗'}</div>
        <div>AAA Normal: {result.wcag.aaa_normal ? '✓' : '✗'}</div>
        <div>AAA Large: {result.wcag.aaa_large ? '✓' : '✗'}</div>
      </div>
    </div>
  );
}


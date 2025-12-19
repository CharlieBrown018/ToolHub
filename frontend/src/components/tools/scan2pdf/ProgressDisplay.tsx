import { GlassProgress } from '../../ui/glass-progress';
import { type ProgressState } from './types';

interface ProgressDisplayProps {
  progress: ProgressState;
}

export function ProgressDisplay({ progress }: ProgressDisplayProps) {
  if (progress.total === 0) return null;

  return (
    <div className="space-y-2">
      <GlassProgress value={progress.percent} />
      <p className="text-xs text-center text-gray-400">
        {progress.current} / {progress.total} files ({progress.percent}%)
      </p>
    </div>
  );
}


import { Progress } from '../../ui/progress';
import { type ProgressState } from './types';

interface ProgressDisplayProps {
  progress: ProgressState;
}

export function ProgressDisplay({ progress }: ProgressDisplayProps) {
  if (progress.total === 0) return null;

  return (
    <div className="space-y-2">
      <Progress value={progress.percent} />
      <p className="text-xs text-center text-muted-foreground">
        {progress.current} / {progress.total} files ({progress.percent}%)
      </p>
    </div>
  );
}


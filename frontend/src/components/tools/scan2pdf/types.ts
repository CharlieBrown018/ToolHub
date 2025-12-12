export interface FileItem {
  name: string;
  status: 'success' | 'failed' | 'skipped';
  message: string;
  output_path?: string;
}

export interface ProgressState {
  current: number;
  total: number;
  percent: number;
}

export interface ResultsState {
  successful: number;
  failed: number;
  skipped: number;
}


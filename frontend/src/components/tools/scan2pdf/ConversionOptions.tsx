interface ConversionOptionsProps {
  skipExisting: boolean;
  combinePdfs: boolean;
  onSkipExistingChange: (value: boolean) => void;
  onCombinePdfsChange: (value: boolean) => void;
  disabled?: boolean;
}

export function ConversionOptions({
  skipExisting,
  combinePdfs,
  onSkipExistingChange,
  onCombinePdfsChange,
  disabled,
}: ConversionOptionsProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-100">Options</label>
      <div className="flex items-center space-x-2 p-2 rounded-lg bg-glass-white-md/50 backdrop-blur-sm border border-glass-border/50 hover:bg-glass-white-md transition-colors">
        <input
          type="checkbox"
          id="skipExisting"
          checked={skipExisting}
          onChange={(e) => onSkipExistingChange(e.target.checked)}
          disabled={disabled}
          className="w-4 h-4 rounded border-glass-border bg-glass-white-md backdrop-blur-sm accent-accent-blue focus:ring-2 focus:ring-accent-blue focus:ring-offset-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <label htmlFor="skipExisting" className="text-sm cursor-pointer text-gray-300 hover:text-gray-100 transition-colors">
          Skip already converted files
        </label>
      </div>
      <div className="flex items-center space-x-2 p-2 rounded-lg bg-glass-white-md/50 backdrop-blur-sm border border-glass-border/50 hover:bg-glass-white-md transition-colors">
        <input
          type="checkbox"
          id="combinePdfs"
          checked={combinePdfs}
          onChange={(e) => onCombinePdfsChange(e.target.checked)}
          disabled={disabled}
          className="w-4 h-4 rounded border-glass-border bg-glass-white-md backdrop-blur-sm accent-accent-blue focus:ring-2 focus:ring-accent-blue focus:ring-offset-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <label htmlFor="combinePdfs" className="text-sm cursor-pointer text-gray-300 hover:text-gray-100 transition-colors">
          Combine all PDFs into one file
        </label>
      </div>
    </div>
  );
}


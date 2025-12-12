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
      <label className="text-sm font-medium">Options</label>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="skipExisting"
          checked={skipExisting}
          onChange={(e) => onSkipExistingChange(e.target.checked)}
          disabled={disabled}
          className="rounded border-border"
        />
        <label htmlFor="skipExisting" className="text-sm cursor-pointer">
          Skip already converted files
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="combinePdfs"
          checked={combinePdfs}
          onChange={(e) => onCombinePdfsChange(e.target.checked)}
          disabled={disabled}
          className="rounded border-border"
        />
        <label htmlFor="combinePdfs" className="text-sm cursor-pointer">
          Combine all PDFs into one file
        </label>
      </div>
    </div>
  );
}


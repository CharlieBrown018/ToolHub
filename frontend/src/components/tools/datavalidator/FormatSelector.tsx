import { type FormatType } from '../../../services/datavalidator';

interface FormatSelectorProps {
  format: FormatType;
  onFormatChange: (format: FormatType) => void;
  disabled?: boolean;
}

const formats: FormatType[] = ['json', 'xml', 'yaml', 'csv', 'toml'];

export function FormatSelector({ format, onFormatChange, disabled }: FormatSelectorProps) {
  return (
    <select
      value={format}
      onChange={(e) => onFormatChange(e.target.value as FormatType)}
      disabled={disabled}
      className="px-3 py-2 rounded-lg bg-glass-white-md backdrop-blur-sm border border-glass-border text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-accent-purple/50 hover:bg-glass-white-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {formats.map((f) => (
        <option key={f} value={f} className="bg-bg-primary text-gray-100">
          {f.toUpperCase()}
        </option>
      ))}
    </select>
  );
}


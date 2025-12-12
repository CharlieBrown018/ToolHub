import { type FormatType } from '../../../../services/datavalidator';

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
      className="px-3 py-1 rounded-md bg-background border border-border text-sm"
    >
      {formats.map((f) => (
        <option key={f} value={f}>
          {f.toUpperCase()}
        </option>
      ))}
    </select>
  );
}


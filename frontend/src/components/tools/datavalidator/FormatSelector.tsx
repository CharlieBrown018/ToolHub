import { type FormatType } from '../../../services/datavalidator';
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from '../../ui/glass-select';

interface FormatSelectorProps {
  format: FormatType;
  onFormatChange: (format: FormatType) => void;
  disabled?: boolean;
}

const formats: FormatType[] = ['json', 'xml', 'yaml', 'csv', 'toml'];

export function FormatSelector({ format, onFormatChange, disabled }: FormatSelectorProps) {
  return (
    <GlassSelect value={format} onValueChange={(value: string) => onFormatChange(value as FormatType)} disabled={disabled}>
      <GlassSelectTrigger variant="purple" className="w-full">
        <GlassSelectValue placeholder="Select format" />
      </GlassSelectTrigger>
      <GlassSelectContent variant="purple">
        {formats.map((f) => (
          <GlassSelectItem key={f} value={f} variant="purple">
            {f.toUpperCase()}
          </GlassSelectItem>
        ))}
      </GlassSelectContent>
    </GlassSelect>
  );
}


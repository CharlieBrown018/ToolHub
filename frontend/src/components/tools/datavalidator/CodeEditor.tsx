import { FormatSelector } from './FormatSelector';
import { type EditorProps } from './types';

export function CodeEditor({
  content,
  format,
  onContentChange,
  onFormatChange,
  disabled,
  readOnly,
  placeholder,
}: EditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FormatSelector
            format={format}
            onFormatChange={onFormatChange}
            disabled={disabled}
          />
        </div>
      </div>
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className="w-full min-h-[300px] p-4 rounded-lg bg-glass-white-md backdrop-blur-sm border border-glass-border text-gray-100 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-accent-purple/50 custom-scrollbar"
      />
    </div>
  );
}


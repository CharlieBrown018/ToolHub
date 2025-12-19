import { type FormatType } from '../../../services/datavalidator';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface EditorProps {
  content: string;
  format: FormatType;
  onContentChange: (content: string) => void;
  onFormatChange: (format: FormatType) => void;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  showDropzone?: boolean;
}


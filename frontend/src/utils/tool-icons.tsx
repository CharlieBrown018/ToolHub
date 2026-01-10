import { 
  Image, 
  FileText, 
  CheckCircle, 
  Palette, 
  Lightning, 
  ArrowsInSimple, 
  Columns, 
  ShieldCheck, 
  ArrowsLeftRight, 
  QrCode
} from '@phosphor-icons/react';

export function getToolIcon(toolId: string) {
  const iconMap: Record<string, React.ComponentType<any>> = {
    'image-to-pdf': Image,
    'md-to-pdf': FileText,
    'data-validator': CheckCircle,
    'color-palette': Palette,
    'webp-express': Lightning,
    'shrink-it': ArrowsInSimple,
    'diff-master': Columns,
    'secure-pass': ShieldCheck,
    'unit-flow': ArrowsLeftRight,
    'quick-qr': QrCode,
  };
  return iconMap[toolId] || Image;
}

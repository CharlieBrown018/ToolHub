import { type Color } from '../../services/colorpalette';

export function exportPalette(colors: Color[], format: 'css' | 'json' | 'scss'): string {
  if (format === 'css') {
    return `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')}\n}`;
  } else if (format === 'scss') {
    return colors.map((c, i) => `$color-${i + 1}: ${c.hex};`).join('\n');
  } else {
    return JSON.stringify(colors, null, 2);
  }
}

export function downloadPalette(content: string, format: 'css' | 'json' | 'scss') {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `palette-${Date.now()}.${format === 'json' ? 'json' : format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '../../ui/glass-card';
import { Settings, Info } from '@phosphor-icons/react';
import * as Slider from '@radix-ui/react-slider';

interface WebPOptionsProps {
  quality: number;
  onQualityChange: (value: number) => void;
  preserveMetadata: boolean;
  onPreserveMetadataChange: (value: boolean) => void;
  lossless: boolean;
  onLosslessChange: (value: boolean) => void;
  disabled?: boolean;
}

export function WebPOptions({
  quality,
  onQualityChange,
  preserveMetadata,
  onPreserveMetadataChange,
  lossless,
  onLosslessChange,
  disabled = false,
}: WebPOptionsProps) {
  return (
    <GlassCard className="border-accent-indigo/30 shadow-indigo-glow/10">
      <GlassCardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-accent-indigo" weight="duotone" />
          <GlassCardTitle className="text-lg">Conversion Settings</GlassCardTitle>
        </div>
      </GlassCardHeader>
      <GlassCardContent className="space-y-6">
        {/* Quality Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
              Image Quality
              <div className="group relative">
                <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900/95 backdrop-blur-md border border-glass-border rounded-lg text-[10px] text-gray-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  Higher quality results in larger file size. 75-85 is recommended for web.
                </div>
              </div>
            </label>
            <span className="text-xs font-mono bg-accent-indigo/20 text-accent-indigo px-2 py-0.5 rounded-full border border-accent-indigo/30">
              {quality}%
            </span>
          </div>
          
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[quality]}
            onValueChange={(vals) => onQualityChange(vals[0])}
            max={100}
            min={1}
            step={1}
            disabled={disabled || lossless}
          >
            <Slider.Track className="bg-glass-white-xl border border-glass-border relative grow rounded-full h-[6px]">
              <Slider.Range className="absolute bg-accent-indigo rounded-full h-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-4 h-4 bg-white border-2 border-accent-indigo shadow-lg rounded-full hover:scale-125 focus:outline-none focus:ring-2 focus:ring-accent-indigo/50 transition-transform"
              aria-label="Quality"
            />
          </Slider.Root>
          
          <div className="flex justify-between text-[10px] text-gray-500 font-medium px-1">
            <span>Smaller File</span>
            <span>Better Quality</span>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-glass-white-sm border border-glass-border hover:bg-glass-white-md transition-colors cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                checked={lossless}
                onChange={(e) => onLosslessChange(e.target.checked)}
                disabled={disabled}
                className="peer h-4 w-4 rounded border-glass-border bg-glass-white-md text-accent-indigo focus:ring-accent-indigo/50 focus:ring-offset-0 transition-all cursor-pointer opacity-0 absolute z-10"
              />
              <div className="h-4 w-4 rounded border border-glass-border bg-glass-white-md peer-checked:bg-accent-indigo peer-checked:border-accent-indigo transition-all flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-200 block">Lossless Conversion</span>
              <span className="text-[10px] text-gray-400 leading-tight block group-hover:text-gray-300 transition-colors">
                Highest quality, larger file size. Perfect for icons and logos.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-glass-white-sm border border-glass-border hover:bg-glass-white-md transition-colors cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                checked={preserveMetadata}
                onChange={(e) => onPreserveMetadataChange(e.target.checked)}
                disabled={disabled}
                className="peer h-4 w-4 rounded border-glass-border bg-glass-white-md text-accent-indigo focus:ring-accent-indigo/50 focus:ring-offset-0 transition-all cursor-pointer opacity-0 absolute z-10"
              />
              <div className="h-4 w-4 rounded border border-glass-border bg-glass-white-md peer-checked:bg-accent-indigo peer-checked:border-accent-indigo transition-all flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-200 block">Preserve Metadata</span>
              <span className="text-[10px] text-gray-400 leading-tight block group-hover:text-gray-300 transition-colors">
                Keep EXIF, XMP, and ICC profiles in the output file.
              </span>
            </div>
          </label>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
}


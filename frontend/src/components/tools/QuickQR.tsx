import { useState } from 'react';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '../ui/glass-card';
import { GlassButton } from '../ui/glass-button';
import { ToolLayout } from '../layouts/ToolLayout';
import { PageTransition } from '../animations/PageTransition';
import { QrCode, Download, Palette, Link as LinkIcon, TextT, User, ShareNetwork, ArrowsClockwise } from '@phosphor-icons/react';
import { useApiToast } from '../../hooks/useApiToast';

export default function QuickQR() {
  const [content, setContent] = useState('https://toolhub.com');
  const [color, setColor] = useState('#60a5fa');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(256);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useApiToast();

  const handleDownload = () => {
    toast({
      title: 'Success',
      description: 'QR Code downloaded as SVG.',
      variant: 'success',
    });
  };

  return (
    <PageTransition>
      <ToolLayout
        title="QuickQR"
        subtitle="Generate beautiful, customizable QR codes in seconds"
        icon={QrCode}
        iconColor="teal"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <GlassCard hover={false} animated={false} className="border-accent-teal/30">
              <GlassCardHeader>
                <GlassCardTitle>QR Content</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="space-y-4">
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg bg-accent-teal/20 text-accent-teal border border-accent-teal/30 text-xs font-bold flex items-center justify-center gap-2">
                    <LinkIcon className="h-4 w-4" /> URL
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-glass-white-sm text-gray-400 border border-glass-border text-xs font-bold flex items-center justify-center gap-2 hover:bg-glass-white-md">
                    <TextT className="h-4 w-4" /> Text
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-glass-white-sm text-gray-400 border border-glass-border text-xs font-bold flex items-center justify-center gap-2 hover:bg-glass-white-md">
                    <User className="h-4 w-4" /> vCard
                  </button>
                </div>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter URL or text..."
                  className="w-full h-32 bg-glass-white-md backdrop-blur-md border border-glass-border rounded-xl p-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-teal/30 resize-none"
                />
              </GlassCardContent>
            </GlassCard>

            <GlassCard hover={false} animated={false} className="border-accent-teal/30">
              <GlassCardHeader>
                <GlassCardTitle>Styling</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">Foreground Color</label>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-glass-white-sm border border-glass-border">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="h-8 w-8 rounded cursor-pointer bg-transparent border-none"
                      />
                      <span className="text-xs font-mono text-gray-300 uppercase">{color}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">Background Color</label>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-glass-white-sm border border-glass-border">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-8 w-8 rounded cursor-pointer bg-transparent border-none"
                      />
                      <span className="text-xs font-mono text-gray-300 uppercase">{bgColor}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs text-gray-400">Size</label>
                    <span className="text-xs text-accent-teal font-bold">{size}px</span>
                  </div>
                  <input
                    type="range"
                    min="128"
                    max="1024"
                    step="128"
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-glass-white-lg rounded-lg appearance-none cursor-pointer accent-accent-teal"
                  />
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard hover={false} animated={false} className="border-accent-teal/30 h-full flex flex-col">
              <GlassCardHeader>
                <GlassCardTitle>Preview</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="flex-1 flex flex-col items-center justify-center space-y-8 pb-12">
                <div 
                  className="p-6 rounded-2xl bg-white shadow-xl relative group transition-transform duration-500 hover:scale-105"
                  style={{ backgroundColor: bgColor }}
                >
                  <QrCode className="h-48 w-48" style={{ color: color }} weight="fill" />
                  <div className="absolute inset-0 bg-accent-teal/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                    <ShareNetwork className="h-10 w-10 text-accent-teal" />
                  </div>
                </div>

                <div className="w-full max-w-xs space-y-3">
                  <GlassButton variant="teal" className="w-full py-6" onClick={handleDownload}>
                    <Download className="mr-2 h-5 w-5" /> Download SVG
                  </GlassButton>
                  <GlassButton variant="outline" className="w-full" onClick={() => setIsGenerating(true)}>
                    <ArrowsClockwise className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} /> 
                    {isGenerating ? 'Generating...' : 'Refresh Preview'}
                  </GlassButton>
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>
        </div>
      </ToolLayout>
    </PageTransition>
  );
}

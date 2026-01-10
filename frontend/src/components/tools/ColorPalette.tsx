import { useState } from 'react';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '../ui/glass-card';
import { useApiToast } from '../../hooks/useApiToast';
import {
  Image as ImageIcon,
  Sparkle,
  Plus,
  Eye,
  Stack,
  Palette,
} from '@phosphor-icons/react';
import { type Color } from '../../services/colorpalette';
import { type TabType, type ContrastResult } from './colorpalette/types';
import { ToolLayout } from '../layouts/ToolLayout';
import { PageTransition } from '../animations/PageTransition';
import { PaletteDisplay } from './colorpalette/PaletteDisplay';
import { ContrastResultDisplay } from './colorpalette/ContrastResult';
import { ExtractTab } from './colorpalette/ExtractTab';
import { RandomTab } from './colorpalette/RandomTab';
import { CustomTab } from './colorpalette/CustomTab';
import { ShadesTab } from './colorpalette/ShadesTab';
import { ContrastTab } from './colorpalette/ContrastTab';
import { useSavedPalettes } from '../../hooks/colorpalette/useSavedPalettes';
import { exportPalette, downloadPalette } from '../../utils/colorpalette/export';

function ColorPalette() {
  const [activeTab, setActiveTab] = useState<TabType>('extract');
  
  // Separate color states for each tab
  const [extractColors, setExtractColors] = useState<Color[]>([]);
  const [randomColors, setRandomColors] = useState<Color[]>([]);
  const [customColors, setCustomColors] = useState<Color[]>([]);
  const [shadesColors, setShadesColors] = useState<Color[]>([]);
  
  // Shared
  const [isProcessing, setIsProcessing] = useState(false);
  const [contrastResult, setContrastResult] = useState<ContrastResult | null>(null);
  const { toast } = useApiToast(); // UI-only actions (save/delete palette)
  const { savedPalettes, savePalette, deletePalette } = useSavedPalettes();
  
  // Get colors for current active tab
  const getCurrentColors = (): Color[] => {
    switch (activeTab) {
      case 'extract':
        return extractColors;
      case 'random':
        return randomColors;
      case 'custom':
        return customColors;
      case 'shades':
        return shadesColors;
      case 'contrast':
        return [];
      default:
        return [];
    }
  };
  
  const setCurrentColors = (newColors: Color[]) => {
    switch (activeTab) {
      case 'extract':
        setExtractColors(newColors);
        break;
      case 'random':
        setRandomColors(newColors);
        break;
      case 'custom':
        setCustomColors(newColors);
        break;
      case 'shades':
        setShadesColors(newColors);
        break;
    }
  };
  
  const colors = getCurrentColors();

  const handleSavePalette = () => {
    if (colors.length === 0) {
      toast({
        title: 'Error',
        description: 'No colors to save',
        variant: 'destructive',
      });
      return;
    }

    const name = prompt('Enter palette name:');
    if (!name) return;

    const newPalette = {
      id: Date.now().toString(),
      name,
      colors,
      createdAt: new Date().toISOString(),
    };

    savePalette(newPalette);
    toast({
      title: 'Saved',
      description: 'Palette saved successfully',
    });
  };

  const handleLoadPalette = (palette: typeof savedPalettes[0]) => {
    setCurrentColors(palette.colors);
    toast({
      title: 'Loaded',
      description: `Loaded palette: ${palette.name}`,
    });
  };

  const handleExport = (format: 'css' | 'json' | 'scss') => {
    if (colors.length === 0) {
      toast({
        title: 'Error',
        description: 'No colors to export',
        variant: 'destructive',
      });
      return;
    }

    const content = exportPalette(colors, format);
    downloadPalette(content, format);
    toast({
      title: 'Exported',
      description: `Palette exported as ${format.toUpperCase()}`,
    });
  };

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast({
      title: 'Copied',
      description: `${hex} copied to clipboard`,
    });
  };

  const tabs = [
    { id: 'extract' as TabType, label: 'Extract from Image', icon: ImageIcon },
    { id: 'random' as TabType, label: 'Random Generator', icon: Sparkle },
    { id: 'custom' as TabType, label: 'Custom Builder', icon: Plus },
    { id: 'shades' as TabType, label: 'Shades & Tints', icon: Stack },
    { id: 'contrast' as TabType, label: 'Contrast Checker', icon: Eye },
  ];

  const getTabTitle = () => {
    switch (activeTab) {
      case 'extract':
        return 'Extract from Image';
      case 'random':
        return 'Random Palette Generator';
      case 'custom':
        return 'Custom Palette Builder';
      case 'shades':
        return 'Generate Shades & Tints';
      case 'contrast':
        return 'Contrast Checker';
      default:
        return '';
    }
  };

  return (
    <PageTransition>
      <ToolLayout
        title="ColorPalette"
        subtitle="Professional color palette tools - Extract, Generate, Build & Analyze"
        icon={Palette}
        iconColor="pink"
      >
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-glass-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all duration-200 rounded-t-lg ${
                activeTab === tab.id
                  ? 'border-accent-pink text-accent-pink bg-glass-white-md backdrop-blur-sm'
                  : 'border-transparent text-gray-400 hover:text-accent-pink hover:bg-accent-pink/10 hover:border-accent-pink/30'
              }`}
            >
              <Icon className="h-4 w-4" weight="duotone" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Controls */}
        <GlassCard hover={false} animated={false} className="border-accent-pink/30 h-full">
          <GlassCardHeader>
            <GlassCardTitle>{getTabTitle()}</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent>
            {activeTab === 'extract' && (
              <ExtractTab
                onColorsGenerated={setExtractColors}
                isProcessing={isProcessing}
                onProcessingChange={setIsProcessing}
              />
            )}
            {activeTab === 'random' && (
              <RandomTab
                onColorsGenerated={setRandomColors}
                isProcessing={isProcessing}
                onProcessingChange={setIsProcessing}
              />
            )}
            {activeTab === 'custom' && (
              <CustomTab
                colors={customColors}
                onColorsChange={setCustomColors}
                savedPalettes={savedPalettes}
                onLoadPalette={handleLoadPalette}
                onDeletePalette={deletePalette}
              />
            )}
            {activeTab === 'shades' && (
              <ShadesTab
                onColorsGenerated={setShadesColors}
                isProcessing={isProcessing}
                onProcessingChange={setIsProcessing}
              />
            )}
            {activeTab === 'contrast' && (
              <>
                <ContrastTab
                  isProcessing={isProcessing}
                  onProcessingChange={setIsProcessing}
                  onResultChange={setContrastResult}
                />
                {contrastResult && <ContrastResultDisplay result={contrastResult} />}
              </>
            )}
          </GlassCardContent>
        </GlassCard>

        {/* Right Panel - Palette Display */}
        {activeTab !== 'contrast' && (
          <PaletteDisplay
            colors={colors}
            onSave={handleSavePalette}
            onExport={handleExport}
            onCopyColor={handleCopyColor}
          />
        )}
        </div>
      </ToolLayout>
    </PageTransition>
  );
}

export default ColorPalette;

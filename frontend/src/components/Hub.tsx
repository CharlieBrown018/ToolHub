import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardFooter, GlassCardHeader, GlassCardTitle } from './ui/glass-card';
import { GlassButton } from './ui/glass-button';
import { HubLayout } from './layouts/HubLayout';
import { PageTransition } from './animations/PageTransition';
import { CircleNotch, Image, FileText, CheckCircle, Palette, CaretRight, Lightning, ArrowsInSimple, Columns, ShieldCheck, ArrowsLeftRight, QrCode } from '@phosphor-icons/react';
import { useSearch } from '../context/SearchContext';

function Hub() {
  const { searchQuery, searchResults: tools } = useSearch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We already have tools from search results in context
    if (tools.length > 0 || !searchQuery) {
      setLoading(false);
    }
  }, [tools, searchQuery]);

  if (loading && tools.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="flex flex-col items-center gap-4">
          <CircleNotch className="h-8 w-8 animate-spin text-accent-blue" weight="duotone" />
          <p className="text-gray-400">Loading ToolHub...</p>
        </div>
      </div>
    );
  }

  // Glassmorphic theme with accent colors for tool cards
  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'border-accent-blue/40',
      green: 'border-accent-green/40',
      purple: 'border-accent-purple/40',
      orange: 'border-accent-orange/40',
      pink: 'border-accent-pink/40',
      indigo: 'border-accent-indigo/40',
      cyan: 'border-accent-cyan/40',
      amber: 'border-accent-amber/40',
      red: 'border-accent-red/40',
      teal: 'border-accent-teal/40',
    };
    return colors[color] || colors.blue;
  };

  const getGradientClasses = (color: string) => {
    const gradients: Record<string, string> = {
      blue: 'bg-gradient-to-br from-accent-blue/20 via-accent-blue/10 to-transparent',
      green: 'bg-gradient-to-br from-accent-green/20 via-accent-green/10 to-transparent',
      purple: 'bg-gradient-to-br from-accent-purple/20 via-accent-purple/10 to-transparent',
      orange: 'bg-gradient-to-br from-accent-orange/20 via-accent-orange/10 to-transparent',
      pink: 'bg-gradient-to-br from-accent-pink/20 via-accent-pink/10 to-transparent',
      indigo: 'bg-gradient-to-br from-accent-indigo/20 via-accent-indigo/10 to-transparent',
      cyan: 'bg-gradient-to-br from-accent-cyan/20 via-accent-cyan/10 to-transparent',
      amber: 'bg-gradient-to-br from-accent-amber/20 via-accent-amber/10 to-transparent',
      red: 'bg-gradient-to-br from-accent-red/20 via-accent-red/10 to-transparent',
      teal: 'bg-gradient-to-br from-accent-teal/20 via-accent-teal/10 to-transparent',
    };
    return gradients[color] || gradients.blue;
  };

  const getIconColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-accent-blue/20 text-accent-blue',
      green: 'bg-accent-green/20 text-accent-green',
      purple: 'bg-accent-purple/20 text-accent-purple',
      orange: 'bg-accent-orange/20 text-accent-orange',
      pink: 'bg-accent-pink/20 text-accent-pink',
      indigo: 'bg-accent-indigo/20 text-accent-indigo',
      cyan: 'bg-accent-cyan/20 text-accent-cyan',
      amber: 'bg-accent-amber/20 text-accent-amber',
      red: 'bg-accent-red/20 text-accent-red',
      teal: 'bg-accent-teal/20 text-accent-teal',
    };
    return colors[color] || colors.blue;
  };

  const getToolIcon = (toolId: string) => {
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
  };

  const getButtonVariant = (color: string) => {
    const variants: Record<string, any> = {
      blue: 'blue',
      green: 'green',
      purple: 'purple',
      orange: 'orange',
      pink: 'pink',
      indigo: 'indigo',
      cyan: 'cyan',
      amber: 'amber',
      red: 'red',
      teal: 'teal',
    };
    return variants[color] || 'blue';
  };

  return (
    <PageTransition>
      <HubLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {tools.map((tool) => (
          <GlassCard
            key={tool.id}
            className={`relative overflow-hidden ${getColorClasses(tool.color)}`}
            hover={true}
            animated={true}
          >
            {/* Gradient Background Layer */}
            <div className={`absolute inset-0 ${getGradientClasses(tool.color)} pointer-events-none`} />
            
            {/* Content Layer */}
            <div className="relative z-10">
              <GlassCardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-12 w-12 rounded-xl ${getIconColorClasses(tool.color)} backdrop-blur-sm border border-glass-border flex items-center justify-center shadow-depth-1`}>
                    {(() => {
                      const IconComponent = getToolIcon(tool.id);
                      return <IconComponent className="h-6 w-6" weight="duotone" />;
                    })()}
                  </div>
                  <GlassCardTitle className="text-xl text-gray-100">{tool.display_name || tool.title}</GlassCardTitle>
                </div>
              <GlassCardDescription className="text-base text-gray-300">
                {tool.description}
              </GlassCardDescription>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="flex flex-wrap gap-2">
                {tool.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-md bg-glass-white-md backdrop-blur-sm border border-glass-border text-gray-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </GlassCardContent>
            <GlassCardFooter>
              <GlassButton
                asChild
                variant={getButtonVariant(tool.color)}
                className="w-full"
              >
                <Link to={tool.route}>
                  Open Tool
                  <CaretRight className="ml-2 h-4 w-4" weight="duotone" />
                </Link>
              </GlassButton>
            </GlassCardFooter>
            </div>
          </GlassCard>
        ))}
        </div>
      </HubLayout>
    </PageTransition>
  );
}

export default Hub;

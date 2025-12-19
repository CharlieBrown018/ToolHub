import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardFooter, GlassCardHeader, GlassCardTitle } from './ui/glass-card';
import { GlassButton } from './ui/glass-button';
import { HubLayout } from './layouts/HubLayout';
import { PageTransition } from './animations/PageTransition';
import { Tool } from '../types/tool';
import { CircleNotch, Image, FileText, CheckCircle, Palette, CaretRight } from '@phosphor-icons/react';
import { getTools } from '../services/tools';

function Hub() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTools()
      .then((data) => {
        setTools(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tools:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
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
      blue: 'border-accent-blue/30 hover:border-accent-blue/50',
      green: 'border-accent-green/30 hover:border-accent-green/50',
      purple: 'border-accent-purple/30 hover:border-accent-purple/50',
      orange: 'border-accent-orange/30 hover:border-accent-orange/50',
    };
    return colors[color] || colors.blue;
  };

  const getIconColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-accent-blue/15 text-accent-blue',
      green: 'bg-accent-green/15 text-accent-green',
      purple: 'bg-accent-purple/15 text-accent-purple',
      orange: 'bg-accent-orange/15 text-accent-orange',
    };
    return colors[color] || colors.blue;
  };

  const getToolIcon = (toolId: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'image-to-pdf': Image,
      'md-to-pdf': FileText,
      'data-validator': CheckCircle,
      'color-palette': Palette,
    };
    return iconMap[toolId] || Image;
  };

  const getButtonVariant = (color: string) => {
    const variants: Record<string, 'blue' | 'green' | 'purple' | 'orange'> = {
      blue: 'blue',
      green: 'green',
      purple: 'purple',
      orange: 'orange',
    };
    return variants[color] || 'blue';
  };

  return (
    <PageTransition>
      <HubLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <GlassCard
            key={tool.id}
            className={`${getColorClasses(tool.color)}`}
            hover={true}
            animated={true}
          >
            <GlassCardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={`h-12 w-12 rounded-lg ${getIconColorClasses(tool.color)} backdrop-blur-sm border border-glass-border flex items-center justify-center`}>
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
          </GlassCard>
        ))}
        </div>
      </HubLayout>
    </PageTransition>
  );
}

export default Hub;


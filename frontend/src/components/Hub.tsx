import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tool } from '../types/tool';
import { CircleNotch, Image, FileText, CheckCircle, Palette, CaretRight, Toolbox } from '@phosphor-icons/react';
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <CircleNotch className="h-8 w-8 animate-spin text-primary" weight="duotone" />
          <p className="text-muted-foreground">Loading ToolHub...</p>
        </div>
      </div>
    );
  }

  // Dark greyscale theme with subtle accent colors for tool cards
  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-primary/10 text-primary border-primary/30 hover:border-primary/50 hover:bg-primary/15',
      green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/15',
      purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/15',
      orange: 'bg-orange-500/10 text-orange-400 border-orange-500/30 hover:border-orange-500/50 hover:bg-orange-500/15',
    };
    return colors[color] || colors.blue;
  };

  const getIconColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-primary/15 text-primary',
      green: 'bg-emerald-500/15 text-emerald-400',
      purple: 'bg-purple-500/15 text-purple-400',
      orange: 'bg-orange-500/15 text-orange-400',
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Toolbox className="h-4 w-4 text-primary" weight="duotone" />
              </div>
              <h1 className="text-xl font-bold text-foreground">ToolHub</h1>
            </div>
            <p className="text-sm text-muted-foreground hidden sm:block">
              A collection of powerful utility tools for file conversion and processing
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <Card
              key={tool.id}
              className={`${getColorClasses(tool.color)} transition-all hover:scale-105`}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-12 w-12 rounded-lg ${getIconColorClasses(tool.color)} flex items-center justify-center`}>
                    {(() => {
                      const IconComponent = getToolIcon(tool.id);
                      return <IconComponent className="h-6 w-6" weight="duotone" />;
                    })()}
                  </div>
                  <CardTitle className="text-xl">{tool.display_name || tool.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-md bg-muted border border-border text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full"
                >
                  <Link to={tool.route}>
                    Open Tool
                    <CaretRight className="ml-2 h-4 w-4" weight="duotone" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="mt-auto border-t border-border bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-2">About ToolHub</h3>
              <p className="text-sm text-muted-foreground">
                A unified platform for various file conversion and utility tools.
                Built with React, FastAPI, and modern web technologies.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'FastAPI', 'Python', 'Tesseract OCR'].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-md bg-background/50 border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Tools</h3>
              <ul className="space-y-1">
                {tools.map(tool => (
                  <li key={tool.id}>
                    <Link
                      to={tool.route}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {tool.display_name || tool.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 ToolHub. Free and open-source utilities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Hub;


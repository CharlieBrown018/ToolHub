import { ReactNode } from 'react';
import { GlassToolHeader } from '../ui/glass-tool-header';

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  statusBadge?: ReactNode;
  icon?: React.ComponentType<any>;
  iconColor?: string;
}

export function ToolLayout({ 
  children, 
  title, 
  subtitle, 
  statusBadge, 
  icon, 
  iconColor 
}: ToolLayoutProps) {
  return (
    <>
      <GlassToolHeader
        title={title}
        subtitle={subtitle}
        statusBadge={statusBadge}
        icon={icon}
        iconColor={iconColor}
      />
      <main className="container mx-auto px-4 flex-1">
        {children}
      </main>
    </>
  );
}


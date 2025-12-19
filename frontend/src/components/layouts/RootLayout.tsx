import { ReactNode } from 'react';
import { GlassHeader } from '../ui/glass-header';
import { GlassFooter } from '../ui/glass-footer';

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <GlassHeader />
      {children}
      <GlassFooter />
    </div>
  );
}


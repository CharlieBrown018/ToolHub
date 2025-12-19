import { ReactNode } from 'react';

interface HubLayoutProps {
  children: ReactNode;
}

export function HubLayout({ children }: HubLayoutProps) {
  return (
    <main className="container mx-auto px-4 py-12 flex-1">
      {children}
    </main>
  );
}


import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './button';
import { ArrowLeft } from '@phosphor-icons/react';

interface HeaderProps {
  title: string;
  subtitle: string;
  statusBadge?: ReactNode;
}

export function Header({ title, subtitle, statusBadge }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" weight="duotone" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          {statusBadge && <div>{statusBadge}</div>}
        </div>
      </div>
    </header>
  );
}

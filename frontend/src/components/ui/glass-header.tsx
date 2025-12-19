import { Link } from 'react-router-dom';
import { Toolbox } from '@phosphor-icons/react';

export function GlassHeader() {
  return (
    <header className="sticky top-0 z-[100] border-b border-glass-border shadow-glass-sm isolate" style={{ background: 'rgba(17, 24, 39, 0.95)', backdropFilter: 'blur(12px)' }}>
      <div className="container mx-auto px-4 h-16 relative z-10">
        <div className="flex items-center justify-between h-full relative z-10">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 rounded-lg bg-glass-white-lg backdrop-blur-sm border border-glass-border flex items-center justify-center">
              <Toolbox className="h-4 w-4 text-accent-blue" weight="duotone" />
            </div>
            <h1 className="text-xl font-bold text-gray-100">ToolHub</h1>
          </Link>
          <p className="text-sm text-gray-400 hidden sm:block">
            Powerful utility tools for file conversion and processing
          </p>
        </div>
      </div>
    </header>
  );
}


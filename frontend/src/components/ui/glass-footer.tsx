import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react';
import { RotatingTech } from '../animations/RotatingTech';

export function GlassFooter() {
  return (
    <footer className="mt-auto sticky bottom-0 z-40 bg-glass-white-md backdrop-blur-md border-t border-glass-border shadow-glass-sm">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 lg:gap-6">
          {/* Left: Copyright */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400 font-medium">
              © {new Date().getFullYear()} | ToolHub
            </span>
          </div>

          {/* Middle: Built with Technologies - Rotating Animation */}
          <RotatingTech interval={3000} />

          {/* Right: Social Links */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-all duration-300 hover:scale-110 block"
                aria-label="GitHub"
              >
                <GithubLogo className="w-5 h-5" weight="duotone" />
              </a>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 px-3 py-1.5 bg-glass-white-lg backdrop-blur-md border border-glass-border text-gray-400 text-xs rounded-lg whitespace-nowrap shadow-glass-sm">
                Visit GitHub
              </div>
            </div>
            <div className="relative group">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-all duration-300 hover:scale-110 block"
                aria-label="LinkedIn"
              >
                <LinkedinLogo className="w-5 h-5" weight="duotone" />
              </a>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 px-3 py-1.5 bg-glass-white-lg backdrop-blur-md border border-glass-border text-gray-400 text-xs rounded-lg whitespace-nowrap shadow-glass-sm">
                Visit LinkedIn
              </div>
            </div>
            <div className="relative group">
              <a
                href="mailto:contact@toolhub.com"
                className="text-gray-400 hover:text-gray-300 transition-all duration-300 hover:scale-110 block"
                aria-label="Email"
              >
                <EnvelopeSimple className="w-5 h-5" weight="duotone" />
              </a>
              <div className="absolute bottom-full mb-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 px-3 py-1.5 bg-glass-white-lg backdrop-blur-md border border-glass-border text-gray-400 text-xs rounded-lg whitespace-nowrap shadow-glass-sm">
                Send Email
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


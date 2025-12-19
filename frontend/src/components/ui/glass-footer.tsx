import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react';
import { RotatingTech } from '../animations/RotatingTech';
import { GlassTooltip } from './glass-tooltip';

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
            <GlassTooltip content="Visit GitHub" side="top">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-all duration-300 hover:scale-110 block"
                aria-label="GitHub"
              >
                <GithubLogo className="w-5 h-5" weight="duotone" />
              </a>
            </GlassTooltip>
            <GlassTooltip content="Visit LinkedIn" side="top">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-all duration-300 hover:scale-110 block"
                aria-label="LinkedIn"
              >
                <LinkedinLogo className="w-5 h-5" weight="duotone" />
              </a>
            </GlassTooltip>
            <GlassTooltip content="Send Email" side="top" align="end">
              <a
                href="mailto:contact@toolhub.com"
                className="text-gray-400 hover:text-gray-300 transition-all duration-300 hover:scale-110 block"
                aria-label="Email"
              >
                <EnvelopeSimple className="w-5 h-5" weight="duotone" />
              </a>
            </GlassTooltip>
          </div>
        </div>
      </div>
    </footer>
  );
}


import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react';
import { RotatingTech } from '../animations/RotatingTech';
import { GlassTooltip } from './glass-tooltip';
import { motion } from 'framer-motion';

export function GlassFooter() {
  return (
    <footer 
      className="mt-auto sticky bottom-0 z-40 border-t border-glass-border shadow-glass-depth isolate"
      style={{ 
        background: 'linear-gradient(to right, rgba(17, 24, 39, 0.98), rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.98))', 
        backdropFilter: 'blur(16px)' 
      }}
    >
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 via-transparent to-accent-blue/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-4 sm:py-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 lg:gap-6 relative z-10">
          {/* Left: Copyright */}
          <div className="flex items-center gap-2 text-sm">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex items-center gap-1.5"
            >
              <span className="text-gray-400 font-medium">
                © {new Date().getFullYear()}
              </span>
              <span className="text-gray-500">|</span>
              <span className="text-white font-bold tracking-tight">
                Tool<span className="text-accent-blue">Hub</span>
              </span>
            </motion.div>
          </div>

          {/* Middle: Built with Technologies - Rotating Animation */}
          <RotatingTech interval={3000} />

          {/* Right: Social Links */}
          <div className="flex items-center gap-4">
            <GlassTooltip content="Visit GitHub" side="top">
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 block"
                aria-label="GitHub"
              >
                <GithubLogo className="w-5 h-5 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" weight="duotone" />
              </motion.a>
            </GlassTooltip>
            <GlassTooltip content="Visit LinkedIn" side="top">
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-blue transition-colors duration-300 block"
                aria-label="LinkedIn"
              >
                <LinkedinLogo className="w-5 h-5 drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]" weight="duotone" />
              </motion.a>
            </GlassTooltip>
            <GlassTooltip content="Send Email" side="top" align="end">
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:contact@toolhub.com"
                className="text-gray-400 hover:text-accent-purple transition-colors duration-300 block"
                aria-label="Email"
              >
                <EnvelopeSimple className="w-5 h-5 drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]" weight="duotone" />
              </motion.a>
            </GlassTooltip>
          </div>
        </div>
      </div>
    </footer>
  );
}



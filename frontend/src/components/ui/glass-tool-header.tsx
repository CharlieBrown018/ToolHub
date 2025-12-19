import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GlassButton } from './glass-button';
import { ArrowLeft } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface GlassToolHeaderProps {
  title: string;
  subtitle?: string;
  statusBadge?: ReactNode;
  icon?: React.ComponentType<any>;
  iconColor?: string;
}

export function GlassToolHeader({ title, subtitle, statusBadge, icon: Icon, iconColor = 'blue' }: GlassToolHeaderProps) {
  const getGradientClasses = (color: string) => {
    const gradients: Record<string, string> = {
      blue: 'bg-gradient-to-br from-accent-blue/20 via-accent-blue/10 to-transparent',
      green: 'bg-gradient-to-br from-accent-green/20 via-accent-green/10 to-transparent',
      purple: 'bg-gradient-to-br from-accent-purple/20 via-accent-purple/10 to-transparent',
      orange: 'bg-gradient-to-br from-accent-orange/20 via-accent-orange/10 to-transparent',
      pink: 'bg-gradient-to-br from-accent-pink/20 via-accent-pink/10 to-transparent',
      indigo: 'bg-gradient-to-br from-accent-indigo/20 via-accent-indigo/10 to-transparent',
      cyan: 'bg-gradient-to-br from-accent-cyan/20 via-accent-cyan/10 to-transparent',
      amber: 'bg-gradient-to-br from-accent-amber/20 via-accent-amber/10 to-transparent',
      red: 'bg-gradient-to-br from-accent-red/20 via-accent-red/10 to-transparent',
      teal: 'bg-gradient-to-br from-accent-teal/20 via-accent-teal/10 to-transparent',
    };
    return gradients[color] || gradients.blue;
  };

  const getIconColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-accent-blue/20 text-accent-blue',
      green: 'bg-accent-green/20 text-accent-green',
      purple: 'bg-accent-purple/20 text-accent-purple',
      orange: 'bg-accent-orange/20 text-accent-orange',
      pink: 'bg-accent-pink/20 text-accent-pink',
      indigo: 'bg-accent-indigo/20 text-accent-indigo',
      cyan: 'bg-accent-cyan/20 text-accent-cyan',
      amber: 'bg-accent-amber/20 text-accent-amber',
      red: 'bg-accent-red/20 text-accent-red',
      teal: 'bg-accent-teal/20 text-accent-teal',
    };
    return colors[color] || colors.blue;
  };

  const getBorderColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'border-accent-blue/40',
      green: 'border-accent-green/40',
      purple: 'border-accent-purple/40',
      orange: 'border-accent-orange/40',
      pink: 'border-accent-pink/40',
      indigo: 'border-accent-indigo/40',
      cyan: 'border-accent-cyan/40',
      amber: 'border-accent-amber/40',
      red: 'border-accent-red/40',
      teal: 'border-accent-teal/40',
    };
    return colors[color] || colors.blue;
  };

  const getBackButtonColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 border-accent-blue/40',
      green: 'bg-accent-green/20 text-accent-green hover:bg-accent-green/30 border-accent-green/40',
      purple: 'bg-accent-purple/20 text-accent-purple hover:bg-accent-purple/30 border-accent-purple/40',
      orange: 'bg-accent-orange/20 text-accent-orange hover:bg-accent-orange/30 border-accent-orange/40',
      pink: 'bg-accent-pink/20 text-accent-pink hover:bg-accent-pink/30 border-accent-pink/40',
      indigo: 'bg-accent-indigo/20 text-accent-indigo hover:bg-accent-indigo/30 border-accent-indigo/40',
      cyan: 'bg-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan/30 border-accent-cyan/40',
      amber: 'bg-accent-amber/20 text-accent-amber hover:bg-accent-amber/30 border-accent-amber/40',
      red: 'bg-accent-red/20 text-accent-red hover:bg-accent-red/30 border-accent-red/40',
      teal: 'bg-accent-teal/20 text-accent-teal hover:bg-accent-teal/30 border-accent-teal/40',
    };
    return colors[color] || colors.blue;
  };

  const getTextGlowClasses = (color: string) => {
    const glows: Record<string, string> = {
      blue: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]',
      green: 'drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]',
      purple: 'drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]',
      orange: 'drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]',
      pink: 'drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]',
      indigo: 'drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]',
      cyan: 'drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]',
      amber: 'drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]',
      red: 'drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]',
      teal: 'drop-shadow-[0_0_8px_rgba(20,184,166,0.3)]',
    };
    return glows[color] || glows.blue;
  };

  return (
    <div className="container mx-auto px-4 pt-6 pb-4">
      <div className={`relative overflow-hidden bg-glass-white-md backdrop-blur-md border ${getBorderColorClasses(iconColor)} rounded-xl p-4 sm:p-6 shadow-glass-depth transition-all duration-300`}>
        {/* Gradient Background Layer */}
        <div className={`absolute inset-0 ${getGradientClasses(iconColor)} pointer-events-none`} />
        
        {/* Content Layer */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {Icon && (
              <div className={`h-14 w-14 rounded-xl ${getIconColorClasses(iconColor)} backdrop-blur-sm border border-glass-border flex items-center justify-center shadow-depth-2`}>
                <Icon className="h-7 w-7" weight="duotone" />
              </div>
            )}
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold text-white ${getTextGlowClasses(iconColor)}`}>
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm sm:text-base text-gray-300 mt-1 font-medium">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {statusBadge && <div>{statusBadge}</div>}
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`h-12 w-12 rounded-xl ${getBackButtonColorClasses(iconColor)} backdrop-blur-sm border flex items-center justify-center transition-all duration-200 shadow-depth-1`}
              >
                <ArrowLeft className="h-6 w-6" weight="duotone" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


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
  const getIconColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-accent-blue/15 text-accent-blue',
      green: 'bg-accent-green/15 text-accent-green',
      purple: 'bg-accent-purple/15 text-accent-purple',
      orange: 'bg-accent-orange/15 text-accent-orange',
    };
    return colors[color] || colors.blue;
  };

  const getBorderColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'border-accent-blue/30 hover:border-accent-blue/50',
      green: 'border-accent-green/30 hover:border-accent-green/50',
      purple: 'border-accent-purple/30 hover:border-accent-purple/50',
      orange: 'border-accent-orange/30 hover:border-accent-orange/50',
    };
    return colors[color] || colors.blue;
  };

  const getBackButtonColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-accent-blue/15 text-accent-blue hover:bg-accent-blue/25 border-accent-blue/30',
      green: 'bg-accent-green/15 text-accent-green hover:bg-accent-green/25 border-accent-green/30',
      purple: 'bg-accent-purple/15 text-accent-purple hover:bg-accent-purple/25 border-accent-purple/30',
      orange: 'bg-accent-orange/15 text-accent-orange hover:bg-accent-orange/25 border-accent-orange/30',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="container mx-auto px-4 pt-6 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`bg-glass-white-md backdrop-blur-md border ${getBorderColorClasses(iconColor)} rounded-xl p-4 sm:p-6 shadow-glass-depth transition-colors duration-300`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {Icon && (
              <div className={`h-12 w-12 rounded-lg ${getIconColorClasses(iconColor)} backdrop-blur-sm border border-glass-border flex items-center justify-center shadow-depth-1`}>
                <Icon className="h-6 w-6" weight="duotone" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-100">{title}</h1>
              {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {statusBadge && <div>{statusBadge}</div>}
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`h-12 w-12 rounded-lg ${getBackButtonColorClasses(iconColor)} backdrop-blur-sm border flex items-center justify-center transition-all duration-200 shadow-depth-1`}
              >
                <ArrowLeft className="h-6 w-6" weight="duotone" />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


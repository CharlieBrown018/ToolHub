import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel, GlassPanelVariant } from './glass-panel';

export interface GlassCardBaseProps {
  children: React.ReactNode;
  className?: string;
  variant?: GlassPanelVariant;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  animated?: boolean;
  delay?: number;
  perspective?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * GlassCard - 3D glassmorphic card with depth and interactive hover effects
 *
 * Extends GlassPanel with 3D transforms, perspective effects, and smooth
 * hover animations. Ideal for project cards, experience cards, and interactive elements.
 */
export const GlassCard: React.FC<GlassCardBaseProps> = ({
  children,
  className = '',
  variant = 'elevated',
  hoverable = true,
  clickable = false,
  onClick,
  animated = true,
  delay = 0,
  perspective = true,
  rounded = 'xl',
  style,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardAnimation = animated
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.2,
          delay: delay * 0.3,
          ease: 'easeOut',
        },
      }
    : {};

  const perspectiveClass = perspective
    ? 'transform-gpu will-change-transform'
    : '';
  const cursorClass = clickable || onClick ? 'cursor-pointer' : '';

  const handleMouseEnter = () => {
    if (hoverable) {
      setIsHovered(true);
    }
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    if (hoverable) {
      setIsHovered(false);
    }
    onMouseLeave?.();
  };

  return (
    <motion.div
      className={`${perspectiveClass} ${cursorClass} ${hoverable ? 'transition-transform duration-200 ease-out' : ''}`}
      onMouseEnter={hoverable ? handleMouseEnter : undefined}
      onMouseLeave={hoverable ? handleMouseLeave : undefined}
      {...cardAnimation}
      whileHover={
        hoverable && perspective
          ? { scale: 1.01, y: -2, transition: { duration: 0.2 } }
          : hoverable
          ? { scale: 1.005, y: -1, transition: { duration: 0.2 } }
          : {}
      }
    >
      <GlassPanel
        variant={variant}
        hover={false}
        onClick={onClick}
        isHovered={false}
        rounded={rounded}
        style={style}
        className={`
          relative overflow-hidden
          ${hoverable && isHovered && perspective ? 'shadow-depth-4' : 'shadow-depth-2'}
          ${className}
        `}
      >
        {/* Top lighting - only on hover for glassmorphic effect */}
        {hoverable && isHovered && (
          <div className='absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/3 via-white/2 to-transparent pointer-events-none transition-opacity duration-200' />
        )}

        {/* Content */}
        <div className='relative z-10'>{children}</div>

        {/* Bottom depth shadow - only on hover */}
        {hoverable && perspective && isHovered && (
          <div className='absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/15 via-black/5 to-transparent pointer-events-none transition-opacity duration-200' />
        )}
      </GlassPanel>
    </motion.div>
  );
};

export default GlassCard;

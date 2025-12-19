import React, { useState } from 'react';
import { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

/**
 * GlassPanel Variants
 * - subtle: Minimal glass effect for background elements
 * - elevated: Prominent glass effect for interactive cards
 * - highlighted: Enhanced glass effect with border glow
 */
export type GlassPanelVariant = 'subtle' | 'elevated' | 'highlighted';

export interface GlassPanelProps {
  children: React.ReactNode;
  variant?: GlassPanelVariant;
  className?: string;
  hover?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  border?: boolean;
  shadow?: boolean;
  animated?: boolean;
  onClick?: () => void;
  isHovered?: boolean; // External hover state (for parent-controlled hover)
  style?: React.CSSProperties;
}

const variantStyles: Record<GlassPanelVariant, string> = {
  subtle: 'bg-glass-white backdrop-blur-sm border-glass-border shadow-depth-1',
  elevated:
    'bg-glass-white-md backdrop-blur-md border-glass-border shadow-depth-2',
  highlighted:
    'bg-glass-white-lg backdrop-blur-lg border-glass-border-hover shadow-depth-3',
};

const hoverStyles: Record<GlassPanelVariant, string> = {
  subtle:
    'hover:bg-glass-white-md hover:border-glass-border-hover hover:shadow-depth-2',
  elevated:
    'hover:bg-glass-white-md hover:border-glass-border-hover hover:shadow-depth-3',
  highlighted:
    'hover:bg-glass-white-lg hover:shadow-depth-4 hover:border-accent-blue/40 hover:-translate-y-0.5',
};

/**
 * GlassPanel - Base glassmorphism container component
 *
 * Provides consistent glass-effect styling with backdrop blur, translucent backgrounds,
 * and subtle borders. Supports multiple variants, hover states, and animations.
 *
 * @example
 * ```tsx
 * <GlassPanel variant="elevated" hover animated>
 *   <h2>Content</h2>
 * </GlassPanel>
 * ```
 */
export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  variant = 'elevated',
  className = '',
  hover = false,
  rounded = 'xl',
  border = true,
  shadow = true,
  animated = false,
  onClick,
  isHovered: externalHovered,
  style,
}) => {
  // Track hover internally if hover prop is true and no external hover state provided
  const [internalHovered, setInternalHovered] = useState(false);
  const isHovered = externalHovered !== undefined ? externalHovered : internalHovered;
  const shouldTrackHover = hover && externalHovered === undefined;

  const baseStyles = variantStyles[variant];
  const hoverStyle = hover ? hoverStyles[variant] : '';
  const borderStyle = border ? 'border' : '';
  const shadowStyle = shadow ? 'shadow-glass-depth' : '';
  const roundedStyle = `rounded-${rounded}`;
  const interactiveStyle = onClick ? 'cursor-pointer' : '';

  const combinedClassName = `
    relative overflow-hidden
    ${baseStyles}
    ${hoverStyle}
    ${borderStyle}
    ${shadowStyle}
    ${roundedStyle}
    ${interactiveStyle}
    transition-all duration-200 ease-out
    will-change-transform
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  const animationProps: MotionProps = animated
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2, ease: 'easeOut' },
      }
    : {};

  const hoverHandlers = shouldTrackHover
    ? {
        onMouseEnter: () => setInternalHovered(true),
        onMouseLeave: () => setInternalHovered(false),
      }
    : {};

  const renderContent = () => (
    <>
      {/* Top lighting effect - only on hover */}
      {isHovered && (
        <div className='absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/3 to-transparent pointer-events-none rounded-t-inherit transition-opacity duration-200' />
      )}

      {/* Bottom depth shadow - only on hover */}
      {isHovered && (
        <div className='absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/15 to-transparent pointer-events-none rounded-b-inherit transition-opacity duration-200' />
      )}

      {/* Inner highlight - only on hover */}
      {isHovered && (
        <div className='absolute inset-0 rounded-inherit bg-gradient-to-br from-white/2 to-transparent pointer-events-none transition-opacity duration-200' />
      )}

      <div className='relative z-10'>{children}</div>
    </>
  );

  if (animated) {
    return (
      <motion.div
        className={combinedClassName}
        style={style}
        onClick={onClick}
        {...animationProps}
        {...hoverHandlers}
      >
        {renderContent()}
      </motion.div>
    );
  }

  return (
    <div className={combinedClassName} style={style} onClick={onClick} {...hoverHandlers}>
      {renderContent()}
    </div>
  );
};

export default GlassPanel;


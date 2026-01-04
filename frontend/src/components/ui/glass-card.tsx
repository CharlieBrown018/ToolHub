import * as React from "react"
import { motion } from "framer-motion"
import { GlassPanel, GlassPanelVariant } from "./glass-panel"
import { cn } from "../../lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassPanelVariant
  hover?: boolean
  hoverable?: boolean
  perspective?: boolean
  animated?: boolean
  delay?: number
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
}

/**
 * GlassCard - 3D glassmorphic card with depth and interactive hover effects
 */
const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, variant = 'elevated', hover, hoverable, perspective = true, animated = true, delay = 0, rounded = 'xl', ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const shouldHover = hover !== undefined ? hover : (hoverable !== undefined ? hoverable : false);

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

    const perspectiveClass = perspective ? 'transform-gpu will-change-transform' : '';

    return (
      <motion.div
        className={cn(
          'relative overflow-hidden isolate z-0',
          perspectiveClass,
          shouldHover && 'transition-transform duration-200 ease-out'
        )}
        onMouseEnter={() => shouldHover && setIsHovered(true)}
        onMouseLeave={() => shouldHover && setIsHovered(false)}
        {...cardAnimation}
        whileHover={
          shouldHover && perspective
            ? { scale: 1.01, y: -2, transition: { duration: 0.2 } }
            : shouldHover
            ? { scale: 1.005, y: -1, transition: { duration: 0.2 } }
            : {}
        }
      >
        <GlassPanel
          variant={variant}
          hover={false}
          isHovered={false}
          rounded={rounded}
          className={cn(
            'relative overflow-hidden',
            shouldHover && isHovered && perspective ? 'shadow-depth-4' : 'shadow-depth-2',
            className
          )}
        >
          {/* Top lighting - only on hover for glassmorphic effect */}
          {shouldHover && isHovered && (
            <div className='absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/3 via-white/2 to-transparent pointer-events-none transition-opacity duration-200 z-0 rounded-t-xl' />
          )}

          {/* Content area with ref for forwardRef compatibility */}
          <div ref={ref} className="relative z-10 h-full w-full" {...props}>
            {children}
          </div>
        </GlassPanel>
      </motion.div>
    );
  }
)
GlassCard.displayName = "GlassCard"

const GlassCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 border-b border-glass-border/50", className)}
    {...props}
  />
))
GlassCardHeader.displayName = "GlassCardHeader"

const GlassCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-gray-100",
      className
    )}
    {...props}
  />
))
GlassCardTitle.displayName = "GlassCardTitle"

const GlassCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-300", className)}
    {...props}
  />
))
GlassCardDescription.displayName = "GlassCardDescription"

const GlassCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
GlassCardContent.displayName = "GlassCardContent"

const GlassCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
GlassCardFooter.displayName = "GlassCardFooter"

export { GlassCard, GlassCardHeader, GlassCardFooter, GlassCardTitle, GlassCardDescription, GlassCardContent }

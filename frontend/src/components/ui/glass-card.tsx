import * as React from "react"
import { GlassCard as BaseGlassCard } from "./glass-card-base"
import { cn } from "../../lib/utils"

const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'subtle' | 'elevated' | 'highlighted'
    hover?: boolean
    hoverable?: boolean
    perspective?: boolean
    animated?: boolean
  }
>(({ className, children, variant = 'elevated', hover, hoverable, perspective = true, animated = true, ...props }, ref) => {
  // Use 'hover' if provided, otherwise fall back to 'hoverable', default to false
  const shouldHover = hover !== undefined ? hover : (hoverable !== undefined ? hoverable : false);
  
  return (
    <BaseGlassCard
      variant={variant}
      hoverable={shouldHover}
      perspective={perspective}
      animated={animated}
      className={cn("text-gray-100", className)}
    >
      <div ref={ref} {...props}>
        {children}
      </div>
    </BaseGlassCard>
  );
})
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

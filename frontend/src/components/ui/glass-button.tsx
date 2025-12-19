import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "../../lib/utils"

const glassButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium backdrop-blur-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-glass-white-md border border-glass-border text-gray-100 hover:bg-glass-white-lg hover:border-glass-border-hover shadow-glass-sm",
        destructive:
          "bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 hover:border-red-500/50 shadow-glass-sm",
        outline:
          "border border-glass-border bg-glass-white/5 text-gray-100 hover:bg-glass-white-md hover:border-glass-border-hover",
        secondary:
          "bg-glass-white-md border border-glass-border text-gray-200 hover:bg-glass-white-lg hover:border-glass-border-hover shadow-glass-sm",
        ghost: "border-transparent bg-transparent text-gray-300 hover:bg-glass-white/5 hover:text-gray-100",
        link: "text-accent-blue underline-offset-4 hover:underline border-transparent bg-transparent",
        blue: "bg-accent-blue/10 border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/20 hover:border-accent-blue/50 shadow-glass-sm",
        green: "bg-accent-green/10 border border-accent-green/30 text-accent-green hover:bg-accent-green/20 hover:border-accent-green/50 shadow-glass-sm",
        purple: "bg-accent-purple/10 border border-accent-purple/30 text-accent-purple hover:bg-accent-purple/20 hover:border-accent-purple/50 shadow-glass-sm",
        orange: "bg-accent-orange/10 border border-accent-orange/30 text-accent-orange hover:bg-accent-orange/20 hover:border-accent-orange/50 shadow-glass-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  asChild?: boolean
  animated?: boolean
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, asChild = false, animated = true, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const buttonContent = (
      <Comp
        className={cn(glassButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )

    if (animated && !asChild) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          {buttonContent}
        </motion.div>
      )
    }

    return buttonContent
  }
)
GlassButton.displayName = "GlassButton"

export { GlassButton, glassButtonVariants }

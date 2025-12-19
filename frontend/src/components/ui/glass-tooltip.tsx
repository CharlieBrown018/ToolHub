import * as React from "react"
import { cn } from "../../lib/utils"

export interface GlassTooltipProps {
  children: React.ReactNode
  content: string
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  className?: string
}

export function GlassTooltip({ 
  children, 
  content, 
  side = "top",
  align = "center",
  className 
}: GlassTooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  const getPositionClasses = () => {
    const sideClasses = {
      top: "bottom-full mb-2",
      bottom: "top-full mt-2",
      left: "right-full mr-2",
      right: "left-full ml-2",
    }

    const alignClasses = {
      start: side === "top" || side === "bottom" ? "left-0" : "top-0",
      center: side === "top" || side === "bottom" ? "left-1/2 -translate-x-1/2" : "top-1/2 -translate-y-1/2",
      end: side === "top" || side === "bottom" ? "right-0" : "bottom-0",
    }

    return `${sideClasses[side]} ${alignClasses[align]}`
  }

  return (
    <div 
      className="relative group inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-3 py-1.5 bg-glass-white-lg backdrop-blur-md border border-glass-border text-gray-300 text-xs rounded-lg whitespace-nowrap shadow-glass-sm pointer-events-none transition-opacity duration-200",
            getPositionClasses(),
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}


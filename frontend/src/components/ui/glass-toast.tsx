import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "@phosphor-icons/react"

import { cn } from "../../lib/utils"
import { useToast } from "../../hooks/useToast"

const GlassToastProvider = ToastPrimitives.Provider

const GlassToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
      className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-auto sm:right-0 sm:top-auto sm:mb-20 sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
GlassToastViewport.displayName = ToastPrimitives.Viewport.displayName

const glassToastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-6 pr-8 backdrop-blur-md shadow-glass-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border-glass-border bg-glass-white-lg text-gray-100",
        success:
          "success group border-accent-green/30 bg-accent-green/20 text-accent-green",
        destructive:
          "destructive group border-red-500/30 bg-red-500/20 text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const GlassToast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof glassToastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(glassToastVariants({ variant }), className)}
      {...props}
    />
  )
})
GlassToast.displayName = ToastPrimitives.Root.displayName

const GlassToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
      className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-glass-border bg-glass-white/5 px-3 text-sm font-medium text-gray-100 transition-colors hover:bg-glass-white-md focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.success]:border-accent-green/30 group-[.success]:hover:border-accent-green/50 group-[.success]:hover:bg-accent-green/30 group-[.success]:hover:text-accent-green group-[.success]:focus:ring-accent-green group-[.destructive]:border-red-500/30 group-[.destructive]:hover:border-red-500/50 group-[.destructive]:hover:bg-red-500/30 group-[.destructive]:hover:text-red-300 group-[.destructive]:focus:ring-red-400",
      className
    )}
    {...props}
  />
))
GlassToastAction.displayName = ToastPrimitives.Action.displayName

const GlassToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
      className={cn(
      "absolute right-2 top-2 rounded-lg p-1 text-gray-400 opacity-0 transition-opacity hover:text-gray-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent-blue group-hover:opacity-100 group-[.success]:text-accent-green group-[.success]:hover:text-accent-green group-[.success]:focus:ring-accent-green group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" weight="duotone" />
  </ToastPrimitives.Close>
))
GlassToastClose.displayName = ToastPrimitives.Close.displayName

const GlassToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold text-gray-100", className)}
    {...props}
  />
))
GlassToastTitle.displayName = ToastPrimitives.Title.displayName

const GlassToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90 text-gray-300", className)}
    {...props}
  />
))
GlassToastDescription.displayName = ToastPrimitives.Description.displayName

type GlassToastProps = React.ComponentPropsWithoutRef<typeof GlassToast>

type GlassToastActionElement = React.ReactElement<typeof GlassToastAction>

// Toaster component - orchestrates toast rendering
function GlassToaster() {
  const { toasts } = useToast()

  return (
    <GlassToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <GlassToast key={id} {...props}>
            <div className="grid gap-1">
              {title && <GlassToastTitle>{title}</GlassToastTitle>}
              {description && (
                <GlassToastDescription>{description}</GlassToastDescription>
              )}
            </div>
            {action}
            <GlassToastClose />
          </GlassToast>
        )
      })}
      <GlassToastViewport />
    </GlassToastProvider>
  )
}

export {
  type GlassToastProps,
  type GlassToastActionElement,
  GlassToastProvider,
  GlassToastViewport,
  GlassToast,
  GlassToastTitle,
  GlassToastDescription,
  GlassToastClose,
  GlassToastAction,
  GlassToaster,
}


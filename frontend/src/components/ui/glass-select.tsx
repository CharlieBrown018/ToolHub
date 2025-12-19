import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, CaretDown, CaretUp } from "@phosphor-icons/react"
import { cn } from "../../lib/utils"

const GlassSelect = SelectPrimitive.Root

const GlassSelectGroup = SelectPrimitive.Group

const GlassSelectValue = SelectPrimitive.Value

const GlassSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    variant?: "default" | "blue" | "green" | "purple" | "orange"
  }
>(({ className, children, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "focus:ring-accent-blue focus:border-accent-blue/50",
    blue: "focus:ring-accent-blue focus:border-accent-blue/50",
    green: "focus:ring-accent-green focus:border-accent-green/50",
    purple: "focus:ring-accent-purple focus:border-accent-purple/50",
    orange: "focus:ring-accent-orange focus:border-accent-orange/50",
  }

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-lg border border-glass-border bg-glass-white-md backdrop-blur-sm px-3 py-2 text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-glass-white-lg transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <CaretDown className="h-4 w-4 opacity-50" weight="duotone" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
GlassSelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const GlassSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <CaretUp className="h-4 w-4" weight="duotone" />
  </SelectPrimitive.ScrollUpButton>
))
GlassSelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const GlassSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <CaretDown className="h-4 w-4" weight="duotone" />
  </SelectPrimitive.ScrollDownButton>
))
GlassSelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const GlassSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    variant?: "default" | "blue" | "green" | "purple" | "orange"
  }
>(({ className, children, position = "popper", variant = "default", ...props }, ref) => {
  const variantBorderClasses = {
    default: "border-accent-blue/20",
    blue: "border-accent-blue/20",
    green: "border-accent-green/20",
    purple: "border-accent-purple/20",
    orange: "border-accent-orange/20",
  }

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border bg-glass-white-lg backdrop-blur-md text-gray-100 shadow-glass-sm",
          variantBorderClasses[variant],
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})
GlassSelectContent.displayName = SelectPrimitive.Content.displayName

const GlassSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold text-gray-300", className)}
    {...props}
  />
))
GlassSelectLabel.displayName = SelectPrimitive.Label.displayName

const GlassSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    variant?: "default" | "blue" | "green" | "purple" | "orange"
  }
>(({ className, children, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "focus:bg-accent-blue/10 focus:text-accent-blue",
    blue: "focus:bg-accent-blue/10 focus:text-accent-blue",
    green: "focus:bg-accent-green/10 focus:text-accent-green",
    purple: "focus:bg-accent-purple/10 focus:text-accent-purple",
    orange: "focus:bg-accent-orange/10 focus:text-accent-orange",
  }

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-glass-white-md data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" weight="duotone" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})
GlassSelectItem.displayName = SelectPrimitive.Item.displayName

const GlassSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-glass-border", className)}
    {...props}
  />
))
GlassSelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  GlassSelect,
  GlassSelectGroup,
  GlassSelectValue,
  GlassSelectTrigger,
  GlassSelectContent,
  GlassSelectLabel,
  GlassSelectItem,
  GlassSelectSeparator,
  GlassSelectScrollUpButton,
  GlassSelectScrollDownButton,
}


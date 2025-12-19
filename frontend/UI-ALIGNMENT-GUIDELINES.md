# UI Alignment Guidelines

This document outlines the design system and component guidelines for ToolHub's glassmorphic UI. Follow these guidelines to ensure consistency across all components and tools.

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Component Guidelines](#component-guidelines)
4. [Layout Patterns](#layout-patterns)
5. [Typography](#typography)
6. [Spacing & Sizing](#spacing--sizing)
7. [Animations & Interactions](#animations--interactions)
8. [Tool-Specific Theming](#tool-specific-theming)

---

## Design Philosophy

### Glassmorphism
ToolHub uses a **glassmorphic design language** characterized by:
- **Translucent backgrounds** with backdrop blur effects
- **Subtle borders** with low opacity
- **Layered depth** through shadows and elevation
- **Smooth transitions** for interactive elements
- **Consistent color theming** per tool

### Core Principles
1. **Consistency**: All components follow the same visual language
2. **Clarity**: Clear visual hierarchy and information architecture
3. **Accessibility**: Sufficient contrast and focus indicators
4. **Performance**: Smooth animations without layout shifts

---

## Color System

### Base Colors

```css
/* Background Colors */
--color-bg-primary: #111827        /* Main background */
--color-bg-secondary: #1f2937     /* Secondary surfaces */
--color-bg-tertiary: #374151       /* Tertiary surfaces */

/* Glass Colors */
--color-glass-white: rgba(255, 255, 255, 0.01)
--color-glass-white-md: rgba(255, 255, 255, 0.02)
--color-glass-white-lg: rgba(255, 255, 255, 0.04)
--color-glass-white-xl: rgba(255, 255, 255, 0.06)

/* Border Colors */
--color-glass-border: rgba(255, 255, 255, 0.08)
--color-glass-border-hover: rgba(255, 255, 255, 0.15)
--color-glass-border-strong: rgba(255, 255, 255, 0.2)
```

### Tool Color Themes

Each tool has a designated color theme that should be applied consistently:

| Tool | Color | Tailwind Token | Hex Value | Usage |
|------|-------|----------------|-----------|-------|
| **Scan2PDF** | Blue | `accent-blue` | `#60a5fa` | Buttons, borders, icons, focus rings |
| **DocuMark** | Green | `accent-green` | `#10b981` | Buttons, borders, icons, focus rings |
| **DataValidator** | Purple | `accent-purple` | `#8b5cf6` | Buttons, borders, icons, focus rings |
| **ColorPalette** | Orange | `accent-orange` | `#f97316` | Buttons, borders, icons, focus rings |

**Important**: All accent colors are defined in `tailwind.config.js` under `theme.extend.colors.accent`. Always use the Tailwind tokens (e.g., `accent-blue`, `accent-green`) instead of arbitrary color values or standard Tailwind colors (e.g., avoid `emerald-500`, `orange-500`).

### Color Application Rules

1. **Buttons**: Use tool-specific colored variants (`variant="blue"`, `variant="green"`, etc.)
2. **Borders**: Apply colored borders at 30% opacity (`border-accent-{color}/30`) for cards and headers
3. **Focus States**: Use tool color for focus rings (`focus:ring-accent-{color}`)
4. **Icons**: Match icon background and text color to tool theme (`bg-accent-{color}/15 text-accent-{color}`)
5. **Hover States**: Increase border opacity to 50% on hover (`hover:border-accent-{color}/50`)
6. **CSS `accent-color` Property**: For native inputs (checkboxes, range sliders), use inline styles:
   ```tsx
   <input type="checkbox" style={{ accentColor: '#60a5fa' }} />
   <input type="range" style={{ accentColor: '#f97316' }} />
   ```

---

## Component Guidelines

### Buttons

#### Variants

```tsx
// Default (neutral)
<GlassButton variant="default">Default</GlassButton>

// Tool-specific colored variants
<GlassButton variant="blue">Blue Action</GlassButton>
<GlassButton variant="green">Green Action</GlassButton>
<GlassButton variant="purple">Purple Action</GlassButton>
<GlassButton variant="orange">Orange Action</GlassButton>

// Other variants
<GlassButton variant="outline">Outline</GlassButton>
<GlassButton variant="ghost">Ghost</GlassButton>
<GlassButton variant="destructive">Delete</GlassButton>
```

#### Usage Guidelines

- **Primary Actions**: Use tool-specific colored variant
- **Secondary Actions**: Use `outline` or `ghost` variant
- **Destructive Actions**: Use `destructive` variant
- **Navigation**: Use colored variant matching the tool theme
- **Icon Buttons**: Use `size="icon"` with appropriate variant

#### Button Styling

```css
/* Colored Button Variants */
.variant-blue {
  background: rgba(96, 165, 250, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.3);
  color: #60a5fa;
}

.variant-blue:hover {
  background: rgba(96, 165, 250, 0.2);
  border-color: rgba(96, 165, 250, 0.5);
}
```

### Cards

#### Base Card Structure

```tsx
<GlassCard 
  hover={false}           // Disable hover in tool views
  animated={false}        // Disable animations in tool views
  className="border-{color}/20"  // Tool-specific border color
>
  <GlassCardHeader>
    <GlassCardTitle>Title</GlassCardTitle>
    <GlassCardDescription>Description</GlassCardDescription>
  </GlassCardHeader>
  <GlassCardContent>
    {/* Content */}
  </GlassCardContent>
  <GlassCardFooter>
    {/* Actions */}
  </GlassCardFooter>
</GlassCard>
```

#### Card Usage Rules

1. **Hub View**: Cards should have `hover={true}` and `animated={true}`
2. **Tool Views**: Cards should have `hover={false}` and `animated={false}`
3. **Borders**: Always apply tool-specific colored border (`border-{color}/20`)
4. **Shadows**: Use `shadow-glass-depth` for elevated cards
5. **Spacing**: Consistent padding (`p-4 sm:p-6`)

### Inputs

#### Text Inputs

```tsx
<input
  className="px-3 py-2 rounded-lg bg-glass-white-md backdrop-blur-sm 
             border border-glass-border text-gray-100 text-sm 
             focus:outline-none focus:ring-2 focus:ring-{tool-color} 
             focus:border-{tool-color}/50 
             hover:bg-glass-white-lg transition-colors"
/>
```

#### Select Dropdowns

```tsx
<select
  className="px-3 py-2 rounded-lg bg-glass-white-md backdrop-blur-sm 
             border border-glass-border text-gray-100 text-sm 
             focus:outline-none focus:ring-2 focus:ring-{tool-color} 
             focus:border-{tool-color}/50 
             hover:bg-glass-white-lg transition-colors cursor-pointer"
>
  {/* Options */}
</select>
```

#### Checkboxes & Radio Buttons

```tsx
<input
  type="checkbox"
  className="w-4 h-4 rounded border-glass-border bg-glass-white-md 
             backdrop-blur-sm accent-{tool-color} 
             focus:ring-2 focus:ring-{tool-color} 
             focus:ring-offset-0 cursor-pointer"
/>
```

#### Range Sliders

```tsx
<input
  type="range"
  className="w-full h-2 rounded-lg accent-{tool-color} 
             bg-glass-white-md backdrop-blur-sm cursor-pointer"
/>
```

#### Color Pickers

```tsx
<input
  type="color"
  className="flex-1 px-3 py-2 rounded-lg bg-glass-white-md 
             backdrop-blur-sm border border-glass-border 
             focus:outline-none focus:ring-2 focus:ring-{tool-color}"
/>
```

### Icons

#### Icon Containers

```tsx
// Tool icon (12x12 container, 6x6 icon)
<div className="h-12 w-12 rounded-lg bg-{tool-color}/15 
                text-{tool-color} backdrop-blur-sm 
                border border-glass-border 
                flex items-center justify-center shadow-depth-1">
  <Icon className="h-6 w-6" weight="duotone" />
</div>

// Small icon (8x8 container, 4x4 icon)
<div className="h-8 w-8 rounded-lg bg-glass-white-lg 
                backdrop-blur-sm border border-glass-border 
                flex items-center justify-center shadow-depth-1">
  <Icon className="h-4 w-4" weight="duotone" />
</div>
```

#### Icon Usage Rules

1. **Tool Icons**: Use `weight="duotone"` for consistency
2. **Sizes**: Standard sizes are `h-4 w-4`, `h-5 w-5`, `h-6 w-6`
3. **Colors**: Match icon color to tool theme or use `text-gray-300`
4. **Containers**: Use colored backgrounds matching tool theme

---

## Layout Patterns

### Page Structure

```tsx
// Hub Layout
<RootLayout>
  <HubLayout>
    {/* Tool cards grid */}
  </HubLayout>
</RootLayout>

// Tool Layout
<RootLayout>
  <ToolLayout
    title="Tool Name"
    subtitle="Tool description"
    icon={ToolIcon}
    iconColor="blue"
  >
    {/* Tool content */}
  </ToolLayout>
</RootLayout>
```

### Grid Layouts

```tsx
// Hub: 3-column grid (responsive)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Tool cards */}
</div>

// Tool: 2-column grid (responsive)
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Content cards */}
</div>
```

### Container Spacing

```tsx
// Main container
<div className="container mx-auto px-4 py-8">
  {/* Content */}
</div>

// Card spacing
<div className="space-y-6">
  {/* Cards */}
</div>
```

---

## Typography

### Font Families

```css
--font-family-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
--font-family-inter: 'Inter', sans-serif;
--font-family-mono: 'Fira Code', monospace;  /* For code editors */
```

### Text Colors

```css
/* Primary text */
text-gray-100    /* Headings, important text */

/* Secondary text */
text-gray-300    /* Body text, descriptions */

/* Tertiary text */
text-gray-400    /* Labels, hints, metadata */

/* Accent text */
text-{tool-color}  /* Tool-specific colored text */
```

### Text Sizes

```css
text-xs      /* 12px - Labels, hints */
text-sm      /* 14px - Descriptions, metadata */
text-base    /* 16px - Body text */
text-lg      /* 18px - Subheadings */
text-xl      /* 20px - Card titles */
text-2xl     /* 24px - Page titles */
```

---

## Spacing & Sizing

### Standard Spacing Scale

```css
gap-2    /* 8px - Tight spacing */
gap-4    /* 16px - Standard spacing */
gap-6    /* 24px - Card spacing */
gap-8    /* 32px - Section spacing */
```

### Component Sizes

```css
/* Buttons */
h-9      /* Small buttons */
h-10     /* Default buttons */
h-11     /* Large buttons */
h-12     /* Icon containers */

/* Cards */
p-4      /* Mobile padding */
sm:p-6   /* Desktop padding */

/* Inputs */
px-3 py-2    /* Standard input padding */
px-4 py-2    /* Larger input padding */
```

### Border Radius

```css
rounded-lg    /* 8px - Buttons, inputs */
rounded-xl    /* 12px - Cards */
rounded-2xl   /* 16px - Large cards */
```

---

## Animations & Interactions

### Page Transitions

```tsx
// Use PageTransition wrapper for route changes
<PageTransition>
  {/* Page content */}
</PageTransition>
```

### Hover Effects

```css
/* Cards (Hub view only) */
hover:scale-1.01
hover:-translate-y-2
transition-transform duration-200

/* Buttons */
hover:scale-1.05
transition-all duration-200

/* Borders */
hover:border-{color}/40-50
transition-colors duration-300
```

### Focus States

```css
/* Always use tool-specific color */
focus:ring-2
focus:ring-{tool-color}
focus:border-{tool-color}/50
```

### Animation Rules

1. **Hub View**: Enable hover animations and card animations
2. **Tool Views**: Disable hover and animations for cards
3. **Buttons**: Always animated (scale on hover/tap)
4. **Transitions**: Use `duration-200` for quick interactions
5. **Page Changes**: Use `PageTransition` component (150ms fade)

---

## Tool-Specific Theming

### Color Application Checklist

For each tool component, ensure:

- [ ] **Tool Header**: Colored border (`border-{color}/20`)
- [ ] **Tool Icon**: Colored background (`bg-{color}/15`) and text (`text-{color}`)
- [ ] **Back Button**: Colored background and border matching tool icon
- [ ] **Cards**: Colored borders (`border-{color}/20`)
- [ ] **Primary Buttons**: Tool-specific variant (`variant="{color}"`)
- [ ] **Inputs**: Colored focus rings (`focus:ring-{color}`)
- [ ] **Select Dropdowns**: Colored focus borders (`focus:border-{color}/50`)
- [ ] **Checkboxes**: Colored accent (`accent-{color}`)
- [ ] **Range Sliders**: Colored accent (`accent-{color}`)
- [ ] **Tabs**: Colored active state (`border-{color}` and `text-{color}`)

### Tool Color Mapping

```tsx
// Helper function for consistent color mapping
const getToolColorClasses = (toolId: string) => {
  const colorMap = {
    'image-to-pdf': {
      border: 'border-accent-blue/20',
      hover: 'hover:border-accent-blue/40',
      button: 'blue',
      icon: 'bg-accent-blue/15 text-accent-blue',
      focus: 'focus:ring-accent-blue',
    },
    'md-to-pdf': {
      border: 'border-emerald-500/20',
      hover: 'hover:border-emerald-500/40',
      button: 'green',
      icon: 'bg-emerald-500/15 text-emerald-400',
      focus: 'focus:ring-emerald-500',
    },
    'data-validator': {
      border: 'border-accent-purple/20',
      hover: 'hover:border-accent-purple/40',
      button: 'purple',
      icon: 'bg-accent-purple/15 text-accent-purple',
      focus: 'focus:ring-accent-purple',
    },
    'color-palette': {
      border: 'border-orange-500/20',
      hover: 'hover:border-orange-500/40',
      button: 'orange',
      icon: 'bg-orange-500/15 text-orange-400',
      focus: 'focus:ring-orange-500',
    },
  };
  return colorMap[toolId] || colorMap['image-to-pdf'];
};
```

---

## Component Examples

### Complete Tool Card (Hub)

```tsx
<GlassCard
  className="border-accent-blue/30 hover:border-accent-blue/50"
  hover={true}
  animated={true}
>
  <GlassCardHeader>
    <div className="flex items-center gap-3 mb-2">
      <div className="h-12 w-12 rounded-lg bg-accent-blue/15 
                      text-accent-blue backdrop-blur-sm 
                      border border-glass-border 
                      flex items-center justify-center">
        <Image className="h-6 w-6" weight="duotone" />
      </div>
      <GlassCardTitle>Scan2PDF</GlassCardTitle>
    </div>
    <GlassCardDescription>
      Convert images and PDFs to searchable PDFs
    </GlassCardDescription>
  </GlassCardHeader>
  <GlassCardContent>
    {/* Features */}
  </GlassCardContent>
  <GlassCardFooter>
    <GlassButton variant="blue" asChild className="w-full">
      <Link to="/tools/image-to-pdf">
        Open Tool <CaretRight className="ml-2 h-4 w-4" />
      </Link>
    </GlassButton>
  </GlassCardFooter>
</GlassCard>
```

### Tool Page Card

```tsx
<GlassCard
  hover={false}
  animated={false}
  className="border-accent-blue/20"
>
  <GlassCardHeader>
    <GlassCardTitle>Convert Files</GlassCardTitle>
    <GlassCardDescription>
      Select images or PDFs to convert
    </GlassCardDescription>
  </GlassCardHeader>
  <GlassCardContent>
    {/* Form inputs */}
    <GlassButton variant="blue" type="submit" className="w-full">
      Convert to PDF
    </GlassButton>
  </GlassCardContent>
</GlassCard>
```

---

## Best Practices

### Do's ✅

- ✅ Always use tool-specific colors for primary actions
- ✅ Apply consistent spacing using the scale (gap-4, gap-6, etc.)
- ✅ Use glassmorphic backgrounds (`bg-glass-white-md`)
- ✅ Include backdrop blur (`backdrop-blur-md`)
- ✅ Apply colored borders at 20% opacity
- ✅ Use `PageTransition` for route changes
- ✅ Disable hover/animations in tool views
- ✅ Match icon sizes to container sizes

### Don'ts ❌

- ❌ Don't use generic blue colors - use tool-specific colors
- ❌ Don't enable hover effects on cards in tool views
- ❌ Don't mix different border opacity levels inconsistently
- ❌ Don't skip colored focus states on inputs
- ❌ Don't use hard-coded colors - use CSS variables
- ❌ Don't forget to apply tool colors to all interactive elements
- ❌ Don't use different icon weights - stick to `duotone`

---

## Accessibility

### Focus Indicators

Always provide visible focus indicators:

```css
focus:outline-none
focus:ring-2
focus:ring-{tool-color}
focus:ring-offset-2
```

### Color Contrast

- Ensure text meets WCAG AA contrast ratios
- Use `text-gray-100` for primary text on dark backgrounds
- Use `text-gray-300` for secondary text
- Tool-colored text should be bright enough for visibility

### Keyboard Navigation

- All interactive elements should be keyboard accessible
- Use semantic HTML elements (`<button>`, `<a>`, etc.)
- Provide clear focus states

---

## Maintenance

### Adding New Tools

When adding a new tool:

1. **Choose a color theme** (blue, green, purple, orange, or new)
2. **Update color mapping** in helper functions
3. **Apply colors consistently** to all components
4. **Update this guide** with new patterns

### Component Updates

When updating components:

1. **Check color consistency** across all instances
2. **Verify hover states** are appropriate for context
3. **Ensure focus states** use tool colors
4. **Test animations** don't cause layout shifts

---

## Resources

- **Design Tokens**: `frontend/src/index.css`
- **Component Library**: `frontend/src/components/ui/`
- **Layouts**: `frontend/src/components/layouts/`
- **Animations**: `frontend/src/components/animations/`

---

**Last Updated**: 2025-01-XX
**Version**: 1.0.0


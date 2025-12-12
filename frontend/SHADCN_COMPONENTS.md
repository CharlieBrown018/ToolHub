# shadcn/ui Components Documentation

This project uses **shadcn/ui** components - a collection of accessible React components built on Radix UI primitives and styled with Tailwind CSS.

## Components Installed

### Core UI Components

1. **Button** (`components/ui/button.tsx`)
   - Built on: `@radix-ui/react-slot`
   - Features: Variants (default, destructive, outline, secondary, ghost, link), Sizes (default, sm, lg, icon)
   - Uses: `class-variance-authority` for variant management

2. **Card** (`components/ui/card.tsx`)
   - Components: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
   - Pure Tailwind CSS implementation (no Radix dependency)

3. **Progress** (`components/ui/progress.tsx`)
   - Built on: `@radix-ui/react-progress`
   - Features: Animated progress indicator

4. **Toast** (`components/ui/toast.tsx`)
   - Built on: `@radix-ui/react-toast`
   - Components: Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastClose, ToastAction
   - Features: Variants (default, destructive), swipe gestures, animations

5. **useToast Hook** (`components/ui/use-toast.ts`)
   - Toast state management hook
   - Provides `toast()` function for displaying notifications

6. **Toaster** (`components/ui/toaster.tsx`)
   - Toast container component
   - Must be rendered in your app root (typically in `App.tsx`)
   - Displays all active toasts

### Custom Components

7. **Header** (`components/ui/header.tsx`)
   - Custom component (not from shadcn/ui)
   - Features: Sticky header, back navigation, title/subtitle, optional status badge
   - Used by all tools for consistent header UI

## Dependencies

### Required Packages
- `@radix-ui/react-slot` - Button composition
- `@radix-ui/react-toast` - Toast notifications
- `@radix-ui/react-progress` - Progress indicator
- `class-variance-authority` - Component variants
- `clsx` - Conditional className utility
- `tailwind-merge` - Merge Tailwind classes
- `lucide-react` - Icons

### Optional (installed but not used)
- `@radix-ui/react-dialog` - Available for future use
- `@radix-ui/react-dropdown-menu` - Available for future use

## Configuration

- **Tailwind Config**: `tailwind.config.js`
- **Component Config**: `components.json`
- **Utils**: `src/lib/utils.ts` (cn function)
- **Style Variables**: Defined in `src/index.css` using CSS variables

## Usage Example

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

function MyComponent() {
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => toast({ title: 'Hello' })}>
          Click me
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Adding New Components

To add new shadcn/ui components:

```bash
npx shadcn-ui@latest add [component-name]
```

Or manually copy from: https://ui.shadcn.com/docs/components

## Notes

- All components are **copied into the codebase** (not installed as npm packages)
- Components can be **fully customized** since they're part of your codebase
- Follows shadcn/ui patterns but manually implemented
- Uses TypeScript for type safety
- Fully accessible (built on Radix UI primitives)


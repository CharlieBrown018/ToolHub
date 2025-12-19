# ToolHub Frontend Documentation

React + TypeScript frontend with **Vite**, glassmorphic design system, and Tailwind CSS v3.

## 🎨 Design System

ToolHub uses a **glassmorphic design language** with:
- Translucent backgrounds with backdrop blur
- Subtle borders and depth shadows
- Smooth hover animations with Framer Motion
- Dark theme with accent colors (blue, indigo, purple)
- Plus Jakarta Sans font family

## 📁 Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   ├── Hub.tsx          # Main hub page
│   │   └── tools/
│   │       ├── Scan2PDF.tsx # Image to PDF tool
│   │       └── DocuMark.tsx # Markdown to PDF tool
│   ├── lib/
│   │   └── utils.ts        # Utility functions
│   ├── types/
│   │   └── tool.ts         # TypeScript types
│   ├── App.tsx              # Main app component
│   ├── index.tsx            # Entry point
│   └── index.css            # Tailwind CSS + theme
├── index.html               # Vite entry HTML
├── vite.config.ts           # Vite configuration
├── package.json
├── tsconfig.json
├── tsconfig.node.json        # Vite config TypeScript
└── postcss.config.cjs        # PostCSS config (CommonJS)
```

## 🚀 Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Runs Vite dev server on http://localhost:3000 with hot module replacement (HMR).

### Build

```bash
npm run build
```

Creates production build in `build/` directory using Vite.

### Preview Production Build

```bash
npm run preview
```

Preview the production build locally.

## 🏗️ Architecture

### Component Structure

**Hub Component** (`components/Hub.tsx`)
- Main landing page
- Displays tool cards
- Fetches tools list from API
- Uses shadcn/ui Card components

**Tool Components** (`components/tools/`)
- **Scan2PDF.tsx** - Image to PDF converter
- **DocuMark.tsx** - Markdown to PDF converter
- Each tool is self-contained
- Uses shadcn/ui components for UI

**UI Components** (`components/ui/`)
- Glassmorphic components (GlassPanel, GlassCard, GlassButton)
- Built on Radix UI primitives
- Fully accessible
- TypeScript typed
- Framer Motion animations

**Glass Components** (`components/ui/`)
- **GlassPanel** - Base glassmorphic container with backdrop blur
- **GlassCard** - 3D glassmorphic card with hover effects
- **GlassButton** - Glassmorphic button with icon support

### Styling

**Tailwind CSS v3**
- Glassmorphic theme configuration
- Custom glass color variables
- Depth shadows and blur utilities
- Theme variables in `index.css`
- All styling via Tailwind utility classes

**Glassmorphic Theme Variables**
- Glass backgrounds: `bg-glass-white`, `bg-glass-white-md`, `bg-glass-white-lg`
- Glass borders: `border-glass-border`, `border-glass-border-hover`
- Depth shadows: `shadow-glass-depth`, `shadow-depth-2`, `shadow-depth-3`
- Backdrop blur: `backdrop-blur-md`, `backdrop-blur-lg`
- Accent colors: `accent-blue`, `accent-indigo`, `accent-purple`

### Type Safety

**TypeScript Types** (`types/`)
- `tool.ts` - Tool interface definition
- Full type coverage
- IntelliSense support

## 🎨 Components

### Hub Component

Main landing page that displays all available tools with glassmorphic design.

**Features:**
- Fetches tools from `/api/tools`
- Displays glassmorphic tool cards with hover effects
- Loading state handling
- Responsive grid layout
- Glassmorphic header and footer

**Usage:**
```tsx
<Hub />
```

**Styling:**
- Uses GlassCard components for tool cards
- Glassmorphic header with backdrop blur
- Glassmorphic footer with border

### Scan2PDF Component

Image to PDF OCR converter tool.

**Features:**
- File/folder selection
- Drag-and-drop upload
- Real-time progress (SSE)
- PDF preview
- Batch processing

**State Management:**
- `inputFiles` - Selected input files
- `outputPath` - Output folder path
- `progress` - Conversion progress
- `results` - Conversion statistics
- `fileList` - Converted files list

### DocuMark Component

Markdown to PDF converter tool.

**Features:**
- File upload
- Text editor
- PDF download
- Syntax highlighting support

**State Management:**
- `mdContent` - Markdown content
- `isConverting` - Conversion state

### UI Components

**GlassButton** (`components/ui/button.tsx`)
- Glassmorphic button with backdrop blur
- Multiple variants (default, outline, ghost, etc.)
- Size variants (sm, default, lg, icon)
- Icon support (left/right positioning)
- Smooth hover animations
- Fully accessible

**GlassCard** (`components/ui/card.tsx`)
- Glassmorphic card container with depth
- 3D hover effects with perspective
- CardHeader, CardTitle, CardDescription
- CardContent, CardFooter
- Gradient overlays on hover

**GlassPanel** (`components/ui/glass-panel.tsx`)
- Base glassmorphic container
- Variants: subtle, elevated, highlighted
- Backdrop blur and translucent backgrounds
- Hover state management

**Progress** (`components/ui/progress.tsx`)
- Progress bar component with glassmorphic styling
- Used for conversion progress

**Toast** (`components/ui/toast.tsx`)
- Glassmorphic toast notifications
- Success/error variants
- Auto-dismiss

## 🔌 API Integration

### API Base URL

```typescript
const API_BASE = import.meta.env.VITE_API_URL || '';
```

Vite uses `import.meta.env` for environment variables. In development, the proxy in `vite.config.ts` handles API requests automatically. Set `VITE_API_URL` in `.env` for production if needed.

### Fetching Tools

```typescript
fetch(`${API_BASE}/api/tools`)
  .then(res => res.json())
  .then((data: Tool[]) => {
    setTools(data);
  });
```

### SSE Streaming

```typescript
const response = await fetch(`${API_BASE}/api/tools/image-to-pdf/convert`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ... })
});

const reader = response.body?.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  // Process SSE events
}
```

## 🎯 Adding a New Tool Component

### Step 1: Create Component

```typescript
// src/components/tools/YourTool.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

function YourTool() {
  const [data, setData] = useState('');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Tool</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Your tool UI */}
      </CardContent>
    </Card>
  );
}

export default YourTool;
```

### Step 2: Add Route

```typescript
// src/App.tsx
import YourTool from './components/tools/YourTool';

<Route path="/tools/your-tool" element={<YourTool />} />
```

### Step 3: Update Navigation

The tool will automatically appear in the Hub if it's registered in the backend `/api/tools` endpoint.

## 🎨 Styling Guidelines

### Glassmorphic Design Patterns

Use glassmorphic components and utilities:

```tsx
<GlassCard hoverable perspective animated>
  <GlassPanel variant="elevated" hover>
    <h1 className="text-2xl font-bold text-gray-100">Title</h1>
  </GlassPanel>
</GlassCard>
```

### Glassmorphic Utilities

**Backgrounds:**
- `bg-glass-white` - Subtle glass background (1% opacity)
- `bg-glass-white-md` - Medium glass background (2% opacity)
- `bg-glass-white-lg` - Strong glass background (4% opacity)
- `bg-glass-white-xl` - Extra strong glass background (6% opacity)

**Borders:**
- `border-glass-border` - Subtle glass border (8% opacity)
- `border-glass-border-hover` - Hover glass border (15% opacity)
- `border-glass-border-strong` - Strong glass border (20% opacity)

**Shadows:**
- `shadow-glass-depth` - Combined glass shadow with depth
- `shadow-depth-2` - Medium depth shadow
- `shadow-depth-3` - Strong depth shadow
- `shadow-glass-lifted` - Elevated glass shadow

**Backdrop Blur:**
- `backdrop-blur-sm` - Small blur (4px)
- `backdrop-blur-md` - Medium blur (16px)
- `backdrop-blur-lg` - Large blur (24px)
- `backdrop-blur-xl` - Extra large blur (32px)

### Theme Colors

**Glass Colors:**
- `bg-bg-primary` - Primary background (#111827)
- `bg-bg-secondary` - Secondary background (#1f2937)
- `text-gray-100` - Primary text
- `text-gray-400` - Muted text
- `text-accent-blue` - Blue accent (#60a5fa)
- `text-accent-indigo` - Indigo accent (#6366f1)
- `text-accent-purple` - Purple accent (#8b5cf6)

### Responsive Design

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid with glassmorphic cards */}
</div>
```

## 📦 Dependencies

### Core
- **react** ^18.2.0 - UI library
- **react-dom** ^18.2.0 - DOM rendering
- **react-router-dom** ^6.20.0 - Routing
- **typescript** ^5.3.3 - Type safety
- **vite** ^5.0.8 - Build tool and dev server

### UI Libraries
- **tailwindcss** ^3.4.0 - Styling
- **@phosphor-icons/react** ^2.1.10 - Icons (duotone style)
- **framer-motion** ^10.18.0 - Animations
- **@radix-ui/** - UI primitives
- **class-variance-authority** - Component variants
- **clsx** & **tailwind-merge** - Class utilities

## 🔧 Configuration

### TypeScript (`tsconfig.json`)

- Strict mode enabled
- React JSX support
- Path aliases configured (`@/*` maps to `./src/*`)
- ES module support

### Vite (`vite.config.ts`)

- React plugin configured
- Proxy for API requests (`/api` → `http://localhost:5000`)
- Path aliases (`@` → `./src`)
- Build output: `build/` directory

### Tailwind (`src/index.css`)

- Glassmorphic theme variables
- Custom glass color utilities
- Depth shadow utilities
- Backdrop blur utilities
- Plus Jakarta Sans font family
- Dark mode by default

### PostCSS (`postcss.config.cjs`)

- Tailwind CSS plugin
- Autoprefixer for browser compatibility
- Uses `.cjs` extension for CommonJS (required with `"type": "module"` in package.json)

## 🐛 Troubleshooting

**Build errors:**
- Clear `node_modules` and reinstall
- Check Node.js version (18+)
- Verify TypeScript version
- Check Vite configuration

**Type errors:**
- Run `npm run build` to see all errors
- Check `tsconfig.json` settings
- Verify import paths

**Styling issues:**
- Ensure Tailwind is imported in `index.css`
- Check `@theme` block configuration
- Verify PostCSS is configured

**API connection:**
- Check `VITE_API_URL` in `.env` (if set)
- Verify backend server is running on port 5000
- Check Vite proxy configuration in `vite.config.ts`
- Check CORS settings in backend

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [React Router Documentation](https://reactrouter.com/)


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
│   │   ├── animations/      # Animation components
│   │   │   ├── IntegrationHub3D.tsx  # 3D isometric hub
│   │   │   ├── RotatingGlobe.tsx    # Rotating globe background
│   │   │   └── PageTransition.tsx    # Page transitions
│   │   ├── Landing.tsx      # Marketing landing page
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

**Landing Component** (`components/Landing.tsx`)
- Main marketing/landing page with hero section
- Animated rotating headline with typewriter effect
- 3D isometric hub visualization (`IntegrationHub3D`)
- Three-section layout: Hero, Story/Features, Community
- Scroll-triggered animations with Framer Motion
- Responsive grid layout

**Hub Component** (`components/Hub.tsx`)
- Main hub page displaying all available tools
- Displays tool cards in grid layout
- Fetches tools list from API
- Uses shadcn/ui Card components

**Animation Components** (`components/animations/`)
- **IntegrationHub3D.tsx** - 3D isometric hub visualization with interactive tiles
- **RotatingGlobe.tsx** - Animated rotating globe background
- **PageTransition.tsx** - Page transition animations

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

### Landing Component

Main marketing/landing page with animated hero section and 3D visualizations.

**Features:**
- **Animated Hero Section:**
  - Rotating headline with typewriter effect (cycles through: Utility, Productivity, Privacy, ToolHub)
  - Animated cursor blinking effect
  - Smooth transitions between headlines using Framer Motion `AnimatePresence`
  - Two-column responsive layout (text left, 3D visualization right)

- **3D Hub Visualization:**
  - Interactive isometric 3D hub (`IntegrationHub3D` component)
  - Shows central TOOLHUB tile connected to tool tiles
  - Animated pulse lines connecting hub to tools
  - Grid-based positioning system

- **Story & Features Section:**
  - "Frustrated by the Web?" story card with glassmorphic design
  - Three feature highlights with icons (Utility, Privacy, Open Source)
  - Scroll-triggered animations (`whileInView`)
  - Hover effects on feature cards

- **Community & Support Section:**
  - Three support cards (Buy Coffee, Share Ideas, Contribute)
  - Rotating globe background (`RotatingGlobe` component)
  - Call-to-action button linking to `/hub`
  - Glassmorphic cards with color-coded borders

**State Management:**
- `headlineIndex` - Current rotating headline index (0-3)
- `displayText` - Typewriter effect display text
- `containerRef` - Ref for scroll tracking

**Animations:**
- Headline rotation every 4.5 seconds
- Typewriter effect (100ms per character)
- Scroll-triggered fade-in animations
- Hover scale/rotate effects on icons
- Smooth page transitions via `PageTransition`

**Usage:**
```tsx
<Landing />
```

**Styling:**
- Uses `GlassButton` and `GlassCard` components
- Responsive grid layout (`lg:grid-cols-12`)
- Custom color helper functions (`getBorderClasses`, `getIconBgClasses`)
- Gradient backgrounds and blur effects
- Accent color system for consistent theming

### Hub Component

Main hub page that displays all available tools with glassmorphic design.

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

### IntegrationHub3D Component

3D isometric visualization of the tool hub with interactive tiles and animated connections.

**Features:**
- **3D Tile System:**
  - Sharp-edged 3D boxes (top, front, left faces visible)
  - Configurable tile sizes (small, medium, large)
  - Grid-based positioning system (10x10 grid)
  - Solid color faces with gradient shading

- **Animated Pulse Lines:**
  - Lines connecting hub to each tool tile
  - Animated path drawing effect
  - Moving spark particles along paths
  - Color-coded by tool color

- **Grid System:**
  - Configurable grid size and cell dimensions
  - Automatic path generation following grid lines
  - Ghost/decorative lines extending outward
  - Isometric perspective transform

**Configuration:**
- `GRID_CONFIG` - Grid dimensions and cell size
- `TILE_SIZES` - Preset tile dimensions and thickness
- `TILES` - Array of tile configurations (position, color, icon, route)

**Usage:**
```tsx
<IntegrationHub3D />
```

**Styling:**
- CSS 3D transforms (`transform-style: preserve-3d`)
- Isometric rotation (`rotateX(58deg) rotateZ(-38deg)`)
- Custom color shading function for 3D depth
- Ground shadow effects

### RotatingGlobe Component

Animated rotating globe background used in the Community section of the Landing page.

**Features:**
- Continuous rotation animation
- Subtle opacity for background effect
- SVG-based globe rendering

**Usage:**
```tsx
<RotatingGlobe />
```

### PageTransition Component

Page transition wrapper for smooth route changes.

**Features:**
- Fade-in animations on page load
- Smooth transitions between routes
- Wraps page content

**Usage:**
```tsx
<PageTransition>
  {/* Page content */}
</PageTransition>
```

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

### Step 4: Add to Landing Page Visualization (Optional)

To add your tool to the 3D visualization on the Landing page, update the `TILES` array in `components/animations/IntegrationHub3D.tsx`:

```typescript
const TILES: TileConfig[] = [
  // ... existing tiles
  { 
    id: 'your-tool', 
    gridX: 5, 
    gridY: 2, 
    name: 'YourTool', 
    icon: YourIcon, 
    color: '#your-color', 
    route: '/tools/your-tool', 
    size: 'medium' 
  },
];
```

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


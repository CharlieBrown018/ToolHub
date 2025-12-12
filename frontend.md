# ToolHub Frontend Documentation

React + TypeScript frontend with **Vite**, shadcn/ui components, and Tailwind CSS v3.

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
- shadcn/ui component library
- Built on Radix UI primitives
- Fully accessible
- TypeScript typed

### Styling

**Tailwind CSS v3**
- Standard Tailwind configuration
- Theme variables in `index.css`
- No separate CSS files per component
- All styling via Tailwind utility classes

**Theme Variables**
- Defined in `index.css` `@theme` block
- Dark mode by default
- Customizable colors and spacing

### Type Safety

**TypeScript Types** (`types/`)
- `tool.ts` - Tool interface definition
- Full type coverage
- IntelliSense support

## 🎨 Components

### Hub Component

Main landing page that displays all available tools.

**Features:**
- Fetches tools from `/api/tools`
- Displays tool cards with features
- Loading state handling
- Responsive grid layout

**Usage:**
```tsx
<Hub />
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

**Button** (`components/ui/button.tsx`)
- Multiple variants (default, outline, ghost, etc.)
- Size variants (sm, default, lg, icon)
- Fully accessible

**Card** (`components/ui/card.tsx`)
- Card container
- CardHeader, CardTitle, CardDescription
- CardContent, CardFooter

**Progress** (`components/ui/progress.tsx`)
- Progress bar component
- Used for conversion progress

**Toast** (`components/ui/toast.tsx`)
- Toast notifications
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

### Tailwind Classes

Use Tailwind utility classes directly in components:

```tsx
<div className="flex items-center gap-4 p-6 bg-background border border-border rounded-lg">
  <h1 className="text-2xl font-bold text-foreground">Title</h1>
</div>
```

### Theme Colors

Use theme variables via Tailwind:

- `bg-background` - Background color
- `text-foreground` - Text color
- `bg-primary` - Primary color
- `border-border` - Border color
- `text-muted-foreground` - Muted text

### Responsive Design

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
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
- **lucide-react** ^0.303.0 - Icons
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

- Standard Tailwind directives
- Theme variables for customization
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


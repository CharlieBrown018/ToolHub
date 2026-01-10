import { Tool, ToolCategory } from '../types/tool';
import { 
  Image, 
  FileText, 
  Palette, 
  Lightning, 
  ShieldCheck, 
  Code
} from '@phosphor-icons/react';

// Category definitions
export const CATEGORIES: Record<string, { name: string; icon: any; color: string }> = {
  'image': {
    name: 'Image Tools',
    icon: Image,
    color: 'blue'
  },
  'document': {
    name: 'Document Tools',
    icon: FileText,
    color: 'green'
  },
  'developer': {
    name: 'Developer Tools',
    icon: Code,
    color: 'indigo'
  },
  'design': {
    name: 'Design Tools',
    icon: Palette,
    color: 'pink'
  },
  'security': {
    name: 'Security Tools',
    icon: ShieldCheck,
    color: 'amber'
  },
  'utility': {
    name: 'Utilities',
    icon: Lightning,
    color: 'teal'
  }
};

// Map tool IDs to categories
const TOOL_CATEGORY_MAP: Record<string, string> = {
  'image-to-pdf': 'image',
  'webp-express': 'image',
  'shrink-it': 'image',
  'md-to-pdf': 'document',
  'data-validator': 'developer',
  'diff-master': 'developer',
  'color-palette': 'design',
  'quick-qr': 'utility',
  'secure-pass': 'security',
  'unit-flow': 'utility'
};

/**
 * Get category for a tool based on its ID
 */
export function getToolCategory(tool: Tool): string {
  // If tool has explicit category, use it
  if (tool.category) {
    return tool.category;
  }
  
  // Otherwise, map by ID
  return TOOL_CATEGORY_MAP[tool.id] || 'utility';
}

/**
 * Categorize tools into groups
 */
export function categorizeTools(tools: Tool[]): ToolCategory[] {
  const categoryMap = new Map<string, Tool[]>();
  
  // Group tools by category
  tools.forEach(tool => {
    const categoryId = getToolCategory(tool);
    if (!categoryMap.has(categoryId)) {
      categoryMap.set(categoryId, []);
    }
    categoryMap.get(categoryId)!.push(tool);
  });
  
  // Convert to array of ToolCategory objects
  const categories: ToolCategory[] = [];
  categoryMap.forEach((tools, categoryId) => {
    const categoryInfo = CATEGORIES[categoryId] || CATEGORIES['utility'];
    
    // Force each tool to use its category's settled color for UI consistency
    const themedTools = tools.map(tool => ({
      ...tool,
      color: categoryInfo.color
    })).sort((a, b) => a.display_name.localeCompare(b.display_name));

    categories.push({
      id: categoryId,
      name: categoryInfo.name,
      icon: categoryInfo.icon,
      color: categoryInfo.color,
      tools: themedTools
    });
  });
  
  // Sort categories by name
  return categories.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get featured tools (one from each category)
 */
export function getFeaturedTools(tools: Tool[]): Tool[] {
  const categorized = categorizeTools(tools);
  return categorized.map(category => category.tools[0]).filter(Boolean);
}

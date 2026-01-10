import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tool } from '../../types/tool';
import { categorizeTools } from '../../utils/categories';
import { GlassSidebar, SidebarItem } from '../ui/glass-sidebar';
import { CaretRight, Folder, FolderOpen } from '@phosphor-icons/react';
import { getToolIcon } from '../../utils/tool-icons';
import { useSidebar } from '../../context/SidebarContext';

interface HubLayoutProps {
  children: ReactNode;
  tools: Tool[];
  onCategoryClick?: (categoryId: string) => void;
  selectedCategory?: string | null;
}

export function HubLayout({ children, tools, onCategoryClick, selectedCategory }: HubLayoutProps) {
  const location = useLocation();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const categories = categorizeTools(tools);
  
  // Find which category contains the current active tool
  const activeToolCategory = categories.find(cat => 
    cat.tools.some(tool => location.pathname === tool.route)
  );
  
  // Expand selected category or category with active tool by default
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    if (selectedCategory) {
      initial.add(selectedCategory);
    }
    if (activeToolCategory) {
      initial.add(activeToolCategory.id);
    }
    return initial;
  });

  // Track the last active category to only auto-expand when it changes (navigation)
  const [lastActiveCategoryId, setLastActiveCategoryId] = useState<string | null>(activeToolCategory?.id || null);
  
  // Update expanded categories only when navigation happens to a NEW category
  useEffect(() => {
    const currentCategoryId = activeToolCategory?.id || selectedCategory || null;
    
    if (currentCategoryId && currentCategoryId !== lastActiveCategoryId) {
      setExpandedCategories(prev => {
        const next = new Set(prev);
        next.add(currentCategoryId);
        return next;
      });
      setLastActiveCategoryId(currentCategoryId);
    }
  }, [activeToolCategory?.id, selectedCategory, lastActiveCategoryId]);
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
    
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };
  
  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; bg: string; text: string; iconBg: string }> = {
      blue: {
        border: 'border-accent-blue/30',
        bg: 'bg-accent-blue/10',
        text: 'text-accent-blue',
        iconBg: 'bg-accent-blue/20'
      },
      green: {
        border: 'border-accent-green/30',
        bg: 'bg-accent-green/10',
        text: 'text-accent-green',
        iconBg: 'bg-accent-green/20'
      },
      purple: {
        border: 'border-accent-purple/30',
        bg: 'bg-accent-purple/10',
        text: 'text-accent-purple',
        iconBg: 'bg-accent-purple/20'
      },
      indigo: {
        border: 'border-accent-indigo/30',
        bg: 'bg-accent-indigo/10',
        text: 'text-accent-indigo',
        iconBg: 'bg-accent-indigo/20'
      },
      pink: {
        border: 'border-accent-pink/30',
        bg: 'bg-accent-pink/10',
        text: 'text-accent-pink',
        iconBg: 'bg-accent-pink/20'
      },
      amber: {
        border: 'border-accent-amber/30',
        bg: 'bg-accent-amber/10',
        text: 'text-accent-amber',
        iconBg: 'bg-accent-amber/20'
      },
      cyan: {
        border: 'border-accent-cyan/30',
        bg: 'bg-accent-cyan/10',
        text: 'text-accent-cyan',
        iconBg: 'bg-accent-cyan/20'
      },
      teal: {
        border: 'border-accent-teal/30',
        bg: 'bg-accent-teal/10',
        text: 'text-accent-teal',
        iconBg: 'bg-accent-teal/20'
      },
    };
    return colors[color] || colors.blue;
  };
  
  // Convert categories to sidebar items
  const sidebarItems: SidebarItem[] = categories.map((category) => {
    const toolChildren = category.tools.map((tool) => ({
      id: tool.id,
      label: tool.display_name || tool.title,
      to: tool.route,
      active: location.pathname === tool.route,
      data: { tool, color: category.color } // Use category color for all tools within it
    }));
    
    // Category is active if:
    // 1. It's the selected category, OR
    // 2. Any of its tools are currently active (user is on that tool's page)
    const hasActiveTool = toolChildren.some(tool => tool.active);
    const isCategoryActive = selectedCategory === category.id || hasActiveTool;
    
    return {
      id: category.id,
      label: category.name,
      icon: category.icon as unknown as React.ComponentType<any>,
      badge: category.tools.length,
      active: isCategoryActive,
      children: toolChildren,
      data: { category, color: category.color }
    };
  });
  
  // Header: Featured Tools link
  const sidebarHeader = (() => {
    const isActive = location.pathname === '/hub' && !selectedCategory;
    const colors = getColorClasses('blue');
    
    if (isCollapsed) {
      return (
        <Link
          to="/hub"
          className={`flex items-center justify-center px-2 py-2 rounded-lg transition-all group ${
            isActive
              ? `${colors.bg} ${colors.border} border`
              : 'hover:bg-glass-white-md border border-transparent'
          }`}
          title="Featured Tools"
        >
          <div className={`h-8 w-8 rounded ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
            <Folder className={`h-4 w-4 ${isActive ? colors.text : 'text-gray-400 group-hover:text-gray-300'}`} weight="duotone" />
          </div>
        </Link>
      );
    }

    return (
      <Link
        to="/hub"
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
          isActive
            ? `${colors.bg} ${colors.border} border`
            : 'hover:bg-glass-white-md border border-transparent'
        }`}
      >
        <div className={`h-8 w-8 rounded ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
          <Folder className={`h-4 w-4 ${isActive ? colors.text : 'text-gray-400 group-hover:text-gray-300'}`} weight="duotone" />
        </div>
        <span className={`text-sm font-medium flex-1 ${
          isActive ? colors.text : 'text-gray-300 group-hover:text-white'
        } transition-colors`}>
          Featured Tools
        </span>
      </Link>
    );
  })();
  
  // Custom renderer for category items
  const renderCategoryItem = (item: SidebarItem, _level: number, isExpanded: boolean, isActive: boolean) => {
    const color = item.data?.color || 'blue';
    const colors = getColorClasses(color);
    const CategoryIcon = item.icon;
    
    if (isCollapsed) {
      return (
        <button
          onClick={() => toggleCategory(item.id)}
          className={`w-full flex items-center justify-center px-2 py-2 rounded-lg transition-all group ${
            isActive
              ? `${colors.bg} ${colors.border} border`
              : 'hover:bg-glass-white-md border border-transparent'
          }`}
          title={item.label}
        >
          <div className={`h-8 w-8 rounded ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
            {CategoryIcon && <CategoryIcon className={`h-4 w-4 ${colors.text}`} weight="duotone" />}
          </div>
        </button>
      );
    }
    
    return (
      <button
        onClick={() => toggleCategory(item.id)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all group ${
          isActive
            ? `${colors.bg} ${colors.border} border`
            : 'hover:bg-glass-white-md border border-transparent'
        }`}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CaretRight className="h-4 w-4 text-gray-400" weight="bold" />
        </motion.div>
        
        <div className={`h-6 w-6 rounded ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
          {isExpanded ? (
            <FolderOpen className={`h-3.5 w-3.5 ${colors.text}`} weight="duotone" />
          ) : (
            CategoryIcon && <CategoryIcon className={`h-3.5 w-3.5 ${colors.text}`} weight="duotone" />
          )}
        </div>
        
        <span className={`text-sm font-medium flex-1 text-left ${
          isActive ? colors.text : 'text-gray-300 group-hover:text-white'
        } transition-colors`}>
          {item.label}
        </span>
        
        <span className={`text-xs px-1.5 py-0.5 rounded ${
          isActive 
            ? `${colors.bg} ${colors.text}` 
            : 'bg-glass-white-md text-gray-500'
        }`}>
          {item.badge}
        </span>
      </button>
    );
  };
  
  // Custom renderer for tool items (children)
  const renderToolItem = (parentItem: SidebarItem, _level: number) => {
    const tools = parentItem.children || [];
    
    return (
      <>
        {tools.map((toolItem: SidebarItem) => {
          const tool = toolItem.data?.tool;
          const toolColor = toolItem.data?.color || 'blue';
          const ToolIcon = tool ? getToolIcon(tool.id) : null;
          const isToolActive = toolItem.active || false;
          const colors = getColorClasses(toolColor);
          
          if (!tool || !ToolIcon) return null;
          
          return (
            <Link
              key={toolItem.id}
              to={toolItem.to || '#'}
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-all group ${
                isToolActive
                  ? `${colors.bg} ${colors.border} border shadow-glass-sm`
                  : 'hover:bg-glass-white-md border border-transparent'
              }`}
            >
              <div className={`h-5 w-5 rounded flex items-center justify-center ${
                isToolActive 
                  ? colors.iconBg 
                  : 'bg-glass-white-md'
              }`}>
                <ToolIcon className={`h-3 w-3 ${
                  isToolActive 
                    ? colors.text 
                    : 'text-gray-500'
                }`} weight="duotone" />
              </div>
              <span className={`text-xs flex-1 ${
                isToolActive 
                  ? 'text-white font-medium' 
                  : 'text-gray-400 group-hover:text-gray-300'
              } transition-colors`}>
                {toolItem.label}
              </span>
            </Link>
          );
        })}
      </>
    );
  };
  
  const sidebar = (
    <GlassSidebar
      items={sidebarItems}
      header={sidebarHeader}
      expandedItems={expandedCategories}
      onItemToggle={toggleCategory}
      activeItemId={selectedCategory || undefined}
      renderItem={renderCategoryItem}
      renderChildren={renderToolItem}
      useRouter={true}
      isCollapsed={isCollapsed}
      onToggleCollapse={toggleSidebar}
    />
  );

  return (
    <main className="flex-1 flex overflow-hidden">
      {sidebar && (
        <div className="flex-shrink-0">
          {sidebar}
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 pt-4 pb-12">
          {children}
        </div>
      </div>
    </main>
  );
}

import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  href?: string;
  to?: string; // For React Router Link
  onClick?: () => void;
  badge?: string | number;
  active?: boolean;
  children?: SidebarItem[];
  data?: any; // For custom data
}

export interface GlassSidebarProps {
  items: SidebarItem[];
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  width?: string;
  collapsedWidth?: string;
  height?: string;
  renderItem?: (item: SidebarItem, level: number, isExpanded: boolean, isActive: boolean) => ReactNode;
  renderChildren?: (item: SidebarItem, level: number) => ReactNode;
  expandedItems?: Set<string>;
  onItemToggle?: (itemId: string) => void;
  activeItemId?: string;
  useRouter?: boolean; // Use React Router Link instead of anchor tags
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function GlassSidebar({
  items,
  header,
  footer,
  className,
  width = 'w-64',
  collapsedWidth = 'w-16',
  height = 'h-[calc(100vh-4rem)]',
  renderItem,
  renderChildren,
  expandedItems = new Set(),
  onItemToggle,
  activeItemId,
  useRouter = false,
  isCollapsed = false,
  onToggleCollapse,
}: GlassSidebarProps) {
  const currentWidth = isCollapsed ? collapsedWidth : width;
  
  return (
    <div className="relative flex items-start">
      <aside 
        className={cn(
          'flex-shrink-0 overflow-y-auto border-r border-glass-border isolate transition-all duration-300',
          currentWidth,
          height,
          className
        )}
        style={{ 
          background: 'linear-gradient(to right, rgba(17, 24, 39, 0.98), rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.98))', 
          backdropFilter: 'blur(16px)' 
        }}
      >
        {/* Background Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-transparent to-accent-purple/5 pointer-events-none" />
        
        <div className={cn('h-full relative z-10', isCollapsed ? 'p-2' : 'p-4')}>
          {header && <div className="mb-4">{header}</div>}
        
        <div className={cn('space-y-2', isCollapsed && 'space-y-1')}>
          {items.map((item) => {
            const isExpanded: boolean = expandedItems.has(item.id);
            const isActive: boolean = activeItemId === item.id || item.active || false;
            const hasChildren = item.children && item.children.length > 0;
            
            return (
              <div key={item.id}>
                {renderItem ? (
                  renderItem(item, 0, isExpanded, isActive)
                ) : (
                  <SidebarItemDefault
                    item={item}
                    isExpanded={isExpanded}
                    isActive={isActive}
                    hasChildren={hasChildren}
                    onToggle={() => onItemToggle?.(item.id)}
                    useRouter={useRouter ?? false}
                    isCollapsed={isCollapsed}
                  />
                )}
                
                {hasChildren && isExpanded && !isCollapsed && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-6 pl-2 border-l border-glass-border space-y-0.5 pt-1">
                        {renderChildren
                          ? renderChildren(item, 1)
                          : item.children?.map((child) => (
                              <SidebarItemDefault
                                key={child.id}
                                item={child}
                                isActive={activeItemId === child.id || child.active}
                                hasChildren={false}
                                useRouter={useRouter ?? false}
                                isCollapsed={isCollapsed}
                              />
                            ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>
        
        {footer && <div className="mt-4">{footer}</div>}
        </div>
      </aside>
      
       {/* Toggle Button - Positioned on the right edge, outside sidebar, part of sidebar material */}
       {onToggleCollapse && (
         <button
           onClick={onToggleCollapse}
           className={cn(
             'absolute top-4 z-20 flex items-center justify-center transition-all duration-300',
             'hover:bg-glass-white-md backdrop-blur-sm shadow-glass-depth',
             'w-6 h-8 border-l border-t border-b border-r border-glass-border',
             '-right-6 rounded-r-lg rounded-l-none'
           )}
           style={{
             background: 'linear-gradient(to right, rgba(17, 24, 39, 0.98), rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.98))',
             backdropFilter: 'blur(16px)'
           }}
           title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
         >
           {/* Background Gradient Glow - same as sidebar */}
           <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-transparent to-accent-purple/5 pointer-events-none rounded-inherit" />
           
           <svg
             className={cn(
               'relative z-10 transition-transform duration-300 text-gray-400 hover:text-white',
               isCollapsed ? '' : 'rotate-180'
             )}
             width="12"
             height="12"
             viewBox="0 0 16 16"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               d="M6 12L10 8L6 4"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
             />
           </svg>
         </button>
       )}
    </div>
  );
}

interface SidebarItemDefaultProps {
  item: SidebarItem;
  isExpanded?: boolean;
  isActive?: boolean;
  hasChildren?: boolean;
  onToggle?: () => void;
  useRouter?: boolean;
  isCollapsed?: boolean;
}

function SidebarItemDefault({
  item,
  isActive = false,
  hasChildren = false,
  onToggle,
  useRouter = false,
  isCollapsed = false,
}: SidebarItemDefaultProps) {
  const Icon = item.icon;
  const content = (
    <div
      className={cn(
        'flex items-center transition-all group',
        isCollapsed 
          ? 'justify-center px-2 py-2 rounded-lg' 
          : 'gap-2 px-3 py-2 rounded-lg',
        isActive
          ? 'bg-glass-white-md border border-glass-border-hover'
          : 'hover:bg-glass-white-md border border-transparent'
      )}
      onClick={hasChildren && onToggle ? onToggle : item.onClick}
      title={isCollapsed ? item.label : undefined}
    >
      {Icon && (
        <div className={cn(
          'rounded flex items-center justify-center flex-shrink-0',
          isCollapsed ? 'h-8 w-8' : 'h-6 w-6',
          isActive ? 'bg-glass-white-md' : 'bg-glass-white-md'
        )}>
          <Icon className={cn(
            isCollapsed ? 'h-4 w-4' : 'h-3.5 w-3.5',
            isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
          )} weight="duotone" />
        </div>
      )}
      
      {!isCollapsed && (
        <>
          <span className={cn(
            'text-sm font-medium flex-1 text-left',
            isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
          )}>
            {item.label}
          </span>
          
          {item.badge && (
            <span className={cn(
              'text-xs px-1.5 py-0.5 rounded',
              isActive
                ? 'bg-glass-white-md text-white'
                : 'bg-glass-white-md text-gray-500'
            )}>
              {item.badge}
            </span>
          )}
        </>
      )}
    </div>
  );

  if (useRouter && item.to) {
    return (
      <Link to={item.to} className="block">
        {content}
      </Link>
    );
  }

  if (item.href) {
    return (
      <a href={item.href} className="block">
        {content}
      </a>
    );
  }

  return content;
}

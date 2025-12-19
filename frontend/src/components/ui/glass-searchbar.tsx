import { MagnifyingGlass, X, CaretRight, Command, Image, FileText, CheckCircle, Palette, Lightning, ArrowsInSimple, Columns, ShieldCheck, ArrowsLeftRight, QrCode } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Tool } from '../../types/tool';
import { Link, useNavigate } from 'react-router-dom';

interface GlassSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  results?: Tool[];
  showResults?: boolean;
  onResultClick?: () => void;
}

export function GlassSearchBar({
  value,
  onChange,
  placeholder = 'Search tools...',
  disabled = false,
  results = [],
  showResults = false,
  onResultClick,
}: GlassSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const getToolIcon = (toolId: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'image-to-pdf': Image,
      'md-to-pdf': FileText,
      'data-validator': CheckCircle,
      'color-palette': Palette,
      'webp-express': Lightning,
      'shrink-it': ArrowsInSimple,
      'diff-master': Columns,
      'secure-pass': ShieldCheck,
      'unit-flow': ArrowsLeftRight,
      'quick-qr': QrCode,
    };
    return iconMap[toolId] || Image;
  };

  const handleClear = () => {
    onChange('');
    setActiveIndex(-1);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to focus
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }

      if (!isFocused) return;

      if (e.key === 'Escape') {
        if (value) handleClear();
        inputRef.current?.blur();
        setIsFocused(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && results[activeIndex]) {
          e.preventDefault();
          navigate(results[activeIndex].route);
          setIsFocused(false);
          onResultClick?.();
          handleClear();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, activeIndex, results, value]);

  // Click outside to close results
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  const showDropdown = showResults && isFocused && (results.length > 0 || (value.trim() !== '' && results.length === 0));

  return (
    <div className="relative w-full max-w-3xl mx-auto" ref={containerRef}>
      <div className={`relative flex items-center h-12 transition-all duration-300 ${isFocused ? 'scale-[1.01]' : ''}`}>
        {/* Search Icon */}
        <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none z-10">
          <MagnifyingGlass className={`h-5 w-5 transition-colors ${isFocused ? 'text-accent-blue' : 'text-gray-400'}`} weight="duotone" />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full h-full pl-12 pr-14 rounded-full bg-glass-white-md backdrop-blur-md border border-glass-border text-gray-100 placeholder-gray-500 text-base leading-none focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue/50 transition-all duration-200 shadow-glass-depth disabled:opacity-50 disabled:cursor-not-allowed`}
        />

        {/* Shortcut Hint / Clear Button */}
        <div className="absolute right-3 inset-y-0 flex items-center gap-2 z-10">
          <AnimatePresence mode="wait">
            {value && !disabled ? (
              <motion.button
                key="clear"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onClick={handleClear}
                className="h-7 w-7 rounded-full bg-glass-white-md backdrop-blur-sm border border-glass-border flex items-center justify-center text-gray-400 hover:text-gray-200 hover:bg-accent-blue/20 transition-all"
                aria-label="Clear search"
                type="button"
              >
                <X className="h-4 w-4" weight="bold" />
              </motion.button>
            ) : (
              <motion.div
                key="shortcut"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg border border-glass-border bg-glass-white-sm text-[11px] text-gray-500 font-mono pointer-events-none mr-1"
              >
                <Command className="h-3 w-3" />
                <span>K</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="absolute top-full left-0 right-0 mt-2 border border-glass-border rounded-2xl shadow-glass-lifted overflow-hidden z-[110]"
            style={{ 
              background: 'linear-gradient(to right, rgba(17, 24, 39, 0.98), rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.98))', 
              backdropFilter: 'blur(16px)' 
            }}
          >
            {/* Background Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-transparent to-accent-purple/5 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-2">
              {results.length > 0 ? (
                results.map((tool, index) => (
                  <Link
                    key={tool.id}
                    to={tool.route}
                    onClick={() => {
                      setIsFocused(false);
                      onResultClick?.();
                      handleClear();
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${
                      activeIndex === index ? 'bg-white/5 border border-white/10' : 'bg-transparent border border-transparent'
                    }`}
                  >
                    <div className={`h-11 w-11 rounded-xl bg-accent-${tool.color}/20 border border-accent-${tool.color}/30 flex items-center justify-center shadow-depth-1`}>
                      {(() => {
                        const IconComponent = getToolIcon(tool.id);
                        return <IconComponent className={`h-6 w-6 text-accent-${tool.color}`} weight="duotone" />;
                      })()}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-3">
                        <p className="text-base font-bold text-gray-100 truncate">{tool.display_name || tool.title}</p>
                        {tool.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-glass-white-md border border-glass-border text-gray-500 font-medium uppercase tracking-wider">{tag}</span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-400 truncate mt-1">{tool.description}</p>
                    </div>
                    <div className={`flex items-center gap-3 transition-all ${activeIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Open</span>
                      <CaretRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-12 text-center flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-glass-white-md flex items-center justify-center border border-glass-border">
                    <MagnifyingGlass className="h-8 w-8 text-gray-600" weight="duotone" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-300">No tools found</p>
                    <p className="text-sm text-gray-500 mt-1.5">Try searching for "pdf", "convert", or "image"</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3 border-t border-glass-border bg-white/5 flex items-center justify-between px-6">
              <div className="flex items-center gap-6 text-[11px] text-gray-500 font-medium uppercase tracking-wider">
                <span className="flex items-center gap-2"><span className="px-1.5 py-0.5 rounded bg-glass-white-md border border-glass-border text-gray-400">↑↓</span> Navigate</span>
                <span className="flex items-center gap-2"><span className="px-1.5 py-0.5 rounded bg-glass-white-md border border-glass-border text-gray-400">Enter</span> Select</span>
              </div>
              <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Found {results.length} tools</span>
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


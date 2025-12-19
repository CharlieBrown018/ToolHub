import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Toolbox, House, SquaresFour } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassSearchBar } from './glass-searchbar';
import { useSearch } from '../../context/SearchContext';
import { useEffect, useState } from 'react';
import { searchTools } from '../../services/tools';
import { Tool } from '../../types/tool';

export function GlassHeader() {
  const toolText = "Tool";
  const hubText = "Hub";
  const { searchQuery, setSearchQuery } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Debounced search for dropdown results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      searchTools(searchQuery)
        .then((data) => {
          setSearchResults(data);
          setIsSearching(false);
        })
        .catch(err => {
          console.error('Error searching tools in header:', err);
          setIsSearching(false);
        });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const navItems = [
    { label: 'Home', path: '/', icon: House },
    { label: 'Hub', path: '/hub', icon: SquaresFour },
  ];

  return (
    <header 
      className="sticky top-0 z-[100] border-b border-glass-border shadow-glass-depth isolate" 
      style={{ 
        background: 'linear-gradient(to right, rgba(17, 24, 39, 0.98), rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.98))', 
        backdropFilter: 'blur(16px)' 
      }}
    >
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-transparent to-accent-purple/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 h-16 relative z-10">
        <div className="flex items-center gap-4 sm:gap-8 h-full relative z-10">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group flex-shrink-0">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="h-9 w-9 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 backdrop-blur-md border border-accent-blue/30 flex items-center justify-center shadow-depth-1 group-hover:border-accent-blue/50 transition-colors"
            >
              <Toolbox className="h-5 w-5 text-accent-blue drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" weight="duotone" />
            </motion.div>
            
            <motion.div
              className="flex items-center gap-1 text-xl font-bold tracking-tight"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <div className="flex">
                {toolText.split("").map((letter, index) => (
                  <motion.span
                    variants={child}
                    key={index}
                    className="text-white"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              
              <motion.div 
                initial={{ scaleX: 0.5, opacity: 0, originX: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4, type: "spring", stiffness: 100 }}
                className="pl-1.5 pr-3 py-0.5 rounded-lg bg-accent-blue text-white shadow-[0_0_15px_rgba(96,165,250,0.4)] flex items-center overflow-hidden"
              >
                <div className="flex">
                  {hubText.split("").map((letter, index) => (
                    <motion.span
                      variants={child}
                      key={index}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </Link>
          
          <div className="flex-1 flex items-center justify-center min-w-0">
            <div className="w-full max-w-2xl flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <GlassSearchBar
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search tools..."
                  results={searchResults}
                  showResults={location.pathname !== '/hub'}
                  onResultClick={() => setSearchQuery('')}
                />
              </div>
              
              {/* Tool Count on Hub page */}
              <AnimatePresence>
                {location.pathname === '/hub' && searchQuery.trim() !== '' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="hidden xl:flex items-center gap-2.5 px-4 py-2 rounded-full bg-glass-white-md border border-glass-border whitespace-nowrap shadow-glass-sm"
                  >
                    <span className="text-sm font-bold text-accent-blue">{searchResults.length}</span>
                    <span className="text-[11px] text-gray-500 uppercase font-bold tracking-widest">{searchResults.length === 1 ? 'tool' : 'tools'}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center gap-1 sm:gap-2 relative">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 group ${
                    isActive 
                    ? 'text-accent-blue' 
                    : 'text-gray-400 hover:text-white hover:bg-glass-white-md'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-accent-blue/10 border border-accent-blue/20 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`h-5 w-5 relative z-10 ${isActive ? 'text-accent-blue' : 'text-gray-400 group-hover:text-white'} transition-colors`} weight={isActive ? "fill" : "duotone"} />
                  <span className="text-sm font-bold hidden md:block relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

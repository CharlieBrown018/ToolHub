import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Tool } from '../types/tool';
import { getTools, searchTools } from '../services/tools';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Tool[];
  isSearching: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Initial load
    getTools().then(setSearchResults).catch(console.error);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      getTools().then(setSearchResults).catch(console.error);
      setIsSearching(false);
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
          console.error('Error searching tools:', err);
          setIsSearching(false);
        });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, searchResults, isSearching }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}


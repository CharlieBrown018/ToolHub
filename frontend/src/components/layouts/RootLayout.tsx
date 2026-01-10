import { ReactNode } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { GlassHeader } from '../ui/glass-header';
import { GlassFooter } from '../ui/glass-footer';
import { HubLayout } from './HubLayout';
import { useSearch } from '../../context/SearchContext';

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchResults: tools } = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  // Check if we're on a hub or tool route
  const isHubOrToolRoute = location.pathname === '/hub' || location.pathname.startsWith('/tools/');

  const handleCategoryClick = (categoryId: string) => {
    if (location.pathname === '/hub') {
      // On hub route, update search params
      if (selectedCategory === categoryId) {
        setSearchParams({});
      } else {
        setSearchParams({ category: categoryId });
      }
    } else {
      // On tool route, navigate to hub with category
      navigate(`/hub?category=${categoryId}`);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <GlassHeader />
      {isHubOrToolRoute ? (
        <HubLayout
          tools={tools}
          onCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
        >
          {children}
        </HubLayout>
      ) : (
        children
      )}
      <GlassFooter />
    </div>
  );
}


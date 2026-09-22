'use client';

import { useState, useEffect } from 'react';
import { Flame, Search, PenLine, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CATEGORIES, type Category } from '@/lib/blog-data';
import { cn } from '@/lib/utils';

interface HeaderProps {
  activeCategory: Category | 'All';
  onCategoryChange: (cat: Category | 'All') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNewPost: () => void;
}

export function Header({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onNewPost,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => onCategoryChange('All')}
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Flame className="h-5 w-5" />
            </div>
            <span className="font-serif-display text-2xl font-bold tracking-tight">
              Ember
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onCategoryChange('All')}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                activeCategory === 'All'
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              )}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                  activeCategory === cat
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                )}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-48 lg:w-64 pl-9 h-9 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:border-input"
              />
            </div>
            <Button
              onClick={onNewPost}
              size="sm"
              className="shrink-0 gap-1.5"
            >
              <PenLine className="h-4 w-4" />
              <span className="hidden sm:inline">Write</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => {
                  onCategoryChange('All');
                  setMobileOpen(false);
                }}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                  activeCategory === 'All'
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground bg-muted/50'
                )}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onCategoryChange(cat);
                    setMobileOpen(false);
                  }}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                    activeCategory === cat
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground bg-muted/50'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

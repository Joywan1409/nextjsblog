'use client';

import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-data';
import { formatDate, formatDateShort } from '@/lib/markdown';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeroProps {
  featuredPosts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export function Hero({ featuredPosts, onSelectPost }: HeroProps) {
  if (featuredPosts.length === 0) return null;

  const [primary, ...secondary] = featuredPosts;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Primary featured post */}
        <article
          onClick={() => onSelectPost(primary)}
          className="group lg:col-span-8 relative overflow-hidden rounded-2xl cursor-pointer bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-500 animate-fade-in-up"
        >
          <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
            <img
              src={primary.coverImage}
              alt={primary.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-primary text-primary-foreground border-transparent">
                  {primary.category}
                </Badge>
                <span className="text-white/80 text-sm">
                  {formatDateShort(primary.date)}
                </span>
              </div>
              <h1 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight text-balance mb-3">
                {primary.title}
              </h1>
              <p className="text-white/70 text-sm sm:text-base line-clamp-2 max-w-2xl mb-4">
                {primary.excerpt}
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border-2 border-white/20">
                  <AvatarFallback className="bg-primary/80 text-primary-foreground text-xs">
                    {primary.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-white/90 text-sm font-medium">
                  {primary.author}
                </span>
                <span className="text-white/40">·</span>
                <span className="text-white/70 text-sm flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {primary.readTime} min
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Secondary featured posts */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {secondary.slice(0, 2).map((post, i) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group flex-1 relative overflow-hidden rounded-2xl cursor-pointer bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[180px] overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-accent text-accent-foreground border-transparent text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <h2 className="font-serif-display text-lg sm:text-xl font-bold text-white leading-snug text-balance mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-2 text-white/70 text-xs">
                    <span>{formatDateShort(post.date)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

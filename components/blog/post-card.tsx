'use client';

import { Clock, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-data';
import { formatDateShort } from '@/lib/markdown';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PostCardProps {
  post: BlogPost;
  index: number;
  onSelect: (post: BlogPost) => void;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

export function PostCard({ post, index, onSelect, onEdit, onDelete }: PostCardProps) {
  return (
    <article
      onClick={() => onSelect(post)}
      className="group flex flex-col overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-400 cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-background/90 backdrop-blur-sm text-foreground border-transparent">
            {post.category}
          </Badge>
        </div>
        <div
          className="absolute top-3 right-3"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/90 backdrop-blur-sm hover:bg-background transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onEdit(post)}
                className="gap-2 cursor-pointer"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(post.id)}
                className="gap-2 cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <span>{formatDateShort(post.date)}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime} min read
          </span>
        </div>

        <h3 className="font-serif-display text-xl font-bold leading-snug text-balance mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2.5 mt-auto pt-3 border-t border-border">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-primary/15 text-primary text-xs font-medium">
              {post.author
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-medium leading-tight">
              {post.author}
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              {post.authorRole}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

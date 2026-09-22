'use client';

import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Calendar, Edit2, Trash2 } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-data';
import { renderMarkdown, formatDate } from '@/lib/markdown';

interface PostDetailDialogProps {
  post: BlogPost | null;
  open: boolean;
  onClose: () => void;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

export function PostDetailDialog({
  post,
  open,
  onClose,
  onEdit,
  onDelete,
}: PostDetailDialogProps) {
  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {/* Cover image */}
        <div className="relative aspect-[16/8] w-full overflow-hidden rounded-t-lg">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Badge className="bg-primary text-primary-foreground border-transparent mb-3">
              {post.category}
            </Badge>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <DialogHeader className="space-y-4">
            <DialogTitle className="font-serif-display text-2xl sm:text-3xl font-bold leading-tight text-balance">
              {post.title}
            </DialogTitle>
            <p className="text-muted-foreground text-base leading-relaxed">
              {post.excerpt}
            </p>
          </DialogHeader>

          {/* Author and meta */}
          <div className="flex items-center justify-between mt-6 pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/15 text-primary font-medium">
                  {post.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{post.author}</span>
                <span className="text-xs text-muted-foreground">
                  {post.authorRole}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} min read
              </span>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose-blog mt-6 text-foreground/90"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* Actions */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(post)}
              className="gap-2"
            >
              <Edit2 className="h-4 w-4" />
              Edit Article
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onDelete(post.id);
                onClose();
              }}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

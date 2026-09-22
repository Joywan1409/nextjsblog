'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES, type Category, type BlogPost } from '@/lib/blog-data';

interface PostFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    excerpt: string;
    content: string;
    category: Category;
    author: string;
    authorRole: string;
    coverImage: string;
    featured: boolean;
  }) => void;
  editingPost: BlogPost | null;
}

const DEFAULT_COVER =
  'https://images.pexels.com/photos/261907/pexels-photo-261907.jpeg?auto=compress&cs=tinysrgb&w=1200';

export function PostFormDialog({
  open,
  onClose,
  onSave,
  editingPost,
}: PostFormDialogProps) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>('Design');
  const [author, setAuthor] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [coverImage, setCoverImage] = useState(DEFAULT_COVER);
  const [featured, setFeatured] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setExcerpt(editingPost.excerpt);
      setContent(editingPost.content);
      setCategory(editingPost.category);
      setAuthor(editingPost.author);
      setAuthorRole(editingPost.authorRole);
      setCoverImage(editingPost.coverImage);
      setFeatured(editingPost.featured);
    } else {
      setTitle('');
      setExcerpt('');
      setContent('');
      setCategory('Design');
      setAuthor('');
      setAuthorRole('');
      setCoverImage(DEFAULT_COVER);
      setFeatured(false);
    }
    setErrors({});
  }, [editingPost, open]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = 'Title is required';
    if (!excerpt.trim()) e.excerpt = 'Excerpt is required';
    if (!content.trim()) e.content = 'Content is required';
    if (!author.trim()) e.author = 'Author name is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category,
      author: author.trim(),
      authorRole: authorRole.trim() || 'Contributor',
      coverImage: coverImage.trim() || DEFAULT_COVER,
      featured,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif-display text-2xl font-bold">
            {editingPost ? 'Edit Article' : 'Write a New Article'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your story a title..."
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A short summary that appears in the card..."
              rows={2}
              className={errors.excerpt ? 'border-destructive' : ''}
            />
            {errors.excerpt && (
              <p className="text-xs text-destructive">{errors.excerpt}</p>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article in Markdown. Use ## for headings, **bold**, *italic*, > quotes, - lists..."
              rows={10}
              className={`font-mono text-sm ${errors.content ? 'border-destructive' : ''}`}
            />
            {errors.content && (
              <p className="text-xs text-destructive">{errors.content}</p>
            )}
          </div>

          {/* Category and Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as Category)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured">Featured</Label>
              <button
                id="featured"
                type="button"
                onClick={() => setFeatured((v) => !v)}
                className={`flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm transition-colors ${
                  featured
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-input bg-background text-muted-foreground'
                }`}
              >
                <span>{featured ? 'Yes, feature this' : 'No'}</span>
                <span
                  className={`flex h-5 w-9 items-center rounded-full px-0.5 transition-colors ${
                    featured ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${
                      featured ? 'translate-x-4' : ''
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Author */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author Name</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Jane Doe"
                className={errors.author ? 'border-destructive' : ''}
              />
              {errors.author && (
                <p className="text-xs text-destructive">{errors.author}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorRole">Author Role</Label>
              <Input
                id="authorRole"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="Staff Writer"
              />
            </div>
          </div>

          {/* Cover image */}
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://..."
            />
            {coverImage && (
              <div className="mt-2 overflow-hidden rounded-lg border border-border aspect-[16/8]">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {editingPost ? 'Save Changes' : 'Publish Article'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

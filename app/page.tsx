'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/blog/header';
import { Hero } from '@/components/blog/hero';
import { PostCard } from '@/components/blog/post-card';
import { PostDetailDialog } from '@/components/blog/post-detail-dialog';
import { PostFormDialog } from '@/components/blog/post-form-dialog';
import { Footer } from '@/components/blog/footer';
import { Button } from '@/components/ui/button';
import { useBlogPosts } from '@/lib/use-blog-posts';
import type { BlogPost, Category } from '@/lib/blog-data';
import { SearchX, PenLine, RotateCcw } from 'lucide-react';

export default function Home() {
  const { posts, createPost, updatePost, deletePost, resetPosts } = useBlogPosts();

  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
      );
    }
    return result;
  }, [posts, activeCategory, searchQuery]);

  const featuredPosts = useMemo(() => {
    const featured = filteredPosts.filter((p) => p.featured);
    if (featured.length >= 2) return featured;
    if (featured.length === 1 && filteredPosts.length > 1) {
      return [featured[0], filteredPosts.find((p) => !p.featured)!].filter(
        Boolean
      );
    }
    return filteredPosts.slice(0, 3);
  }, [filteredPosts]);

  const nonFeaturedPosts = useMemo(() => {
    const featuredIds = new Set(featuredPosts.map((p) => p.id));
    return filteredPosts.filter((p) => !featuredIds.has(p.id));
  }, [filteredPosts, featuredPosts]);

  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    setDetailOpen(true);
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setFormOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setDetailOpen(false);
    setFormOpen(true);
  };

  const handleSavePost = (data: {
    title: string;
    excerpt: string;
    content: string;
    category: Category;
    author: string;
    authorRole: string;
    coverImage: string;
    featured: boolean;
  }) => {
    if (editingPost) {
      updatePost(editingPost.id, data);
    } else {
      createPost(data);
    }
    setFormOpen(false);
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    deletePost(id);
  };

  const showHero =
    activeCategory === 'All' && !searchQuery && featuredPosts.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewPost={handleNewPost}
      />

      <main className="flex-1">
        {showHero && <Hero featuredPosts={featuredPosts} onSelectPost={handleSelectPost} />}

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          {/* Section header */}
          <div className="flex items-center justify-between mb-6 pt-4">
            <div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight">
                {searchQuery
                  ? 'Search Results'
                  : activeCategory === 'All'
                  ? 'Latest Articles'
                  : activeCategory}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredPosts.length}{' '}
                {filteredPosts.length === 1 ? 'article' : 'articles'}
                {searchQuery && (
                  <>
                    {' '}for &ldquo;{searchQuery}&rdquo;
                  </>
                )}
              </p>
            </div>
            {posts.length === 0 && (
              <Button variant="outline" size="sm" onClick={resetPosts} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset to Sample Posts
              </Button>
            )}
          </div>

          {/* Posts grid */}
          {filteredPosts.length > 0 ? (
            <>
              {showHero && nonFeaturedPosts.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {nonFeaturedPosts.map((post, i) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={i}
                      onSelect={handleSelectPost}
                      onEdit={handleEditPost}
                      onDelete={handleDeletePost}
                    />
                  ))}
                </div>
              )}
              {!showHero && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.map((post, i) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={i}
                      onSelect={handleSelectPost}
                      onEdit={handleEditPost}
                      onDelete={handleDeletePost}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                {searchQuery ? (
                  <SearchX className="h-8 w-8 text-muted-foreground" />
                ) : (
                  <PenLine className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <h3 className="font-serif-display text-xl font-semibold mb-2">
                {searchQuery
                  ? 'No articles found'
                  : 'No articles yet'}
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                {searchQuery
                  ? 'Try a different search term or browse another category.'
                  : 'Be the first to share your story. Click the Write button to get started.'}
              </p>
              {searchQuery ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                >
                  Clear filters
                </Button>
              ) : (
                <Button onClick={handleNewPost} className="gap-2">
                  <PenLine className="h-4 w-4" />
                  Write your first article
                </Button>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer onCategoryChange={setActiveCategory} />

      {/* Dialogs */}
      <PostDetailDialog
        post={selectedPost}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />
      <PostFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingPost(null);
        }}
        onSave={handleSavePost}
        editingPost={editingPost}
      />
    </div>
  );
}

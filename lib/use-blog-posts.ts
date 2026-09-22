'use client';

import { useState, useEffect, useCallback } from 'react';
import { BlogPost, SAMPLE_POSTS } from './blog-data';

const STORAGE_KEY = 'ember-blog-posts-v1';

function loadPosts(): BlogPost[] {
  if (typeof window === 'undefined') return SAMPLE_POSTS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as BlogPost[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore parse errors
  }
  return SAMPLE_POSTS;
}

function savePosts(posts: BlogPost[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // ignore quota errors
  }
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>(SAMPLE_POSTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPosts(loadPosts());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) savePosts(posts);
  }, [posts, hydrated]);

  const createPost = useCallback(
    (
      post: Omit<BlogPost, 'id' | 'date' | 'readTime'>
    ): BlogPost => {
      const newPost: BlogPost = {
        ...post,
        id: crypto.randomUUID(),
        date: new Date().toISOString().split('T')[0],
        readTime: Math.max(
          1,
          Math.ceil(post.content.split(/\s+/).length / 200)
        ),
      };
      setPosts((prev) => [newPost, ...prev]);
      return newPost;
    },
    []
  );

  const updatePost = useCallback(
    (id: string, updates: Partial<Omit<BlogPost, 'id' | 'date'>>) => {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                ...updates,
                readTime: updates.content
                  ? Math.max(1, Math.ceil(updates.content.split(/\s+/).length / 200))
                  : p.readTime,
              }
            : p
        )
      );
    },
    []
  );

  const deletePost = useCallback((id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const resetPosts = useCallback(() => {
    setPosts(SAMPLE_POSTS);
  }, []);

  return { posts, createPost, updatePost, deletePost, resetPosts, hydrated };
}

import { useState, useEffect } from 'react';
import { BlogPost, getAllPosts, categories } from '../utils/blogService';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  return {
    posts,
    categories
  };
}
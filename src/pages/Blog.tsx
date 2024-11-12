import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, ArrowUp } from 'lucide-react';
import HomeButton from '../components/HomeButton';
import BlogCard from '../components/blog/BlogCard';
import BlogEditor from '../components/blog/BlogEditor';
import BlogSlider from '../components/blog/BlogSlider';
import { BlogPost, createPost, updatePost, deletePost } from '../utils/blogService';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { toast, Toaster } from 'react-hot-toast';

export default function Blog() {
  const { posts: allPosts, categories } = useBlogPosts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const filtered = allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredPosts(filtered);
  }, [allPosts, searchQuery, selectedCategory]);

  const handleCreatePost = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleSavePost = async (post: BlogPost) => {
    try {
      if (editingPost) {
        await updatePost(post);
        toast.success('Post updated successfully!');
      } else {
        await createPost(post);
        toast.success('Post created successfully!');
      }
      setIsEditorOpen(false);
      setEditingPost(null);
    } catch (error) {
      toast.error('Failed to save post');
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      toast.success('Post deleted successfully!');
      setSelectedPost(null);
      setIsSliderOpen(false);
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  const handleCardClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsSliderOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <HomeButton />
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-sky-400/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-playfair bg-gradient-to-r from-white to-sky-400 bg-clip-text text-transparent">
              Blog Posts
            </h1>
            <div className="flex items-center gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 bg-gray-800/50 rounded-lg border border-sky-400/20 
                    focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white placeholder-gray-400"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button
                onClick={handleCreatePost}
                className="flex items-center gap-2 px-4 py-2 bg-sky-500/10 rounded-lg 
                  hover:bg-sky-500/20 transition-colors border border-sky-400/20 hover:border-sky-400/40"
              >
                <Plus className="w-4 h-4" />
                New Post
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              !selectedCategory
                ? 'bg-sky-500/20 text-sky-400 border border-sky-400/40'
                : 'text-gray-400 hover:bg-sky-500/10 hover:text-sky-400'
            }`}
          >
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-400/40'
                  : 'text-gray-400 hover:bg-sky-500/10 hover:text-sky-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              index={index}
              onClick={() => handleCardClick(post)}
              onEdit={() => handleEditPost(post)}
              onDelete={() => handleDeletePost(post.id)}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No posts found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Blog Editor Modal */}
      {isEditorOpen && (
        <BlogEditor
          post={editingPost}
          categories={categories}
          onSave={handleSavePost}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingPost(null);
          }}
        />
      )}

      {/* Blog Slider */}
      {selectedPost && (
        <BlogSlider
          post={selectedPost}
          isOpen={isSliderOpen}
          onClose={() => {
            setIsSliderOpen(false);
            setSelectedPost(null);
          }}
          onSave={handleSavePost}
          onDelete={handleDeletePost}
        />
      )}

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-sky-500/10 rounded-full hover:bg-sky-500/20 
              transition-colors border border-sky-400/20 hover:border-sky-400/40 z-50"
          >
            <ArrowUp className="w-6 h-6 text-sky-400" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
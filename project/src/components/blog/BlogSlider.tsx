import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import { BlogPost } from '../../utils/blogService';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-hot-toast';

interface BlogSliderProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: BlogPost) => void;
  onDelete: (postId: string) => void;
}

export default function BlogSlider({ post, isOpen, onClose, onSave, onDelete }: BlogSliderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState<BlogPost | null>(null);

  React.useEffect(() => {
    setEditedPost(post);
    setIsEditing(false);
  }, [post]);

  if (!post || !editedPost) return null;

  const handleSave = () => {
    try {
      onSave(editedPost);
      setIsEditing(false);
      toast.success('Blog post updated successfully');
    } catch (error) {
      toast.error('Failed to update blog post');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        onDelete(post.id);
        onClose();
        toast.success('Blog post deleted successfully');
      } catch (error) {
        toast.error('Failed to delete blog post');
      }
    }
  };

  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: isOpen ? 0 : '-100%' }}
      transition={{ type: 'spring', damping: 30 }}
      className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black text-white z-50 overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          {isEditing ? (
            <input
              type="text"
              value={editedPost.title}
              onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
              className="text-4xl font-playfair bg-transparent border-b border-sky-400/20 focus:border-sky-400 outline-none w-full"
            />
          ) : (
            <h1 className="text-4xl font-playfair">{post.title}</h1>
          )}
          <div className="flex items-center gap-4">
            {!isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-sky-400/10 rounded-lg transition-colors text-sky-400"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 hover:bg-red-400/10 rounded-lg transition-colors text-red-400"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </>
            )}
            <button
              onClick={isEditing ? handleSave : onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isEditing ? <Save className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </div>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
              <textarea
                value={editedPost.excerpt}
                onChange={(e) => setEditedPost({ ...editedPost, excerpt: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                  focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Content (Markdown)</label>
              <textarea
                value={editedPost.content}
                onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
                rows={20}
                className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                  focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
              <input
                type="url"
                value={editedPost.image}
                onChange={(e) => setEditedPost({ ...editedPost, image: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                  focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <input
                  type="text"
                  value={editedPost.category}
                  onChange={(e) => setEditedPost({ ...editedPost, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                    focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Read Time (minutes)</label>
                <input
                  type="number"
                  value={editedPost.readTime}
                  onChange={(e) => setEditedPost({ ...editedPost, readTime: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                    focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
                />
              </div>
            </div>
          </div>
        ) : (
          <article className="prose prose-invert prose-lg max-w-none">
            <div className="aspect-video mb-8 rounded-lg overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        )}
      </div>
    </motion.div>
  );
}
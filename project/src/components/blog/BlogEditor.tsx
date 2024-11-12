import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Image as ImageIcon } from 'lucide-react';
import { BlogPost } from '../../utils/blogService';
import { toast } from 'react-hot-toast';

interface BlogEditorProps {
  post: BlogPost | null;
  categories: string[];
  onSave: (post: BlogPost) => void;
  onClose: () => void;
}

export default function BlogEditor({ post, categories, onSave, onClose }: BlogEditorProps) {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    category: categories[0],
    readTime: 5
  });

  useEffect(() => {
    if (post) {
      setFormData(post);
    }
  }, [post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.excerpt || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      onSave(formData as BlogPost);
      onClose();
    } catch (error) {
      toast.error('Failed to save post');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <div className="min-h-screen px-4 py-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-lg border border-sky-400/20">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-playfair text-sky-400">
                {post ? 'Edit Post' : 'Create New Post'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-sky-400/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-sky-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                    focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt || ''}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                    focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content (Markdown)</label>
                <textarea
                  name="content"
                  value={formData.content || ''}
                  onChange={handleChange}
                  required
                  rows={10}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                    focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category || categories[0]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                      focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Read Time (minutes)</label>
                  <input
                    type="number"
                    name="readTime"
                    value={formData.readTime || 5}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                      focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                <div className="flex gap-4">
                  <input
                    type="url"
                    name="image"
                    value={formData.image || ''}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                      focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-sky-500/10 rounded-lg hover:bg-sky-500/20 
                      transition-colors border border-sky-400/20 hover:border-sky-400/40"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-sky-500/10 rounded-lg 
                    hover:bg-sky-500/20 transition-colors border border-sky-400/20 
                    hover:border-sky-400/40 font-medium"
                >
                  <Save className="w-5 h-5" />
                  {post ? 'Update Post' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
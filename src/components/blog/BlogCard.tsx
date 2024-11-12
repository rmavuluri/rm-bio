import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import { BlogPost } from '../../utils/blogService';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function BlogCard({ post, index, onClick, onEdit, onDelete }: BlogCardProps) {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
      <div className="relative bg-gray-900/90 rounded-lg border border-sky-400/20 hover:border-sky-400/40 transition-all duration-300 overflow-hidden">
        <div className="aspect-video overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-sky-500/10 rounded-full border border-sky-400/20">
              {post.category}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleEdit}
                className="p-2 bg-sky-500/10 rounded-full opacity-0 group-hover:opacity-100 
                  transition-all hover:bg-sky-500/20 border border-sky-400/20"
              >
                <Edit className="w-4 h-4 text-sky-400" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 bg-red-500/10 rounded-full opacity-0 group-hover:opacity-100 
                  transition-all hover:bg-red-500/20 border border-red-400/20"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
          <h2 className="text-xl font-playfair mb-3 group-hover:text-sky-400 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-400 mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
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
      </div>
    </motion.article>
  );
}
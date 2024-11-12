import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar } from 'lucide-react';

interface BlogSidebarProps {
  categories: string[];
  recentPosts: Array<{
    id: string;
    title: string;
    date: string;
    image: string;
  }>;
  selectedCategory: string | null;
  onCategorySelect: (category: string) => void;
}

export default function BlogSidebar({
  categories,
  recentPosts,
  selectedCategory,
  onCategorySelect
}: BlogSidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Categories */}
      <div className="bg-gray-900/50 rounded-lg border border-sky-400/20 p-6">
        <h2 className="text-xl font-playfair mb-4">Categories</h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
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

      {/* Recent Posts */}
      <div className="bg-gray-900/50 rounded-lg border border-sky-400/20 p-6">
        <h2 className="text-xl font-playfair mb-4">Recent Posts</h2>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <motion.a
              key={post.id}
              href="#"
              className="flex gap-4 group"
              whileHover={{ x: 4 }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-sm font-medium group-hover:text-sky-400 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-900/50 rounded-lg border border-sky-400/20 p-6">
        <h2 className="text-xl font-playfair mb-4">Newsletter</h2>
        <p className="text-gray-400 text-sm mb-4">
          Get the latest posts delivered straight to your inbox.
        </p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-2 bg-gray-800/50 rounded-lg border border-sky-400/20 
              focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-sky-500/10 rounded-lg hover:bg-sky-500/20 
              transition-colors border border-sky-400/20 hover:border-sky-400/40"
          >
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}
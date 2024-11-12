import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function BlogHero() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl font-playfair mb-6 bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
            Exploring the Future of Technology
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Dive into our latest insights about web development, cloud computing, and software architecture.
            Stay ahead with cutting-edge tech discussions and best practices.
          </p>
          <button className="group flex items-center gap-2 px-6 py-3 bg-sky-500/10 rounded-lg 
            hover:bg-sky-500/20 transition-colors border border-sky-400/20 hover:border-sky-400/40">
            Explore Latest Posts
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-8 right-8 z-20"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="bg-black/90 text-white rounded-full p-3 cursor-pointer hover:bg-black/80"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </motion.div>
  );
}
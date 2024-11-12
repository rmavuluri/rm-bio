import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollButtons() {
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const currentPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const nextSection = Math.ceil((currentPosition + 10) / windowHeight) * windowHeight;
    window.scrollTo({ top: nextSection, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-8 z-20 space-y-4">
      <AnimatePresence>
        {showScrollUp && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="bg-black/90 text-white rounded-full p-3 hover:bg-black/80 transition-colors fixed bottom-24"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={scrollToNext}
        className="bg-black/90 text-white rounded-full p-3 hover:bg-black/80 transition-colors fixed bottom-8"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface SectionProps {
  id: string;
  title: string;
  description: string;
  onClick: () => void;
  pattern: string;
  index: number;
}

const Section: React.FC<SectionProps> = ({ id, title, description, onClick, pattern, index }) => {
  const isEven = index % 2 === 0;

  const slideVariants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? -100 : 100 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="min-h-screen relative flex items-center justify-center p-6 border-b border-sky-400/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black">
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,${btoa(
          `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60">
            <path d="M0 0h60v60H0z" fill="none"/>
            <path d="${pattern}" stroke="rgba(56,189,248,0.1)" fill="none"/>
          </svg>`
        )}')] opacity-30`}></div>
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent"></div>
      <motion.div
        variants={slideVariants}
        whileHover={{ scale: 1.05 }}
        onClick={onClick}
        className="relative group max-w-2xl"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
        <div className="relative flex flex-col items-center cursor-pointer bg-gray-900/90 backdrop-blur-sm px-8 py-6 rounded-xl border border-sky-400/20 hover:border-sky-400/40 transition-all duration-300 group">
          <div className="flex items-center gap-6 mb-4">
            <h2 className="text-5xl font-playfair bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">{title}</h2>
            <ArrowRight className="w-8 h-8 text-sky-400 transform group-hover:translate-x-2 transition-transform duration-300" />
          </div>
          <p className="text-gray-400 text-center">{description}</p>
        </div>
      </motion.div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-1/3 bg-gradient-to-b from-transparent via-sky-400/20 to-transparent"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/3 bg-gradient-to-b from-transparent via-sky-400/20 to-transparent"></div>
    </motion.section>
  );
};

export default Section;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Code2, Cloud, Code, Network } from 'lucide-react';
import HomeButton from '../components/HomeButton';
import { technologies } from '../utils/techData';
import TechnologySlider from '../components/TechnologySlider';

const iconMap: { [key: string]: any } = {
  MessageSquare,
  Code2,
  Cloud,
  Code,
  Network
};

export default function Technologies() {
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24"
    >
      <HomeButton />
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-6xl font-playfair mb-12">Technologies</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => {
            const Icon = iconMap[tech.icon];
            return (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative transform transition-all duration-300 hover:-translate-y-2 hover:rotate-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} rounded-lg opacity-50 group-hover:opacity-70 blur transition duration-300`}></div>
                <div className="relative h-full bg-gray-900/90 backdrop-blur-sm rounded-lg border border-white/20 p-6 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 text-sm bg-white/10 rounded-full border border-white/20"
                    >
                      {tech.title}
                    </motion.div>
                  </div>
                  
                  <p className="text-gray-300 flex-grow mb-4">{tech.description}</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTechId(tech.id)}
                    className="self-end px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 
                      transition-colors border border-white/20 hover:border-white/40"
                  >
                    Read More
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <TechnologySlider
        techId={selectedTechId || ''}
        isOpen={!!selectedTechId}
        onClose={() => setSelectedTechId(null)}
      />
    </motion.div>
  );
}
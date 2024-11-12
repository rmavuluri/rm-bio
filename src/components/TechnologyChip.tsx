import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface TechnologyChipProps {
  tech: string;
  icon: LucideIcon;
  index: number;
}

export default function TechnologyChip({ tech, icon: Icon, index }: TechnologyChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700 hover:border-sky-400/50 transition-all hover:scale-105 group"
    >
      <Icon className="w-4 h-4 text-gray-400 group-hover:text-sky-400 transition-colors" />
      <span className="text-sm text-gray-300 group-hover:text-sky-400 transition-colors">{tech}</span>
    </motion.div>
  );
}
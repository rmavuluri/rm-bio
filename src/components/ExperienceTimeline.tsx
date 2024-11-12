import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

interface Experience {
  role: string;
  period: string;
}

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 to-transparent"></div>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-12"
          >
            <div className="absolute left-0 w-8 h-8 bg-sky-500/10 rounded-full border-2 border-sky-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-sky-400" />
            </div>
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
              <h3 className="text-gray-200 font-medium">{exp.role}</h3>
              <span className="text-sm text-sky-400">{exp.period}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Code2, Cloud, Code, Network } from 'lucide-react';
import { technologies } from '../utils/techData';
import HomeButton from '../components/HomeButton';

const iconMap: { [key: string]: any } = {
  MessageSquare,
  Code2,
  Cloud,
  Code,
  Network
};

export default function TechnologyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tech = technologies.find(t => t.id === id);

  if (!tech) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <button
            onClick={() => navigate('/technologies')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Technologies
          </button>
          <div className="mt-8">
            <h1 className="text-4xl font-playfair mb-8">Technology not found</h1>
          </div>
        </div>
      </div>
    );
  }

  const Icon = iconMap[tech.icon];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center justify-between mb-12">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/technologies')}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors group text-lg"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Technologies
          </motion.button>
          <HomeButton />
        </div>

        {/* Title Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative p-12 bg-gradient-to-r from-blue-900/50 to-blue-800/30 rounded-2xl mb-12 overflow-hidden"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-10 blur-xl`}></div>
          <div className="relative flex items-center gap-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center"
            >
              <Icon className="w-12 h-12 text-white" />
            </motion.div>
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl font-playfair text-white mb-4"
              >
                {tech.title}
              </motion.h1>
              <p className="text-xl text-gray-300">{tech.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-900/20 backdrop-blur-sm rounded-2xl p-12"
          >
            <h2 className="text-3xl font-playfair mb-6">Overview</h2>
            <p className="text-lg text-gray-300 leading-relaxed">{tech.fullContent.overview}</p>
          </motion.section>

          {/* Features */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-900/20 backdrop-blur-sm rounded-2xl p-12"
          >
            <h2 className="text-3xl font-playfair mb-8">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tech.fullContent.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 text-gray-300"
                >
                  <div className={`w-2 h-2 rounded-full ${tech.color.split(' ')[0].replace('from-', 'bg-')} mt-2`}></div>
                  <span className="text-lg">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          {/* Benefits */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-900/20 backdrop-blur-sm rounded-2xl p-12"
          >
            <h2 className="text-3xl font-playfair mb-8">Benefits</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tech.fullContent.benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4 text-gray-300"
                >
                  <div className={`w-2 h-2 rounded-full ${tech.color.split(' ')[0].replace('from-', 'bg-')} mt-2`}></div>
                  <span className="text-lg">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          {/* Use Cases */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-900/20 backdrop-blur-sm rounded-2xl p-12 mb-12"
          >
            <h2 className="text-3xl font-playfair mb-8">Use Cases</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tech.fullContent.useCases.map((useCase, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-4 text-gray-300"
                >
                  <div className={`w-2 h-2 rounded-full ${tech.color.split(' ')[0].replace('from-', 'bg-')} mt-2`}></div>
                  <span className="text-lg">{useCase}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
}
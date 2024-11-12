import React from 'react';
import { motion } from 'framer-motion';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: "easeOut"
    }
  })
};

export default function WelcomeMessage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-6 py-12 bg-black/95 rounded-2xl text-white/90 shadow-2xl backdrop-blur-sm"
    >
      <div className="space-y-8">
        <h1 className="text-4xl font-playfair">Welcome to my digital corner! 🌐</h1>

        <motion.div 
          className="space-y-6 text-lg font-inter leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.p
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-white/80"
          >
            <span className="float-left text-7xl font-playfair leading-[0.8] mr-2 mt-1 text-blue-400">H</span>
            <span className="text-xl leading-relaxed">ere, we delve into the boundless world of tech, where innovation meets passion, and every day is a chance to learn something new.</span>
          </motion.p>

          <motion.p
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-xl leading-relaxed text-white/80"
          >
            Whether you're here to solve a coding puzzle, explore the latest in cloud, or fuel your curiosity in AI and DevOps, you've come to the right place. Together, let's build, break, and rebuild better solutions, and inspire each other along the way. 🚀
          </motion.p>

          <motion.p
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-xl italic leading-relaxed text-blue-400/90 border-l-4 border-blue-500/30 pl-6"
          >
            Remember: every small step brings us closer to mastering our craft. Let's push boundaries and make ideas come to life. 💡
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
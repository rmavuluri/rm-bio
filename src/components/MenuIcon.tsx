import { motion } from 'framer-motion';

export default function MenuIcon() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 flex flex-col items-center">
        <motion.div 
          className="w-full h-0.5 bg-blue-900"
          whileHover={{ scaleX: 1.1 }}
        />
        <div className="py-1 text-sm font-playfair tracking-[0.2em] text-blue-900 font-bold">
          MENU
        </div>
        <motion.div 
          className="w-full h-0.5 bg-blue-900"
          whileHover={{ scaleX: 1.1 }}
        />
      </div>
    </div>
  );
}
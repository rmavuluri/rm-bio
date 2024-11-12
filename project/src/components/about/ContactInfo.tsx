import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: "Email", value: "ramesh.mavuluri.info@gmail.com" },
  { icon: Github, label: "GitHub", value: "github.com/rmavuluri" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/rmavuluri" },
  { icon: MapPin, label: "Location", value: "Florida, United States" }
];

export default function ContactInfo() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16"
    >
      <h2 className="text-4xl font-playfair text-sky-400 mb-8">Contact Information</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {contactInfo.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 bg-gray-800/30 p-6 rounded-lg border border-sky-500/20"
            >
              <div className="w-10 h-10 bg-sky-500/10 rounded-full border-2 border-sky-400 flex items-center justify-center">
                <Icon className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h3 className="text-sm text-gray-400">{item.label}</h3>
                <p className="text-gray-200">{item.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
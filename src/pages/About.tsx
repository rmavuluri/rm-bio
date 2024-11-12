import React from 'react';
import { motion } from 'framer-motion';
import HomeButton from '../components/HomeButton';
import Introduction from '../components/about/Introduction';
import ProfessionalJourney from '../components/about/ProfessionalJourney';
import CoreSkills from '../components/about/CoreSkills';
import NotableProjects from '../components/about/NotableProjects';
import ContactInfo from '../components/about/ContactInfo';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24"
    >
      <HomeButton />
      <div className="max-w-4xl mx-auto px-6">
        <Introduction />
        <ProfessionalJourney />
        <CoreSkills />
        <NotableProjects />
        <ContactInfo />
      </div>
    </motion.div>
  );
}
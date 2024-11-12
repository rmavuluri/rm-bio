import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const journey = [
  {
    title: "Software Developer Systems @Tata Consultancy Services Ltd",
    period: "APR 2022 - Present",
    role: "Delivery Lead"
  },
  {
    title: "Lead Consultant @Virtusa Corporation",
    period: "JUN 2014 - MAR 2022",
    role: "Team Lead"
  },
  {
    title: "Technology Analyst @Infosys Ltd",
    period: "DEC 2011 - MAY 2014",
    role: "Sr. Developer"
  },
  {
    title: "Associte - Projects@Cognizant Technology Solutions India Pvt Ltd",
    period: "DEC 2007 - NOV 2011",
    role: "Developer"
  }
];

export default function ProfessionalJourney() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16"
    >
      <h2 className="text-4xl font-playfair text-sky-400 mb-8 pb-2 border-b border-sky-400/20">Professional Journey</h2>
      <div className="space-y-6">
        {journey.map((item, index) => (
          <motion.div
            key={item.role}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
            <div className="relative flex gap-4 bg-gray-900/90 p-6 rounded-lg border border-sky-400/20 hover:border-sky-400/40 transition-all duration-300">
              <div className="mt-1">
                <div className="w-10 h-10 bg-sky-500/10 rounded-full border-2 border-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-5 h-5 text-sky-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl text-gray-200 font-medium">{item.title}</h3>
                <p className="text-sky-400 text-sm mt-1">{item.period}</p>
                <p className="text-gray-400 mt-2">{item.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
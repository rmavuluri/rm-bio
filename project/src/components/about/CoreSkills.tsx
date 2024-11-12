import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Programming & Frameworks & Tools",
    skills: "Java, Spring Boot, Angular, React, Node.js, TypeScript, Terraform, Python, Docker, Apache Kafka, Tailwind"
  },
  {
    title: "Cloud & DevOps",
    skills: "AWS (MSK, IAM, Glue, ECS, EC2, S3, Lambda, EVent Bridge, Sink Connectors, Secrets Manager, Cloud Watch ), Docker, Jenkins, GitLab"
  },
  {
    title: "Database",
    skills: "MySQL, PostgreSQL, MongoDB"
  },
  {
    title: "Monitoring & Analytics",
    skills: "Grafana, Prometheus, Cruise Control, Cloud Watch"
  }
];

export default function CoreSkills() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16"
    >
      <h2 className="text-4xl font-playfair text-sky-400 mb-8 pb-2 border-b border-sky-400/20">Core Skills and Expertise</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
            <div className="relative bg-gray-900/90 p-6 rounded-lg border border-sky-400/20 hover:border-sky-400/40 transition-all duration-300">
              <h3 className="text-xl text-gray-200 font-medium mb-3">{category.title}</h3>
              <p className="text-gray-400">{category.skills}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
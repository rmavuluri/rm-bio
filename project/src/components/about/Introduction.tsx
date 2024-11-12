import React from 'react';
import { motion } from 'framer-motion';

export default function Introduction() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16"
    >
      <br/>
      <h1 className="text-4xl font-playfair text-sky-400 mb-8 pb-2 border-b border-sky-400/20">Introduction</h1>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
        <div className="relative space-y-4 bg-gray-900/90 p-6 rounded-lg border border-sky-400/20 hover:border-sky-400/40 transition-all duration-300">
          <h2 className="text-2xl font-playfair text-gray-200">Ramesh Mavuluri</h2>
          <p className="text-gray-300 leading-relaxed">
            Hello, my name is Ramesh Mavuluri, I have over sixteen years of experience in the software industry, started my career with Java and Java-related technologies. I have worked on numerous projects for various clients, extensively using the Java ecosystem and the Spring Framework. Over time, I expanded my expertise to include UI technologies such as Angular and React. This transition allowed me to gain a comprehensive understanding of both backend and frontend development. Recently, I have shifted my focus to cloud technologies, and I am currently building a platform using AWS services. This diverse experience has equipped me with a holistic view of software development, making me well-prepared for this role.
          </p><p className="text-gray-300 leading-relaxed">
Outside of my professional commitments, I enjoy spending quality time with my children and dedicating myself to personal projects, which allows me to continually evolve and apply my technical skills in diverse contexts.

I'm good at deploying and handling cloud apps, mainly on AWS. I use tools like Terraform for efficient resource handling. I can also develop front-end apps, easily switching between Angular and React.
          </p><p className="text-gray-300 leading-relaxed">
As a delivery lead, I guide development teams and mentor new engineers. I communicate well, working closely with different teams to meet project targets. I'm always looking for ways to improve and innovate.

Recently, I led the development of a Kafka platform on AWS using Terraform. It combines many AWS services and has greatly helped our clients, boosting our sales.

I'm excited to bring my skills and experience to your team. I aim to create top-notch software and thank you for considering me for this role.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
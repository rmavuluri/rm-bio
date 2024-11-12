import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import HomeButton from '../components/HomeButton';
import { toast, Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/rmavuluri' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rmavuluri/' },
  { icon: Twitter, label: 'Twitter', href: 'https://x.com/rmavuluri' },
];

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'ramesh.mavuluri.info@gmail.com'
      };

      await emailjs.send(
        'service_bhi2quk',
        'template_kw9zjzh',
        templateParams,
        '19X25XMKvU39N-k9M'
      );

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24"
    >
      <HomeButton />
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-6xl font-playfair mb-12">Contact</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 font-inter">
              Let's connect! Feel free to reach out through any of these platforms:
            </p>
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <link.icon className="w-6 h-6 mr-4 text-white" />
                  <span className="text-lg font-inter text-white">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <h2 className="text-2xl font-playfair mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md focus:ring-2 focus:ring-white/30 focus:border-transparent text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md focus:ring-2 focus:ring-white/30 focus:border-transparent text-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md focus:ring-2 focus:ring-white/30 focus:border-transparent text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
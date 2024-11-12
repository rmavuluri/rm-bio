import { useState } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import WelcomeMessage from './components/WelcomeMessage';
import ScrollButtons from './components/ScrollButtons';
import SectionNumber from './components/SectionNumber';
import MenuIcon from './components/MenuIcon';
import About from './pages/About';
import Technologies from './pages/Technologies';
import TechnologyDetail from './pages/TechnologyDetail';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Section from './components/Section';

function MainContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const sections = [
    {
      id: "about",
      title: "About Me",
      description: "Discover my journey, expertise, and professional experience in software development",
      pattern: "M15 15h30v30H15z"
    },
    {
      id: "technologies",
      title: "Technologies",
      description: "Explore the tools, frameworks, and technologies I work with",
      pattern: "M30 30l-20 20h40l-20-20z"
    },
    {
      id: "blog",
      title: "Blog",
      description: "Read my thoughts and insights on software development and technology",
      pattern: "M30 30m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0"
    },
    {
      id: "contact",
      title: "Contact",
      description: "Get in touch with me for collaborations or opportunities",
      pattern: "M15 15L45 45M15 45L45 15"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <header className="fixed w-full top-0 z-30 bg-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            onClick={() => navigate('/')}
            className="cursor-pointer"
          >
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold font-playfair tracking-[0.5em] text-blue-900 uppercase"
            >
              Ramesh Mavuluri
            </motion.h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:opacity-80 rounded transition-opacity"
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={(page) => {
          navigate(`/${page}`);
          setIsSidebarOpen(false);
        }}
      />

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/technologies" element={<Technologies />} />
        <Route path="/technology/:id" element={<TechnologyDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={
          <>
            <SectionNumber />
            <ScrollButtons />
            <main className="relative pt-20">
              <section className="min-h-screen relative flex items-center justify-center py-16 px-6 border-b border-sky-400/20">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCAyOCAwIDEgMCA1NiAwYTI4IDI4IDAgMSAwLTU2IDB6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4=')] opacity-50"></div>
                <WelcomeMessage />
              </section>

              {sections.map((section, index) => (
                <Section
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  description={section.description}
                  onClick={() => navigate(`/${section.id}`)}
                  pattern={section.pattern}
                  index={index}
                />
              ))}
            </main>
          </>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;
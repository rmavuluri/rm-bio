import React from 'react';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: 1, title: 'About Me', page: 'about' },
  { id: 2, title: 'Technologies', page: 'technologies' },
  { id: 3, title: 'Blog', page: 'blog' },
  { id: 4, title: 'Contact', page: 'contact' },
];

export default function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
  return (
    <>
      <div
        className={`overlay fixed inset-0 bg-black/30 backdrop-blur-sm z-40 ${
          isOpen ? 'open' : ''
        }`}
        onClick={onClose}
      />
      <div
        className={`sidebar fixed top-0 left-0 h-full w-1/2 bg-gradient-to-br from-gray-900 to-black z-50 p-8 shadow-2xl ${
          isOpen ? 'open' : ''
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-sky-400/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-sky-400" />
        </button>
        
        <nav className="mt-16">
          <ul className="space-y-6">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.page)}
                  className="text-xl font-medium text-gray-300 hover:text-sky-400 transition-all font-playfair block py-3 w-full text-left border-b border-sky-400/20 hover:border-sky-400 hover:pl-4 hover:bg-sky-400/5 rounded-sm"
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
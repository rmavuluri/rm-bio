import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Trash2 } from 'lucide-react';
import { Project } from '../utils/projectService';
import { toast } from 'react-hot-toast';

interface ProjectSliderProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export default function ProjectSlider({ project, isOpen, onClose, onSave, onDelete }: ProjectSliderProps) {
  const [editedProject, setEditedProject] = useState<Project>(project);

  const handleSave = () => {
    if (!editedProject.title || !editedProject.description || !editedProject.responsibilities) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      onSave(editedProject);
      toast.success('Project saved successfully');
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        onDelete(project.id);
        toast.success('Project deleted successfully');
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: isOpen ? 0 : '-100%' }}
      transition={{ type: 'spring', damping: 20 }}
      className="fixed top-0 left-0 w-full h-[90vh] bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl z-50 overflow-y-auto rounded-b-xl border-b border-sky-400/20"
    >
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-playfair text-sky-400">
            {project.id === 'new' ? 'Add New Project' : 'Edit Project'}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-sky-400/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-sky-400" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
            <input
              type="text"
              value={editedProject.title}
              onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
            <textarea
              value={editedProject.description}
              onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Roles & Responsibilities *</label>
            <textarea
              value={editedProject.responsibilities}
              onChange={(e) => setEditedProject({ ...editedProject, responsibilities: e.target.value })}
              rows={6}
              placeholder="Enter your roles and responsibilities..."
              className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
              required
            />
            <p className="text-sm text-gray-400 mt-1">
              Tip: Use bullet points (•) or numbers for better readability
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
              <input
                type="text"
                value={editedProject.company}
                onChange={(e) => setEditedProject({ ...editedProject, company: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                  focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Client</label>
              <input
                type="text"
                value={editedProject.client}
                onChange={(e) => setEditedProject({ ...editedProject, client: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                  focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <input
                type="text"
                value={editedProject.role}
                onChange={(e) => setEditedProject({ ...editedProject, role: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                  focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
              <input
                type="text"
                value={editedProject.duration}
                onChange={(e) => setEditedProject({ ...editedProject, duration: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                  focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <input
              type="text"
              value={editedProject.location}
              onChange={(e) => setEditedProject({ ...editedProject, location: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Technologies</label>
            <input
              type="text"
              value={editedProject.tech}
              onChange={(e) => setEditedProject({ ...editedProject, tech: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
            <select
              value={editedProject.icon}
              onChange={(e) => setEditedProject({ ...editedProject, icon: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800/50 border border-sky-400/20 rounded-lg 
                focus:ring-2 focus:ring-sky-400/40 focus:border-transparent text-white"
            >
              <option value="Globe">Globe</option>
              <option value="Shield">Shield</option>
              <option value="Search">Search</option>
              <option value="Cloud">Cloud</option>
              <option value="Smartphone">Smartphone</option>
            </select>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSave}
              className="flex-1 bg-sky-500/10 text-white py-3 px-4 rounded-lg 
                hover:bg-sky-500/20 transition-colors border border-sky-400/20 
                hover:border-sky-400/40 font-medium flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
            {project.id !== 'new' && (
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500/10 text-red-400 py-3 px-4 rounded-lg 
                  hover:bg-red-500/20 transition-colors border border-red-400/20 
                  hover:border-red-400/40 font-medium flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Delete Project
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, Search, Cloud, Smartphone, Plus, Edit } from 'lucide-react';
import ProjectSlider from '../ProjectSlider';
import { Project, readProjects, saveProject, deleteProject, addProject, generateProjectId } from '../../utils/projectService';
import { toast } from 'react-hot-toast';

const iconMap: { [key: string]: any } = {
  Globe,
  Shield,
  Search,
  Cloud,
  Smartphone
};

export default function NotableProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const loadedProjects = await readProjects();
    setProjects(loadedProjects);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsSliderOpen(true);
  };

  const handleAdd = () => {
    const newProject: Project = {
      id: 'new',
      title: "",
      description: "",
      tech: "",
      duration: "",
      company: "",
      client: "",
      role: "",
      location: "",
      icon: "Globe",
      responsibilities: ""
    };
    setSelectedProject(newProject);
    setIsSliderOpen(true);
  };

  const handleSave = async (updatedProject: Project) => {
    try {
      if (updatedProject.id === 'new') {
        const projectWithNewId = { ...updatedProject, id: generateProjectId() };
        await addProject(projectWithNewId);
      } else {
        await saveProject(updatedProject);
      }
      await loadProjects();
      setIsSliderOpen(false);
      setSelectedProject(null);
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      await loadProjects();
      setIsSliderOpen(false);
      setSelectedProject(null);
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16 relative"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-playfair text-sky-400 pb-2 border-b border-sky-400/20">Notable Projects</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-sky-500/10 rounded-lg 
            hover:bg-sky-500/20 transition-colors border border-sky-400/20 
            hover:border-sky-400/40 text-sky-400"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 mb-4">No projects added yet.</p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500/10 rounded-lg 
              hover:bg-sky-500/20 transition-colors border border-sky-400/20 
              hover:border-sky-400/40 text-sky-400"
          >
            <Plus className="w-5 h-5" />
            Add Your First Project
          </button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {projects.map((project, index) => {
            const Icon = iconMap[project.icon] || Globe;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
                <div className="relative flex gap-4 bg-gray-900/90 p-6 rounded-lg border border-sky-400/20 hover:border-sky-400/40 transition-all duration-300">
                  <button
                    onClick={() => handleEdit(project)}
                    className="absolute top-4 right-4 p-2 bg-sky-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-sky-400/20"
                  >
                    <Edit className="w-5 h-5 text-sky-400" />
                  </button>
                  <div className="mt-1">
                    <div className="w-10 h-10 bg-sky-500/10 rounded-full border-2 border-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-sky-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl text-gray-200 font-medium">{project.title}</h3>
                      <span className="text-sm text-sky-400">{project.duration}</span>
                    </div>
                    <p className="text-gray-400 mb-3">{project.description}</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-sky-400">
                        <span className="text-gray-400">Role:</span> {project.role} at {project.company}
                      </p>
                      <p className="text-sky-400">
                        <span className="text-gray-400">Client:</span> {project.client}
                      </p>
                      <p className="text-sky-400">
                        <span className="text-gray-400">Location:</span> {project.location}
                      </p>
                      <p className="text-sky-400">
                        <span className="text-gray-400">Tech Stack:</span> {project.tech}
                      </p>
                      {project.responsibilities && (
                        <div className="mt-3">
                          <p className="text-gray-400 mb-2">Responsibilities:</p>
                          <p className="text-gray-300 whitespace-pre-line">{project.responsibilities}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {selectedProject && (
        <ProjectSlider
          project={selectedProject}
          isOpen={isSliderOpen}
          onClose={() => {
            setIsSliderOpen(false);
            setSelectedProject(null);
          }}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </motion.section>
  );
}
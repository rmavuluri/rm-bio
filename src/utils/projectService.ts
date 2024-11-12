import { toast } from 'react-hot-toast';
import { readJsonFile, writeJsonFile } from './fileService';

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string;
  duration: string;
  company: string;
  client: string;
  role: string;
  location: string;
  icon: string;
  responsibilities: string;
}

interface ProjectData {
  projects: Project[];
}

export const readProjects = async (): Promise<Project[]> => {
  try {
    const data = readJsonFile<ProjectData>('projects.json');
    return data.projects || [];
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
};

export const saveProject = async (updatedProject: Project): Promise<void> => {
  try {
    const data = readJsonFile<ProjectData>('projects.json');
    const index = data.projects.findIndex(p => p.id === updatedProject.id);
    
    if (index === -1) {
      throw new Error('Project not found');
    }

    data.projects[index] = updatedProject;
    writeJsonFile('projects.json', data);
    toast.success('Project updated successfully!');
  } catch (error) {
    console.error('Error saving project:', error);
    toast.error('Failed to save project');
    throw error;
  }
};

export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    const data = readJsonFile<ProjectData>('projects.json');
    data.projects = data.projects.filter(p => p.id !== projectId);
    writeJsonFile('projects.json', data);
    toast.success('Project deleted successfully!');
  } catch (error) {
    console.error('Error deleting project:', error);
    toast.error('Failed to delete project');
    throw error;
  }
};

export const addProject = async (newProject: Project): Promise<void> => {
  try {
    const data = readJsonFile<ProjectData>('projects.json');
    data.projects = [...(data.projects || []), newProject];
    writeJsonFile('projects.json', data);
    toast.success('Project added successfully!');
  } catch (error) {
    console.error('Error adding project:', error);
    toast.error('Failed to add project');
    throw error;
  }
};

export const generateProjectId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
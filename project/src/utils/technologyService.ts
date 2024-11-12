export interface Technology {
  id: string;
  title: string;
  skills: Array<{
    id: string;
    name: string;
  }>;
}

const defaultTechnologies: Technology[] = [
  {
    id: '1',
    title: 'Frontend',
    skills: [
      { id: 'fe1', name: 'HTML5' },
      { id: 'fe2', name: 'CSS3' },
      { id: 'fe3', name: 'JavaScript' },
      { id: 'fe4', name: 'TypeScript' },
      { id: 'fe5', name: 'React' },
      { id: 'fe6', name: 'Angular' },
      { id: 'fe7', name: 'Vue.js' },
      { id: 'fe8', name: 'Tailwind CSS' },
    ],
  },
  {
    id: '2',
    title: 'Backend and Cloud',
    skills: [
      { id: 'be1', name: 'Node.js' },
      { id: 'be2', name: 'Express' },
      { id: 'be3', name: 'Python' },
      { id: 'be4', name: 'Django' },
      { id: 'be5', name: 'AWS' },
      { id: 'be6', name: 'Azure' },
    ],
  },
  {
    id: '3',
    title: 'Database',
    skills: [
      { id: 'db1', name: 'MongoDB' },
      { id: 'db2', name: 'PostgreSQL' },
      { id: 'db3', name: 'MySQL' },
      { id: 'db4', name: 'Redis' },
    ],
  },
  {
    id: '4',
    title: 'DevOps',
    skills: [
      { id: 'do1', name: 'Docker' },
      { id: 'do2', name: 'Kubernetes' },
      { id: 'do3', name: 'Jenkins' },
      { id: 'do4', name: 'GitHub Actions' },
    ],
  },
];

let technologies = [...defaultTechnologies];

export const readTechnologies = async (): Promise<Technology[]> => {
  return technologies;
};

export const saveTechnology = async (updatedTechnology: Technology): Promise<void> => {
  technologies = technologies.map(tech => 
    tech.id === updatedTechnology.id ? updatedTechnology : tech
  );
};

export const generateSkillId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
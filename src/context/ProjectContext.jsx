import { createContext, useState, useContext } from 'react';
import { dummyProjects } from '../data/dummyData';

const ProjectContext = createContext();

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(dummyProjects);

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: projects.length + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProjects([...projects, newProject]);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

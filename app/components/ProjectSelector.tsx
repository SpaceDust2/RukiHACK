import React from 'react';

interface Project {
  id: number;
  name: string;
  developerId: number;
}

interface ProjectSelectorProps {
  projects: Project[];
  onSelect: (projectId: number, developerId: number) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ projects, onSelect }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Выберите проект</h2>
      <select 
        onChange={(e) => {
          const projectId = parseInt(e.target.value);
          const project = projects.find(p => p.id === projectId);
          if (project) {
            onSelect(project.id, project.developerId);
          }
        }} 
        className="p-2 border rounded"
      >
        <option value="">Выберите проект</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelector;
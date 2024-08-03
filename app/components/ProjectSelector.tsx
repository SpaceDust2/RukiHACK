import React from 'react';

interface ProjectSelectorProps {
  projects: { id: string; name: string }[];
  onSelect: (projectId: string) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ projects, onSelect }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Выберите проект</h2>
      <select onChange={(e) => onSelect(e.target.value)} className="p-2 border rounded">
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

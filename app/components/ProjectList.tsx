'use client'
import React, { useEffect, useState } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  developer: {
    id: number;
    name: string;
  };
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Error fetching projects');
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Проекты</h2>
      {projects.length === 0 ? (
        <p>Нет доступных проектов.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="border p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p>{project.description}</p>
              <p className="text-sm text-gray-600">Developer: {project.developer.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;
import React, { useEffect, useState } from 'react';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Error fetching projects');
        }
        const data = await response.json();
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
          {projects.map((project: any) => (
            <li key={project.id} className="border p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p>{project.description}</p>
              <p className="text-sm text-gray-600">Developer: {project.developer?.name || 'N/A'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;

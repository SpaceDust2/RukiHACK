import React from 'react';
import { notFound } from 'next/navigation';
import { getProjectData } from '@/app/server/getProjectData'; // Импортируем серверный компонент
import CreateTaskForm from '@/app/components/CreateTaskForm'; // Компонент формы для создания задания
import TaskList from '@/app/components/TaskList'; // Компонент для отображения списка заданий

const ProjectTasks: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const project = await getProjectData(parseInt(params.id));

  if (!project) return <p>Project not found.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{project.name} - Задания</h1>
      <CreateTaskForm projectId={project.id} /> {/* Компонент формы для создания задания */}
      <div className="mt-8">
        <TaskList tasks={project.orders} /> {/* Компонент для отображения списка заданий */}
      </div>
    </div>
  );
};

export default ProjectTasks;

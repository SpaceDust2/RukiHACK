"use client"
import React from 'react';
import CreateProjectForm from '@/app/components/CreateProjectForm'; // Компонент формы для добавления проекта
import ProjectList from '@/app/components/ProjectList'; // Компонент списка проектов
import Sidebar from '../components/Sidebar';

const ProjectsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Список проектов</h1>
      <CreateProjectForm /> {/* Компонент формы для добавления нового проекта */}
      <div className="mt-8">
        <ProjectList /> {/* Компонент для отображения списка проектов */}
      </div>
    </div>
  );
};

export default ProjectsPage;

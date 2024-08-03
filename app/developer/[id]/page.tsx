import React from 'react';
import { notFound } from 'next/navigation';
import { getDeveloperData } from '@/app/server/getDeveloperData';
import Link from 'next/link';
import Sidebar from '@/app/components/Sidebar';

const DeveloperProfile: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const developerId = parseInt(params.id);
  if (isNaN(developerId)) return <p className="text-red-500 text-center text-xl mt-10">Invalid Developer ID.</p>;

  const developer = await getDeveloperData(developerId);

  if (!developer) return <p className="text-red-500 text-center text-xl mt-10">Developer not found.</p>;

  const totalTasks = developer.projects.flatMap(project => project.orders).length;
  const inProgressTasks = developer.projects.flatMap(project => project.orders.filter((order: any) => order.status === 'IN_PROGRESS')).length;
  const completedTasks = developer.projects.flatMap(project => project.orders.filter((order: any) => order.status === 'COMPLETED')).length;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{developer.name}</h1>
          <div className="text-gray-600 mb-6">
            <p><span className="font-semibold">Email:</span> {developer.email}</p>
            <p><span className="font-semibold">Опыт:</span> {developer.experience} лет</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-500 text-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Общее количество задач</h3>
            <p className="text-3xl font-bold">{totalTasks}</p>
          </div>
          <div className="bg-yellow-500 text-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">В процессе выполнения</h3>
            <p className="text-3xl font-bold">{inProgressTasks}</p>
          </div>
          <div className="bg-green-500 text-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Выполнено</h3>
            <p className="text-3xl font-bold">{completedTasks}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Проекты</h2>
          {developer.projects.length === 0 ? (
            <p className="text-gray-600">Нет проектов.</p>
          ) : (
            <ul className="space-y-4">
              {developer.projects.map((project: any) => (
                <li key={project.id} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link href={`/projects/${project.id}`} className="text-blue-600 hover:underline">
                      {project.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600">{project.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Для работы с маршрутизацией

const CreateProjectForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [developerId, setDeveloperId] = useState<number | ''>('');
  const router = useRouter(); // Для перезагрузки данных после отправки формы

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, developerId }),
      });
      
      // Перезагрузка данных
      router.refresh();
    } catch (error) {
      console.error('Failed to create project:', error);
    }

    // Очистка формы
    setName('');
    setDescription('');
    setDeveloperId('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Developer ID"
        value={developerId}
        onChange={(e) => setDeveloperId(Number(e.target.value))}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow"
      >
        Создать проект
      </button>
    </form>
  );
};

export default CreateProjectForm;

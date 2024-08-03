'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateTaskForm: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('OPEN'); // Статус по умолчанию
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, status, projectId }),
      });
      
      router.refresh();
    } catch (error) {
      console.error('Failed to create task:', error);
    }

    setTitle('');
    setDescription('');
    setStatus('OPEN');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="OPEN">Open</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow"
      >
        Создать задание
      </button>
    </form>
  );
};

export default CreateTaskForm;

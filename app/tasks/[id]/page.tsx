"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { atom, useAtom } from "jotai";

interface Response {
  id: number;
  name: string;
  email: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  responses: Response[];
  workers: Response[];
}

const taskAtom = atom<Task | null>(null);
const isLoadingAtom = atom(true);
const errorAtom = atom<string | null>(null);

const TaskDetails: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [task, setTask] = useAtom(taskAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const taskId = parseInt(params.id);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/tasks/${taskId}`);
        if (!response.ok) {
          throw new Error("Ошибка при загрузке информации о задаче");
        }
        const data = await response.json();
        setTask(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Не удалось загрузить информацию о задаче:", error);
        setError("Произошла ошибка при загрузке информации о задаче");
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [taskId, setTask, setIsLoading, setError]);

  if (isLoading) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (!task) {
    return <div className="text-center py-8">Задача не найдена</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{task.title}</h1>
          <div className="text-gray-600 mb-6">
            <p><span className="font-semibold">Описание:</span> {task.description}</p>
            <p><span className="font-semibold">Дата создания:</span> {new Date(task.createdAt).toLocaleDateString()}</p>
            <p><span className="font-semibold">Статус:</span> {task.status}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Отклики</h2>
          {task.responses.length === 0 ? (
            <p className="text-gray-600">Нет откликов.</p>
          ) : (
            <ul className="space-y-4">
              {task.responses.map((response) => (
                <li key={response.id} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition duration-300">
                  <div className="text-sm font-medium text-gray-900">{response.name}</div>
                  <div className="text-sm text-gray-500">{response.email}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Работники</h2>
          {task.workers.length === 0 ? (
            <p className="text-gray-600">Нет работников.</p>
          ) : (
            <ul className="space-y-4">
              {task.workers.map((worker) => (
                <li key={worker.id} className="border border-gray-200 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">{worker.name}</div>
                  <div className="text-sm text-gray-500">{worker.email}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;

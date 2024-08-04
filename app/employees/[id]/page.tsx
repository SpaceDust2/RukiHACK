// app/employees/[id]/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Order {
  id: number;
  title: string;
  description: string;
  cost: number;
  project: {
    id: number;
    name: string;
  };
  currentStatus: string;
}

interface Employee {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  orders: Order[];
  reviews: Review[];
}

const EmployeeProfile: React.FC = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`/api/employees/${id}`);
        if (!response.ok) throw new Error('Не удалось загрузить данные сотрудника');
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <div>Загрузка...</div>;

  const translateStatus = (status: string) => {
    const statusMap: {[key: string]: string} = {
      'Unknown': 'Неизвестно',
      'In Progress': 'В процессе',
      'Completed': 'Завершено',
      'Cancelled': 'Отменено'
      // Добавьте другие статусы по мере необходимости
    };
    return statusMap[status] || status;
  };

  const averageRating = employee.reviews.length > 0
    ? employee.reviews.reduce((sum, review) => sum + review.rating, 0) / employee.reviews.length
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{employee.name}</h1>
          <p className="text-gray-600 mb-4">{employee.email}</p>
          <p className="text-sm text-gray-500">Сотрудник с {new Date(employee.createdAt).toLocaleDateString('ru-RU')}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Текущие заказы</h2>
          {employee.orders.length > 0 ? (
            <ul className="bg-white shadow-lg rounded-lg divide-y divide-gray-200">
              {employee.orders.map(order => (
                <li key={order.id} className="px-6 py-4">
                  <a href={`/orders/${order.id}`} className="text-blue-500 hover:underline font-semibold">
                    {order.title}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Проект: {order.project.name}</p>
                  <p className="text-sm text-gray-600">Стоимость: {order.cost.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</p>
                  <p className="text-sm text-gray-600">Статус: {translateStatus(order.currentStatus)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">У сотрудника нет текущих заказов.</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Отзывы</h2>
          {employee.reviews.length > 0 ? (
            <div>
              <p className="text-xl font-semibold mb-2">
                Средняя оценка: {averageRating.toFixed(1)} из 5
              </p>
              <ul className="bg-white shadow-lg rounded-lg divide-y divide-gray-200">
                {employee.reviews.map(review => (
                  <li key={review.id} className="px-6 py-4">
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="font-semibold">{review.rating}/5</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600">У сотрудника пока нет отзывов.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
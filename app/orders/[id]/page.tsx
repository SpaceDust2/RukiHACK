// app/orders/[id]/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface OrderHistory {
  id: number;
  status: string;
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
  developer: {
    id: number;
    name: string;
    email: string;
  };
  employee: {
    id: number;
    name: string;
    email: string;
  } | null;
  history: OrderHistory[];
  currentStatus: string;
}
interface EditOrderForm extends Omit<Order, 'id' | 'project' | 'developer' | 'employee' | 'history'> {
    projectId: number;
    developerId: number;
    employeeId: number | null;
  }
  
  const OrderPage: React.FC = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<EditOrderForm | null>(null);
  
    useEffect(() => {
      const fetchOrder = async () => {
        try {
          const response = await fetch(`/api/orders/${id}`);
          if (!response.ok) throw new Error('Не удалось загрузить заказ');
          const data = await response.json();
          setOrder(data);
          setEditForm({
            title: data.title,
            description: data.description,
            cost: data.cost,
            currentStatus: data.currentStatus,
            projectId: data.project.id,
            developerId: data.developer.id,
            employeeId: data.employee?.id || null,
          });
        } catch (error) {
          console.error('Ошибка:', error);
        }
      };
  
      fetchOrder();
    }, [id]);
  
    if (!order) return <div>Загрузка...</div>;
  
    const translateStatus = (status: string) => {
      const statusMap: {[key: string]: string} = {
        'Unknown': 'Неизвестно',
        'In Progress': 'В процессе',
        'Completed': 'Завершено',
        'Cancelled': 'Отменено'
      };
      return statusMap[status] || status;
    };
  
    const handleEditSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editForm) return;
  
      try {
        const response = await fetch(`/api/orders/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editForm),
        });
  
        if (!response.ok) throw new Error('Не удалось обновить заказ');
  
        const updatedOrder = await response.json();
        setOrder(updatedOrder);
        setIsEditing(false);
      } catch (error) {
        console.error('Ошибка при обновлении заказа:', error);
      }
    };
  
    return (
      <div className="container mx-auto px-4 py-8">
        {!isEditing ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">{order.title}</h1>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Редактировать
              </button>
            </div>
            <p className="mb-4">{order.description}</p>
            <p className="mb-4">Стоимость: {order.cost.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</p>
            <p className="mb-4">Текущий статус: {translateStatus(order.currentStatus)}</p>
            
            <h2 className="text-2xl font-bold mb-2">Проект</h2>
            <p className="mb-4">
              <a href={`/projects/${order.project.id}`} className="text-blue-500 hover:underline">
                {order.project.name}
              </a>
            </p>
            
            <h2 className="text-2xl font-bold mb-2">Разработчик</h2>
            <p className="mb-4">{order.developer.name} ({order.developer.email})</p>
            
            <h2 className="text-2xl font-bold mb-2">Сотрудник</h2>
            {order.employee ? (
              <p className="mb-4">{order.employee.name} ({order.employee.email})</p>
            ) : (
              <p className="mb-4">Сотрудник не назначен</p>
            )}
            
            <h2 className="text-2xl font-bold mb-2">История заказа</h2>
            <ul>
              {order.history.map(item => (
                <li key={item.id} className="mb-2">
                  {translateStatus(item.status)} - {new Date(item.createdAt).toLocaleString('ru-RU')}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <form onSubmit={handleEditSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Редактирование заказа</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Название
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                value={editForm?.title}
                onChange={(e) => setEditForm(prev => prev ? {...prev, title: e.target.value} : null)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Описание
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                value={editForm?.description}
                onChange={(e) => setEditForm(prev => prev ? {...prev, description: e.target.value} : null)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cost">
                Стоимость
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cost"
                type="number"
                value={editForm?.cost}
                onChange={(e) => setEditForm(prev => prev ? {...prev, cost: Number(e.target.value)} : null)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                Статус
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="status"
                value={editForm?.currentStatus}
                onChange={(e) => setEditForm(prev => prev ? {...prev, currentStatus: e.target.value} : null)}
              >
                <option value="Unknown">Неизвестно</option>
                <option value="In Progress">В процессе</option>
                <option value="Completed">Завершено</option>
                <option value="Cancelled">Отменено</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Сохранить
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };
  
  export default OrderPage;
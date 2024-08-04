"use client";
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { refreshOrdersAtom } from '@/atoms';

interface CreateOrderModalProps {
  projectId: number;
  developerId: number;
  onClose: () => void;
  onOrderCreated: () => void;
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({ projectId, developerId, onClose, onOrderCreated }) => {
  const [, setRefreshOrders] = useAtom(refreshOrdersAtom);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [status, setStatus] = useState('NEW');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      projectId,
      developerId,
      title,
      description,
      cost: parseFloat(cost),
      status
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        setRefreshOrders(prev => !prev);
        onOrderCreated();
      } else {
        const errorData = await response.json();
        console.error('Failed to create order:', errorData.error);
        alert(`Failed to create order: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-90vh overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Создать новый заказ</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Название заказа"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 border rounded-lg"
            placeholder="Описание заказа"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            placeholder="Стоимость (руб.)"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
          <select
            className="w-full p-2 border rounded-lg"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="NEW">Новый</option>
            <option value="IN_PROGRESS">В процессе</option>
            <option value="COMPLETED">Завершен</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrderModal;
"use client";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store'; // Подключите корневой тип состояния
import { setDeveloperId } from '@/userSlice'; // Импортируйте action

interface CreateOrderModalProps {
  projectId: string;
  developerId: number | null; // Обновлено для поддержки null
  onClose: () => void;
  onOrderCreated: () => void;
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({ projectId, developerId, onClose, onOrderCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [payment, setPayment] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [requirements, setRequirements] = useState(['']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      projectId,
      developerId: developerId ?? 0, // Используем значение из Redux Store или 0 если не задано
      title,
      description,
      cost: parseFloat(payment),
      status: 'SEARCHING'
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        onOrderCreated();
        onClose();
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

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const updateRequirement = (index: number, value: string) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index] = value;
    setRequirements(updatedRequirements);
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
            placeholder="Оплата (руб.)"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full p-2 border rounded-lg"
            placeholder="Дата начала"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full p-2 border rounded-lg"
            placeholder="Дата окончания"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div>
            <h4 className="font-semibold mb-2">Требования:</h4>
            {requirements.map((req, index) => (
              <input
                key={index}
                type="text"
                className="w-full p-2 border rounded-lg mb-2"
                placeholder={`Требование ${index + 1}`}
                value={req}
                onChange={(e) => updateRequirement(index, e.target.value)}
              />
            ))}
            <button
              type="button"
              onClick={addRequirement}
              className="text-blue-500 hover:text-blue-600 transition duration-200"
            >
              + Добавить требование
            </button>
          </div>
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

import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { refreshOrdersAtom } from '@/atoms';

interface OrderBoardProps {
  projectId: number;
}

const OrderBoard: React.FC<OrderBoardProps> = ({ projectId }) => {
  const [orders, setOrders] = useState([]);
  const [refreshOrders] = useAtom(refreshOrdersAtom);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders?projectId=${projectId}`);
        if (!response.ok) {
          throw new Error('Error fetching orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to load orders:', error);
      }
    };
    fetchOrders();
  }, [projectId, refreshOrders]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Заказы</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="border p-2 mb-2">
            <h3 className="font-bold">{order.title}</h3>
            <p>{order.description}</p>
            <p>Стоимость: {order.cost}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderBoard;

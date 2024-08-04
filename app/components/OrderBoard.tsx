import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { refreshOrdersAtom } from '@/atoms';

interface Order {
  id: string;
  title: string;
  description: string;
  cost: number;
}

interface OrderBoardProps {
  projectId: number;
}

const OrderBoard: React.FC<OrderBoardProps> = ({ projectId }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshOrders] = useAtom(refreshOrdersAtom);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/orders?projectId=${projectId}`);
        if (!response.ok) {
          throw new Error('Error fetching orders');
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        setError('Failed to load orders.');
        console.error('Failed to load orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [projectId, refreshOrders]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Заказы</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="border p-2 mb-2">
            <h3 className="font-bold">{order.title}</h3>
            <p>{order.description}</p>
            <p>Стоимость: {order.cost} руб.</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderBoard;

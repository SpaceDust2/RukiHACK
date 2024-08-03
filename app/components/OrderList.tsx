// components/OrderList.tsx
import React from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  title: string;
  payment: number;
  startDate: string;
  endDate: string;
}

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <Link key={order.id} href={`/order/${order.id}`}>
          <div className="bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out">
            <h3 className="font-semibold text-gray-800">{order.title}</h3>
            <p className="text-sm text-gray-600">
              Оплата: {order.payment} руб.
            </p>
            <p className="text-xs text-gray-500">
              {new Date(order.startDate).toLocaleDateString()} - {order.endDate ? new Date(order.endDate).toLocaleDateString() : 'Не указано'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OrderList;
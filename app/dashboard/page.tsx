"use client"
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { dashboardDataAtom } from '@/atoms';
import MetricsCard from '@/app/components/MetricsCard';
import Chart from '@/app/components/Chart';
import { getDashboardData } from '@/lib/dashboardapi';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useAtom(dashboardDataAtom);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [setDashboardData]);

  const averageRating = dashboardData.developers.reduce((acc, developer) => {
    const reviews = developer.reviews || [];
    return acc + (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length);
  }, 0) / (dashboardData.developers.length || 1);
  
  const totalMessages = dashboardData.messages.length;
  const averageOrderCost = dashboardData.orders.reduce((acc, order) => acc + order.cost, 0) / (dashboardData.orders.length || 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Дашборд
          </h1>
          <p className="text-gray-600">
            Инфографика и метрики
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <MetricsCard title="Количество проектов" value={dashboardData.projects.length} />
          <MetricsCard title="Количество разработчиков" value={dashboardData.developers.length} />
          <MetricsCard title="Количество сотрудников" value={dashboardData.employees.length} />
          <MetricsCard title="Количество заказов" value={dashboardData.orders.length} />
          <MetricsCard title="Средняя оценка разработчиков" value={averageRating.toFixed(2)} />
          <MetricsCard title="Общее количество сообщений" value={totalMessages} />
          <MetricsCard title="Средняя стоимость заказов" value={averageOrderCost.toFixed(2)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
          <Chart data={dashboardData.orders} title="Распределение заказов по статусам" type="pie" />
          <Chart data={dashboardData.developers} title="Средние оценки разработчиков" type="bar" />
          <Chart data={dashboardData.projects} title="Количество заказов по проектам" type="bar" />
          <Chart data={dashboardData.messages} title="Количество обращений (чатов)" type="line" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

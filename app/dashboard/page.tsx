// app/pages/dashboard.tsx
"use client"
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { dashboardDataAtom } from '@/atoms';
import MetricsCard from '@/app/components/MetricsCard';
import Chart from '@/app/components/Chart';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useAtom(dashboardDataAtom);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Error fetching dashboard data');
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [setDashboardData]);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <MetricsCard title="Количество проектов" value={dashboardData.projects.length} />
          <MetricsCard title="Количество разработчиков" value={dashboardData.developers.length} />
          <MetricsCard title="Количество сотрудников" value={dashboardData.employees.length} />
          <MetricsCard title="Количество заказов" value={dashboardData.orders.length} />
        </div>

        <div className="mt-8">
          <Chart data={dashboardData.projects} title="Проекты по разработчикам" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

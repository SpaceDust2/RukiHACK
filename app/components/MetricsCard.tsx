// app/components/MetricsCard.tsx

import React from 'react';

interface MetricsCardProps {
  title: string;
  value: number | string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="text-4xl font-extrabold text-indigo-600">{value}</p>
    </div>
  );
};

export default MetricsCard;

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
  LineElement,
  PointElement,
  LineController,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Регистрация компонентов Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
  LineElement,
  PointElement,
  LineController,
);

const Chart: React.FC<{ data: any[], title: string, type: string }> = ({ data, title, type }) => {
  let chartData;
  let ChartComponent;

  switch (type) {
    case 'pie':
      chartData = {
        labels: [...new Set(data.map(item => item.history?.[0]?.status || 'Unknown'))],
        datasets: [{
          label: 'Orders',
          data: [...new Set(data.map(item => item.history?.[0]?.status || 'Unknown'))].map(status => data.filter(item => item.history?.[0]?.status === status).length),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }]
      };
      ChartComponent = Pie;
      break;
    case 'line':
      chartData = {
        labels: data.map(item => new Date(item.createdAt).toLocaleDateString()),
        datasets: [{
          label: 'Messages',
          data: data.map(item => item.content.length),
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        }]
      };
      ChartComponent = Line;
      break;
    case 'bar':
    default:
      chartData = {
        labels: data.map(item => item.developer?.name || 'Unknown'),
        datasets: [{
          label: type === 'bar' ? 'Projects' : 'Average Rating',
          data: type === 'bar' 
            ? data.map(item => item.orders?.length || 0) 
            : data.map(item => item.reviews ? item.reviews.reduce((a, b) => a + b.rating, 0) / (item.reviews.length || 1) : 0),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      };
      ChartComponent = Bar;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <ChartComponent data={chartData} options={options} />
    </div>
  );
};

export default Chart;

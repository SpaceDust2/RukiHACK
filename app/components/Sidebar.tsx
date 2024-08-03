import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { title: 'Главная', path: '/', icon: '🏠' },
    { title: 'Проекты', path: '/projects', icon: '📁' },
    { title: 'Разработчики', path: '/developers', icon: '👨‍💻' },
    { title: 'Задачи', path: '/tasks', icon: '📝' },
    { title: 'Настройки', path: '/settings', icon: '⚙️' },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link href={item.path}>
                <span
                  className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${
                    router.pathname === item.path ? 'bg-gray-700' : ''
                  }`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
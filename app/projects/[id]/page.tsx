// app/projects/[id]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Employee {
    id: number;
    name: string;
    email: string;
}

interface Order {
    id: number;
    title: string;
    description: string;
    cost: number;
    employee: Employee | null;
}

interface Project {
    id: number;
    name: string;
    description: string;
    developer: {
        id: number;
        name: string;
        email: string;
    };
    groupedOrders: Record<string, Order[]>;
    employees: Employee[];
}

const ProjectPage: React.FC = () => {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`/api/projects/${id}`);
                if (!response.ok)
                    throw new Error("Не удалось загрузить проект");
                const data = await response.json();

                // Удаление дубликатов сотрудников
                const uniqueEmployees = Array.from(
                    new Set(
                        data.orders.map((order: Order) => order.employee?.id)
                    )
                )
                    .map(
                        (id) =>
                            data.orders.find(
                                (order: Order) => order.employee?.id === id
                            )?.employee
                    )
                    .filter(Boolean);

                setProject({
                    ...data,
                    employees: uniqueEmployees,
                });
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };

        fetchProject();
    }, [id]);

    if (!project) return <div>Загрузка...</div>;

    const translateStatus = (status: string) => {
        const statusMap: { [key: string]: string } = {
            Unknown: "Неизвестно",
            "In Progress": "В процессе",
            Completed: "Завершено",
            Cancelled: "Отменено",
            // Добавьте другие статусы по мере необходимости
        };
        return statusMap[status] || status;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
            <p className="mb-4">{project.description}</p>
            <h2 className="text-2xl font-bold mb-2">Разработчик</h2>
            <p className="mb-4">
                {project.developer.name} ({project.developer.email})
            </p>

            <div className="flex">
                <div className="w-3/4 pr-4">
                    <h2 className="text-2xl font-bold mb-2">Заказы</h2>
                    {Object.entries(project.groupedOrders).map(
                        ([status, orders]) => (
                            <div key={status} className="mb-4">
                                <h3 className="text-xl font-semibold mb-2">
                                    {translateStatus(status)}
                                </h3>
                                <ul>
                                    {orders.map((order) => (
                                        <li key={order.id} className="mb-2">
                                            <a
                                                href={`/orders/${order.id}`}
                                                className="text-blue-500 hover:underline"
                                            >
                                                {order.title} -{" "}
                                                {order.cost.toLocaleString(
                                                    "ru-RU",
                                                    {
                                                        style: "currency",
                                                        currency: "RUB",
                                                    }
                                                )}
                                            </a>
                                            {order.employee && (
                                                <span className="ml-2">
                                                    Назначен:
                                                    <a
                                                        href={`/employees/${order.employee.id}`}
                                                        className="text-blue-500 hover:underline ml-1"
                                                    >
                                                        {order.employee.name}
                                                    </a>
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    )}
                </div>

                <div className="w-1/4">
                    <h2 className="text-2xl font-bold mb-2">Сотрудники</h2>
                    <ul>
                        {project.employees.map((employee) => (
                            <li key={employee.id} className="mb-2">
                                <a
                                    href={`/employees/${employee.id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {employee.name}
                                </a>
                                <span className="text-gray-600 ml-1">
                                    ({employee.email})
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;

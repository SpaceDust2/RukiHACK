"use client";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
    projectsAtom,
    selectedProjectIdAtom,
    selectedDeveloperIdAtom,
    refreshOrdersAtom,
} from "@/atoms";
import ProjectSelector from "@/app/components/ProjectSelector";
import OrderBoard from "@/app/components/OrderBoard";
import CreateOrderModal from "@/app/components/CreateOrderModal";

const DeveloperDashboard: React.FC = () => {
    const [projects, setProjects] = useAtom(projectsAtom);
    const [selectedProjectId, setSelectedProjectId] = useAtom(
        selectedProjectIdAtom
    );
    const [selectedDeveloperId, setSelectedDeveloperId] = useAtom(
        selectedDeveloperIdAtom
    );
    const [refreshOrders, setRefreshOrders] = useAtom(refreshOrdersAtom);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                 const response = await fetch("/api/projects");
                if (!response.ok) {
                    throw new Error("Error fetching projects");
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Failed to load projects:", error);
            }
        };
        fetchProjects();
    }, [setProjects]);

    const handleProjectSelect = (projectId: number, developerId: number) => {
        setSelectedProjectId(projectId);
        setSelectedDeveloperId(developerId);
    };

    const handleOrderCreated = () => {
        setIsCreateModalOpen(false);
        setRefreshOrders((prev) => !prev); // Триггер обновления заказов
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                        Панель девелопера
                    </h1>
                    <p className="text-gray-600">
                        Управляйте своими проектами и заказами эффективно
                    </p>
                </header>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Выберите проект
                    </h2>
                    <ProjectSelector
                        projects={projects}
                        onSelect={handleProjectSelect}
                    />
                </div>

                {selectedProjectId !== null && (
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Управление заказами
                            </h2>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-200 transform hover:scale-105"
                                onClick={() => setIsCreateModalOpen(true)}
                            >
                                Создать новый заказ
                            </button>
                        </div>
                        <OrderBoard projectId={selectedProjectId} />
                    </div>
                )}

                {isCreateModalOpen &&
                    selectedProjectId !== null &&
                    selectedDeveloperId !== null && (
                        <CreateOrderModal
                            projectId={selectedProjectId}
                            developerId={selectedDeveloperId}
                            onClose={() => setIsCreateModalOpen(false)}
                            onOrderCreated={handleOrderCreated}
                        />
                    )}
            </div>
        </div>
    );
};

export default DeveloperDashboard;

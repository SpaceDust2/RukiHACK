"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProjects, setSelectedProject } from "@/projectsSlice";
import { RootState } from "@/store";
import Sidebar from "@/app/components/Sidebar";
import ProjectSelector from "@/app/components/ProjectSelector";
import OrderBoard from "@/app/components/OrderBoard";
import CreateOrderModal from "@/app/components/CreateOrderModal";
import { setDeveloperId } from '@/userSlice'; // Импортируем action для обновления developerId

const DeveloperDashboard: React.FC = () => {
    const dispatch = useDispatch();
    const { projects, selectedProjectId } = useSelector(
        (state: RootState) => state.projects
    );
    // const { developerId } = useSelector(
    //     (state: RootState) => state.user // Измените на правильный путь, если у вас другой редуктор
    // ); // Получаем developerId из состояния пользователя
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/projects");
                if (!response.ok) {
                    throw new Error("Error fetching projects");
                }
                const data = await response.json();
                dispatch(setProjects(data));
            } catch (error) {
                console.error("Failed to load projects:", error);
            }
        };
        fetchProjects();
    }, [dispatch]);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <div className="container mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">
                        Панель девелопера
                    </h1>
                    <ProjectSelector
                        projects={projects}
                        onSelect={(id) => dispatch(setSelectedProject(id))}
                    />
                    {selectedProjectId !== null && (
                        <>
                            <button
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-200"
                                onClick={() => setIsCreateModalOpen(true)}
                            >
                                Создать новый заказ
                            </button>
                            <OrderBoard projectId={selectedProjectId} />
                        </>
                    )}
                    {isCreateModalOpen && selectedProjectId !== null && (
                        <CreateOrderModal
                            projectId={selectedProjectId}
                            developerId={developerId ?? 0} // Используем developerId из состояния
                            onClose={() => setIsCreateModalOpen(false)}
                            onOrderCreated={() => {
                                setIsCreateModalOpen(false);
                                // Здесь можно добавить логику для обновления списка заказов
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeveloperDashboard;

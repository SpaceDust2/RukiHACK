"use server";
import prisma from '@/lib/prisma';

export async function getDashboardData() {
    try {
        const totalProjects = await prisma.project.count();
        const totalOrders = await prisma.order.count();
        const activeDevelopers = await prisma.developer.count({ where: { orders: { some: {} } } });
        const uniqueEmployees = await prisma.employee.count();

        const orders = await prisma.order.findMany({
            include: {
                history: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
        });

        const orderStatusDistribution = orders.reduce((acc, order) => {
            const status = order.history[0]?.status || 'Unknown';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        const projectsAndOrdersByDeveloper = await prisma.developer.findMany({
            include: {
                _count: {
                    select: { projects: true, orders: true },
                },
            },
        });

        return {
            totalProjects,
            totalOrders,
            activeDevelopers,
            uniqueEmployees,
            orderStatusDistribution: {
                labels: Object.keys(orderStatusDistribution),
                values: Object.values(orderStatusDistribution),
                title: "Распределение заказов по статусу",
                label: "Количество заказов",
            },
            projectsAndOrdersByDeveloper: {
                labels: projectsAndOrdersByDeveloper.map(dev => dev.name),
                values: projectsAndOrdersByDeveloper.map(dev => dev._count.projects),
                title: "Проекты по разработчикам",
                label: "Количество проектов",
            },
        };
    } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        throw new Error('Failed to fetch dashboard data');
    }
}

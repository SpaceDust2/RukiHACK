import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            include: {
                developer: true,
                orders: {
                    include: {
                        employee: true,
                        history: {
                            orderBy: { createdAt: 'desc' },
                            take: 1,
                        },
                    },
                },
            },
        });

        const developers = await prisma.developer.findMany({
            include: {
                reviews: true,
            },
        });

        const employees = await prisma.employee.findMany();
        const orders = await prisma.order.findMany({
            include: {
                project: true,
                developer: true,
                employee: true,
            },
        });

        const messages = await prisma.message.findMany();

        return NextResponse.json({
            projects,
            developers,
            employees,
            orders,
            messages,
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// app/api/projects/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const projectId = parseInt(params.id);
  if (isNaN(projectId)) return NextResponse.json({ error: 'Invalid Project ID' }, { status: 400 });

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        developer: true,
        orders: {
          include: {
            employee: true,
            history: {
              orderBy: {
                createdAt: 'desc'
              },
              take: 1
            }
          }
        }
      }
    });

    if (!project) return NextResponse.json({ error: 'Project Not Found' }, { status: 404 });

    // Группировка заказов по статусу
    const groupedOrders = project.orders.reduce((acc, order) => {
      const status = order.history[0]?.status || 'Unknown';
      if (!acc[status]) acc[status] = [];
      acc[status].push(order);
      return acc;
    }, {} as Record<string, typeof project.orders>);

    // Получение всех уникальных сотрудников на проекте
    const employees = [...new Set(project.orders.map(order => order.employee).filter(Boolean))];

    return NextResponse.json({
      ...project,
      groupedOrders,
      employees
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
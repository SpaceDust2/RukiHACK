// app/api/employees/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const employeeId = parseInt(params.id);
  if (isNaN(employeeId)) return NextResponse.json({ error: 'Некорректный ID сотрудника' }, { status: 400 });

  try {
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        orders: {
          include: {
            project: true,
            history: {
              orderBy: {
                createdAt: 'desc'
              },
              take: 1
            }
          }
        },
        reviews: true
      }
    });

    if (!employee) return NextResponse.json({ error: 'Сотрудник не найден' }, { status: 404 });

    // Преобразование данных для фронтенда
    const formattedEmployee = {
      ...employee,
      orders: employee.orders.map(order => ({
        ...order,
        currentStatus: order.history[0]?.status || 'Unknown'
      }))
    };

    return NextResponse.json(formattedEmployee);
  } catch (error) {
    console.error('Ошибка при получении данных сотрудника:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
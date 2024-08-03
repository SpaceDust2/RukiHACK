"use server"
import prisma from '@/lib/prisma';

// Функция для получения всех заказов
export async function getOrders() {
  try {
    const orders = await prisma.order.findMany();
    return orders;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw new Error('Failed to fetch orders');
  }
}

export async function createOrder(data: {
    title: string;
    description: string;
    cost: number;
    projectId: number;
    developerId: number;
    status: string;
  }) {
    try {
      const newOrder = await prisma.order.create({
        data: {
          title: data.title,
          description: data.description,
          cost: data.cost,
          projectId: Number(data.projectId),
          developerId: Number(data.developerId),
          status: data.status,
          history: {
            create: {
              status: data.status
            }
          }
        },
        include: {
          project: true,
          developer: true,
          history: true
        }
      });
  
      return newOrder;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  }
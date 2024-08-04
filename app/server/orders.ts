"use server"
import prisma from '@/lib/prisma';

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        project: true,
        developer: true,
        employee: true,
        history: true
      }
    });
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
  status: string;
}) {
  try {
    // Получаем проект, чтобы узнать ID девелопера
    const project = await prisma.project.findUnique({
      where: { id: data.projectId },
      include: { developer: true }
    });

    if (!project || !project.developer) {
      throw new Error('Project or developer not found');
    }

    const newOrder = await prisma.order.create({
      data: {
        title: data.title,
        description: data.description,
        cost: data.cost,
        projectId: data.projectId,
        developerId: project.developer.id,
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
// app/server/chatService.ts

import prisma from '@/lib/prisma';

export async function getChatsForUser(userId: number) {
  const user = await prisma.developer.findUnique({
    where: { id: userId },
    include: {
      projects: {
        include: {
          orders: {
            include: {
              employee: true
            }
          }
        }
      }
    }
  });

  if (user) {
    // Пользователь - разработчик
    return user.projects.flatMap(project => 
      project.orders.map(order => ({
        id: order.employeeId,
        name: order.employee?.name || 'Unknown Employee'
      }))
    );
  } else {
    // Пользователь - работник
    const employee = await prisma.employee.findUnique({
      where: { id: userId },
      include: {
        orders: {
          include: {
            developer: true
          }
        }
      }
    });

    if (employee) {
      return employee.orders.map(order => ({
        id: order.developerId,
        name: order.developer.name
      }));
    }
  }

  return [];
}
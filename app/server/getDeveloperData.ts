"use server"
import prisma from '@/lib/prisma';

export async function getDeveloperData(id: number) {
  try {
    const developer = await prisma.developer.findUnique({
      where: { id },
      include: {
        projects: true,
        orders: {
          include: {
            history: true
          }
        },
        reviews: true
      }
    });

    return developer;
  } catch (error) {
    console.error('Failed to fetch developer data:', error);
    return null;
  }
}
"use server"
import  prisma  from '@/lib/prisma';

export async function getProjectData(id: number) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        orders: {
          include: {
            applicants: true,
          }
        }
      }
    });

    return project || null;
  } catch (error) {
    console.error('Failed to fetch project data:', error);
    return null;
  }
}

"use server";
import prisma from "@/lib/prisma";
  
export async function getDeveloperData(id: number) {
    try {
        // Убедитесь, что идентификатор передается как число
        const developer = await prisma.developer.findUnique({
            where: { id },
            include: {
                projects: {
                    include: {
                        orders: true,
                    },
                },
            },
        });

        console.log("Developer data:", developer); // Добавьте вывод в консоль для отладки

        return developer || null;
    } catch (error) {
        console.error("Failed to fetch developer data:", error);
        return null;
    }
}

// app/server/messageService.ts

import prisma from '@/lib/prisma';

export async function getMessages(chatId: number) {
  return await prisma.message.findMany({
    where: {
      OR: [
        { developerId: chatId },
        { employeeId: chatId }
      ]
    },
    orderBy: {
      createdAt: 'asc'
    }
  });
}

export async function createMessage(data: {
  content: string;
  senderId: number;
  receiverId: number;
  developerId: number;
  employeeId: number;
}) {
  return await prisma.message.create({
    data: {
      content: data.content,
      developer: { connect: { id: data.developerId } },
      employee: { connect: { id: data.employeeId } },
    }
  });
}
// app/api/messages/route.ts

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Retrieve messages for a specific chat
 *     parameters:
 *       - in: query
 *         name: chatId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   content:
 *                     type: string
 *                   senderId:
 *                     type: integer
 *                   receiverId:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *   post:
 *     summary: Create a new message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               senderId:
 *                 type: integer
 *               receiverId:
 *                 type: integer
 *               developerId:
 *                 type: integer
 *               employeeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 content:
 *                   type: string
 *                 senderId:
 *                   type: integer
 *                 receiverId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 */

import { NextRequest, NextResponse } from 'next/server';
import { getMessages, createMessage } from '@/app/server/messageService';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const chatId = searchParams.get('chatId');

  if (!chatId) {
    return NextResponse.json({ error: 'Chat ID is required' }, { status: 400 });
  }

  try {
    const messages = await getMessages(parseInt(chatId));
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, senderId, receiverId, developerId, employeeId } = body;

    if (!content || !senderId || !receiverId || !developerId || !employeeId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const message = await createMessage({
      content,
      senderId,
      receiverId,
      developerId,
      employeeId
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
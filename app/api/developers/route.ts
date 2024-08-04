/**
 * @swagger
 * /api/developers:
 *   get:
 *     summary: Retrieve a list of developers
 *     responses:
 *       200:
 *         description: A list of developers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const developers = await prisma.developer.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });
    return NextResponse.json(developers);
  } catch (error) {
    console.error('Error fetching developers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
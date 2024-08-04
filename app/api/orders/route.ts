import { NextRequest, NextResponse } from 'next/server';
import { getOrders, createOrder } from '@/app/server/orders';

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve a list of orders
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   cost:
 *                     type: number
 *                   projectId:
 *                     type: integer
 *                   developerId:
 *                     type: integer
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                   requirements:
 *                     type: array
 *                     items:
 *                       type: string
 *                   status:
 *                     type: string
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               cost:
 *                 type: number
 *               projectId:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 cost:
 *                   type: number
 *                 projectId:
 *                   type: integer
 *                 developerId:
 *                   type: integer
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                 requirements:
 *                   type: array
 *                   items:
 *                     type: string
 *                 status:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const projectId = parseInt(url.searchParams.get('projectId') || '');

    // Передача projectId в getOrders
    const orders = await getOrders(projectId);
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderData = {
      title: body.title,
      description: body.description,
      cost: Number(body.cost),
      projectId: Number(body.projectId),
      status: body.status
    };
    const newOrder = await createOrder(orderData);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}

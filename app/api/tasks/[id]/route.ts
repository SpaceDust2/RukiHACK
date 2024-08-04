import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const orderId = parseInt(params.id);
  if (isNaN(orderId)) return NextResponse.json({ error: 'Invalid Order ID' }, { status: 400 });

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        project: true,      // To get the associated project details
        developer: true,   // To get the associated developer details
        employee: true,    // To get the associated employee details if any
        history: true      // To include the history of the order
      }
    });

    if (!order) return NextResponse.json({ error: 'Order Not Found' }, { status: 404 });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

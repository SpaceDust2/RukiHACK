// app/api/orders/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const orderId = parseInt(params.id);
    if (isNaN(orderId))
        return NextResponse.json(
            { error: "Invalid Order ID" },
            { status: 400 }
        );

    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                project: true,
                developer: true,
                employee: true,
                history: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });

        if (!order)
            return NextResponse.json(
                { error: "Order Not Found" },
                { status: 404 }
            );

        // Получение текущего статуса заказа
        const currentStatus = order.history[0]?.status || "Unknown";

        return NextResponse.json({
            ...order,
            currentStatus,
        });
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const orderId = parseInt(params.id);
    if (isNaN(orderId))
        return NextResponse.json(
            { error: "Invalid Order ID" },
            { status: 400 }
        );

    try {
        const body = await request.json();
        const {
            title,
            description,
            cost,
            currentStatus,
            projectId,
            developerId,
            employeeId,
        } = body;

        // Обновление основной информации о заказе
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                title,
                description,
                cost,
                project: { connect: { id: projectId } },
                developer: { connect: { id: developerId } },
                employee: employeeId
                    ? { connect: { id: employeeId } }
                    : { disconnect: true },
            },
            include: {
                project: true,
                developer: true,
                employee: true,
                history: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });

        // Добавление новой записи в историю, если статус изменился
        const lastStatus = updatedOrder.history[0]?.status || "Unknown";
        if (currentStatus !== lastStatus) {
            await prisma.orderHistory.create({
                data: {
                    orderId: orderId,
                    status: currentStatus,
                },
            });
        }

        // Получение обновленного заказа с новой историей
        const finalOrder = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                project: true,
                developer: true,
                employee: true,
                history: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });

        return NextResponse.json({
            ...finalOrder,
            currentStatus,
        });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

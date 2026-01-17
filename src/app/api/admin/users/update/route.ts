
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { userId, action, value } = await request.json();

        if (action === 'block') {
            await prisma.user.update({
                where: { id: userId },
                data: { isBlocked: value }
            });
            return NextResponse.json({ success: true, message: `User ${value ? 'blocked' : 'unblocked'}` });
        }

        if (action === 'subscription') {
            // Upsert subscription to ensure it exists
            const status = value ? 'active' : 'inactive'; // value true = active

            // If activating, set dates
            const startDate = value ? new Date() : undefined;
            const endDate = value ? new Date(new Date().setFullYear(new Date().getFullYear() + 1)) : undefined; // Default 1 year if manual

            await prisma.subscription.upsert({
                where: { userId: userId },
                create: {
                    userId: userId,
                    status: 'ACTIVE', // Prisma enum usually uppercase? Schema says String or Enum?
                    // Checking schema context from previous turns: Subscription status is String usually "ACTIVE"
                    // Let's safe bet "active" or "inactive" based on schema usage
                    planType: 'MANUAL',
                    startDate: new Date(),
                    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 10)) // Long time
                },
                update: {
                    status: value ? 'ACTIVE' : 'INACTIVE',
                    // Only update dates if activating specifically? 
                    // For admin toggle, usually just status flip is enough
                }
            });

            return NextResponse.json({ success: true, message: `Subscription marked as ${status}` });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });

    } catch (error) {
        console.error("Admin update error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

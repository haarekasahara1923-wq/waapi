import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { addDays } from 'date-fns';

export async function POST(request: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email, plan, type, amount } = await request.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const secret = process.env.RAZORPAY_SECRET || "5ERk59shUraQto1EJ51we7aK";

        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            return NextResponse.json(
                { success: false, error: 'Invalid signature' },
                { status: 400 }
            );
        }

        if (email) {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (user) {
                // Wallet Recharge Logic
                if (type === 'wallet_recharge' && amount) {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: {
                            walletBalance: { increment: Number(amount) }
                        }
                    });
                    return NextResponse.json({ success: true, message: "Wallet recharged successfully" });
                }

                // Subscription Logic (Default if type is not wallet_recharge or if plan is present)
                if (plan) {
                    const startDate = new Date();
                    const endDate = plan === 'yearly' ? addDays(startDate, 365) : addDays(startDate, 30);

                    await prisma.subscription.upsert({
                        where: { userId: user.id },
                        update: {
                            planType: plan.toUpperCase(),
                            status: 'ACTIVE',
                            paymentId: razorpay_payment_id,
                            orderId: razorpay_order_id,
                            startDate: startDate,
                            endDate: endDate,
                        },
                        create: {
                            userId: user.id,
                            planType: plan.toUpperCase(),
                            status: 'ACTIVE',
                            paymentId: razorpay_payment_id,
                            orderId: razorpay_order_id,
                            startDate: startDate,
                            endDate: endDate,
                        }
                    });

                    return NextResponse.json({ success: true, message: "Subscription activated" });
                }
            }
        }

        return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { error: 'Error verifying payment' },
            { status: 500 }
        );
    }
}

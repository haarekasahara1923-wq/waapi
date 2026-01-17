import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET || '')
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Database update logic here
            // await prisma.subscription.create(...)
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { success: false, error: 'Invalid signature' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { error: 'Error verifying payment' },
            { status: 500 }
        );
    }
}

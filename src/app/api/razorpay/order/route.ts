import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay
// NOTE: ENV variables must be set in .env or Vercel dashboard
// Initialize outside but don't error immediately if building
// NOTE: ENV variables must be set in .env or Vercel dashboard
let razorpay: Razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
    });
}

export async function POST(request: Request) {
    try {
        const { amount, currency = 'INR' } = await request.json();

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
            console.error("Razorpay keys are missing.");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const options = {
            amount: Math.round(amount * 100), // Razorpay expects amount in paise
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        if (!razorpay) {
            razorpay = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID || '',
                key_secret: process.env.RAZORPAY_SECRET || '',
            });
        }

        const order = await razorpay.orders.create(options);

        return NextResponse.json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json(
            { error: 'Error creating order' },
            { status: 500 }
        );
    }
}


import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // In a real app, hash password here using bcrypt
        const passwordHash = password;

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                role: "user",
                walletBalance: 0.0,
                // Create an inactive subscription so we can query it later
                subscription: {
                    create: {
                        planType: "NONE", // Placeholder, logic will handle this
                        status: "PENDING", // PENDING Payment
                        startDate: new Date(),
                        endDate: new Date()
                    }
                }
            },
        });

        return NextResponse.json({ message: "User created successfully", user });

    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Check, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Define plans
const PLANS = [
    {
        id: "monthly",
        name: "Monthly Plan",
        price: 999,
        setupFee: 0,
        total: 999,
        description: "Great for starters",
        features: ["Unlimited Messages", "Campaign Management", "Basic Analytics"],
        popular: false
    },
    {
        id: "yearly",
        name: "Yearly Plan",
        price: 9999,
        setupFee: 0,
        total: 9999,
        description: "Best value for businesses",
        features: ["Everything in Monthly", "Priority Support", "Advanced Automation", "No Setup Fee"],
        popular: true
    }
];

export default function SignupPage() {
    const [step, setStep] = useState<"details" | "plan">("details");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [selectedPlan, setSelectedPlan] = useState<string>("yearly");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("plan");
    };

    const handlePayment = async () => {
        setIsLoading(true);

        const plan = PLANS.find(p => p.id === selectedPlan);
        if (!plan) return;

        try {
            // 1. Create Order
            const orderRes = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: plan.total })
            });
            const orderData = await orderRes.json();

            if (!orderRes.ok) throw new Error(orderData.error);

            // 2. Open Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // You need to ensure this is available in client
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Shree Shyam Tech",
                description: `Subscription for ${plan.name}`,
                order_id: orderData.id,
                handler: async function (response: any) {
                    try {
                        // 3. Verify Payment & Create User
                        const verifyRes = await fetch("/api/razorpay/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                // Pass user details to create account backend
                                ...formData,
                                plan: selectedPlan
                            })
                        });

                        // Note: Realistically, verify route might just verify payment.
                        // You should probably have a separate signup route that takes payment ID.
                        // For simplicity in this turn, we assume verify does it or we call signup after.

                        if (verifyRes.ok) {
                            toast.success("Subscription successful! Welcome aboard.");
                            router.push("/dashboard");
                        } else {
                            toast.error("Payment verification failed.");
                        }
                    } catch (error) {
                        console.error(error);
                        toast.error("Something went wrong during verification.");
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: "" // Can collect phone number if needed
                },
                theme: {
                    color: "#10B981"
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error(error);
            toast.error("Failed to initiate payment.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-lg w-full mx-auto">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                    {step === "details" ? "Create an account" : "Choose your plan"}
                </h1>
                <p className="text-sm text-[var(--color-text-muted)]">
                    {step === "details" ? "Enter your details below to create your account" : "Select a subscription to get started"}
                </p>
            </div>

            {step === "details" ? (
                <form onSubmit={handleDetailsSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-[var(--color-text-primary)]" htmlFor="name">
                            Full Name
                        </label>
                        <Input
                            id="name"
                            placeholder="John Doe"
                            required
                            disabled={isLoading}
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-[var(--color-text-primary)]" htmlFor="email">
                            Email
                        </label>
                        <Input
                            id="email"
                            placeholder="m@example.com"
                            type="email"
                            required
                            disabled={isLoading}
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-[var(--color-text-primary)]" htmlFor="password">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            required
                            disabled={isLoading}
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <Button type="submit" className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white">
                        Next
                    </Button>
                </form>
            ) : (
                <div className="space-y-6">
                    <div className="grid gap-4">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                className={cn(
                                    "relative rounded-lg border p-4 cursor-pointer transition-all hover:border-[var(--color-primary)]",
                                    selectedPlan === plan.id
                                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-1 ring-[var(--color-primary)]"
                                        : "border-[var(--color-border)] bg-[var(--color-surface)]"
                                )}
                                onClick={() => setSelectedPlan(plan.id)}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-2 -right-2 bg-[var(--color-primary)] text-white text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-current" />
                                        POPULAR
                                    </div>
                                )}
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-[var(--color-text-primary)]">{plan.name}</h3>
                                        <p className="text-sm text-[var(--color-text-muted)]">{plan.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg text-[var(--color-text-primary)]">₹{plan.total}</div>
                                        {plan.setupFee > 0 && (
                                            <div className="text-xs text-[var(--color-text-muted)]">(Incl. ₹{plan.setupFee} setup)</div>
                                        )}
                                    </div>
                                </div>
                                <ul className="space-y-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="text-xs text-[var(--color-text-muted)] flex items-center gap-2">
                                            <Check className="w-3 h-3 text-[var(--color-primary)]" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-sm font-medium pt-4 border-t border-[var(--color-border)]">
                            <span>Total Payable Due:</span>
                            <span>₹{PLANS.find(p => p.id === selectedPlan)?.total}</span>
                        </div>

                        <Button
                            onClick={handlePayment}
                            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Subscribe & Sign Up
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full"
                            onClick={() => setStep("details")}
                            disabled={isLoading}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            )}

            <div className="text-center text-sm text-[var(--color-text-muted)]">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-[var(--color-primary)] hover:underline">
                    Sign in
                </Link>
            </div>
        </div>
    );
}

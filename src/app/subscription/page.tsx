
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2, Check, Star } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { RazorpayLoader } from "@/components/RazorpayLoader";

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

export default function SubscriptionPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<string>("yearly");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

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
            const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
            if (!key) {
                toast.error("Configuration Error: Payment Key Missing");
                setIsLoading(false);
                return;
            }

            const options = {
                key: key,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Shree Shyam Tech",
                description: `Subscription for ${plan.name}`,
                order_id: orderData.id,
                handler: async function (response: any) {
                    try {
                        const verifyRes = await fetch("/api/razorpay/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                email: session?.user?.email,
                                plan: selectedPlan
                            })
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyRes.ok && verifyData.success) {
                            toast.success("Subscription activated successfully!");
                            window.location.href = "/dashboard";
                        } else {
                            toast.error(verifyData.error || "Payment verification failed.");
                        }
                    } catch (error) {
                        console.error(error);
                        toast.error("Something went wrong during verification.");
                    }
                },
                prefill: {
                    name: session?.user?.name || "",
                    email: session?.user?.email || "",
                    contact: ""
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
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-background)]">
            <RazorpayLoader />
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
                        Complete Your Subscription
                    </h1>
                    <p className="text-[var(--color-text-muted)] mb-6">
                        You're logged in as <strong>{session?.user?.email}</strong>. Please select a plan to activate your account and access the dashboard.
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 p-4 rounded-lg text-sm">
                        NOTE: Your access is currently restricted until a subscription is active.
                    </div>
                </div>

                <div className="space-y-6 bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)]">
                    <div className="space-y-2 text-center mb-4">
                        <h2 className="text-xl font-bold">Choose your plan</h2>
                    </div>
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
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 pt-4">
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
                            Activate Subscription
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

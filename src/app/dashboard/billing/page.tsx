"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import Script from "next/script";

// This would normally come from an API/Database
const currentPlan = {
    name: "Free Trial",
    status: "Active",
    renewalDate: "2026-02-15",
    price: "0",
};

const plans = [
    {
        name: "Monthly",
        price: 999,
        period: "/ month",
        features: ["Full API Access", "Unlimited Contacts", "Basic Automation"],
        id: "plan_monthly",
    },
    {
        name: "Yearly",
        price: 9999,
        period: "/ year",
        features: ["Everything in Monthly", "Priority Support", "Advanced Chatbots", "Custom Domain"],
        id: "plan_yearly",
        popular: true,
    },
];

export default function BillingPage() {
    const [loading, setLoading] = useState(false);

    const handlePayment = async (amount: number, planName: string) => {
        setLoading(true);
        try {
            const response = await fetch('/api/razorpay/order', {
                method: 'POST',
                body: JSON.stringify({ amount }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const order = await response.json();

            const options = {
                key: "rzp_live_RsbFKZwt1ZtSQF", // Public Key ID
                amount: order.amount,
                currency: order.currency,
                name: "Shree Shyam Tech",
                description: `Subscription for ${planName} Plan`,
                order_id: order.id,
                handler: async function (response: any) {
                    const verifyRes = await fetch('/api/razorpay/verify', {
                        method: 'POST',
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    });

                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        alert("Payment Successful! Subscription Active.");
                    } else {
                        alert("Payment Verification Failed.");
                    }
                },
                theme: {
                    color: "#25D366"
                }
            };

            const rzp1 = new (window as any).Razorpay(options);
            rzp1.open();
            rzp1.on('payment.failed', function (response: any) {
                alert("Payment Failed: " + response.error.description);
            });

        } catch (error) {
            console.error("Payment failed", error);
            alert("Payment initialization failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Billing & Subscription</h2>
                <p className="text-[var(--color-text-muted)]">Manage your plan and payment details.</p>
            </div>

            <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>You are currently on the <span className="font-semibold text-[var(--color-primary)]">{currentPlan.name}</span> plan.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-text-muted)]">Status</span>
                        <span className="text-[var(--color-primary)] font-medium">{currentPlan.status}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-text-muted)]">Renewal Date</span>
                        <span className="text-[var(--color-text-primary)]">{currentPlan.renewalDate}</span>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2 lg:max-w-4xl">
                {plans.map((plan, index) => (
                    <Card key={index} className={`flex flex-col ${plan.popular ? 'border-[var(--color-primary)] shadow-[0_0_20px_rgba(37,211,102,0.1)]' : 'border-[var(--color-border)]'}`}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{plan.name}</CardTitle>
                                    <div className="flex items-baseline mt-2">
                                        <span className="text-3xl font-bold text-[var(--color-text-primary)]">₹{plan.price}</span>
                                        <span className="ml-1 text-[var(--color-text-muted)]">{plan.period}</span>
                                    </div>
                                </div>
                                {plan.popular && <span className="bg-[var(--color-primary)] text-white text-xs px-2 py-1 rounded">Best Value</span>}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-2">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-sm text-[var(--color-text-muted)]">
                                        <Check className="w-4 h-4 text-[var(--color-primary)] mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
                                onClick={() => handlePayment(plan.price, plan.name)}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CreditCard className="w-4 h-4 mr-2" />}
                                {plan.name === "Yearly" ? "Upgrade to Yearly" : "Subscribe Monthly"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, AlertCircle, CheckCircle2, IndianRupee, CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function WalletPage() {
    // In a real app, fetched from DB
    const [balance, setBalance] = useState(50);
    const [isLoading, setIsLoading] = useState(false);
    const [customAmount, setCustomAmount] = useState("");
    const router = useRouter();

    const handleRazorpayPayment = async (amount: number) => {
        if (!amount || amount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        setIsLoading(true);

        try {
            // 1. Create Order
            const orderRes = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: amount })
            });

            if (!orderRes.ok) throw new Error("Failed to create order");

            const orderData = await orderRes.json();

            // 2. Open Razorpay
            const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

            if (!key) {
                toast.error("Configuration Error: Payment Key Missing");
                console.error("Missing NEXT_PUBLIC_RAZORPAY_KEY_ID");
                setIsLoading(false);
                return;
            }

            const options = {
                key: key,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Shree Shyam Tech",
                description: "Wallet Recharge",
                order_id: orderData.id,
                handler: async function (response: any) {
                    try {
                        // 3. Verify
                        const verifyRes = await fetch("/api/razorpay/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                type: "wallet_recharge",
                                amount: amount
                            })
                        });

                        if (verifyRes.ok) {
                            toast.success(`Succesfully added ₹${amount} to wallet!`);
                            setBalance(prev => prev + amount); // Optimistic update
                            setCustomAmount("");
                        } else {
                            toast.error("Payment verification failed.");
                        }
                    } catch (error) {
                        toast.error("Verification error.");
                    }
                },
                prefill: {
                    name: "User Name", // Should come from auth
                    email: "user@example.com",
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
            toast.error("Failed to initiate payment. Ensure Razorpay keys are set.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Wallet & Usage</h2>
                <p className="text-[var(--color-text-muted)]">Manage your wallet balance to access Meta services.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Balance Card */}
                <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-[var(--color-text-muted)]">Current Balance</CardTitle>
                        <Wallet className="h-4 w-4 text-[var(--color-primary)]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[var(--color-text-primary)]">₹ {balance}</div>
                        <p className={`text-xs ${balance < 200 ? "text-red-500 font-medium" : "text-[var(--color-text-muted)]"}`}>
                            {balance < 200 ? "Low Balance (Min ₹200 needed)" : "Active"}
                        </p>
                    </CardContent>
                </Card>

                {/* Status Card */}
                <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-[var(--color-text-muted)]">Service Status</CardTitle>
                        {balance >= 200 ?
                            <CheckCircle2 className="h-4 w-4 text-green-500" /> :
                            <AlertCircle className="h-4 w-4 text-red-500" />
                        }
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[var(--color-text-primary)]">
                            {balance >= 200 ? "Active" : "Restricted"}
                        </div>
                        <p className="text-xs text-[var(--color-text-muted)]">
                            {balance < 200 ? "Recharge to unlock services" : "Services running smoothly"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recharge Section */}
            <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                <CardHeader>
                    <CardTitle>Add Funds</CardTitle>
                    <CardDescription>Recharge your wallet to continue using Meta services.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6 max-w-md">
                        <div className="grid grid-cols-3 gap-3">
                            {[200, 500, 1000].map(amount => (
                                <Button
                                    key={amount}
                                    variant="outline"
                                    className="border-[var(--color-border)] hover:bg-[var(--color-primary)] hover:text-white"
                                    onClick={() => handleRazorpayPayment(amount)}
                                    disabled={isLoading}
                                >
                                    ₹ {amount}
                                </Button>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--color-text-muted)]">Custom Amount</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <IndianRupee className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--color-text-muted)]" />
                                    <Input
                                        type="number"
                                        placeholder="Enter amount"
                                        className="pl-8"
                                        value={customAmount}
                                        onChange={(e) => setCustomAmount(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <Button
                                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
                                    onClick={() => handleRazorpayPayment(Number(customAmount))}
                                    disabled={isLoading || !customAmount}
                                >
                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Pay Now"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {balance >= 200 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold text-green-800">Ready to go!</h4>
                        <p className="text-sm text-green-700">Your wallet has sufficient funds to access the platform.</p>
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                        <a href="/dashboard/platform">Launch Platform</a>
                    </Button>
                </div>
            )}
        </div>
    );
}

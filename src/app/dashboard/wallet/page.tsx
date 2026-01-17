"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, AlertCircle, CheckCircle2, IndianRupee } from "lucide-react";
import { USERS } from "@/lib/data";

// In a real app, this would fetch from an API
// For now, we mock the current user's state
const CURRENT_USER_EMAIL = "rahul@example.com"; // Simulating a logged-in user standard view
// To test Admin: Use login credentials provided earlier.

export default function WalletPage() {
    // Simulating User State locally for Demo
    // In a real app, this comes from API/Global State
    const [balance, setBalance] = useState(50);
    const [isLoading, setIsLoading] = useState(false);

    const handleRecharge = (amount: number) => {
        setIsLoading(true);
        // Simulate Razorpay/API delay
        setTimeout(() => {
            setBalance(prev => prev + amount);
            setIsLoading(false);
        }, 1500);
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
                            {balance < 200 ? "Low Balance" : "Active"}
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
                            {balance >= 200 ? "Active" : "Inactive"}
                        </div>
                        <p className="text-xs text-[var(--color-text-muted)]">
                            {balance < 200 ? "Min. ₹200 required to start" : "Services running smoothly"}
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
                    <div className="flex flex-col gap-4 max-w-md">
                        <div className="grid grid-cols-3 gap-2">
                            {[200, 500, 1000].map(amount => (
                                <Button
                                    key={amount}
                                    variant="outline"
                                    className="border-[var(--color-border)] hover:bg-[var(--color-primary)] hover:text-white"
                                    onClick={() => handleRecharge(amount)}
                                    disabled={isLoading}
                                >
                                    ₹ {amount}
                                </Button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
                                onClick={() => handleRecharge(100)} // Default action
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : <><IndianRupee className="mr-2 h-4 w-4" /> Add Custom Amount</>}
                            </Button>
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
                        <a href="/dashboard/platform?demo_access=true">Launch Platform</a>
                    </Button>
                </div>
            )}
        </div>
    );
}

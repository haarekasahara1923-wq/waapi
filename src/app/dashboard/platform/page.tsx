"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lock, CheckCircle2 } from "lucide-react";
import { USERS } from "@/lib/data";

// Defaulting to Admin User for Demo Purposes
// This ensures the "Platform Access" page shows the iframe by default
// But we also permit override via URL for the User Flow demo
const CURRENT_USER_EMAIL = "dazo192371@gmail.com";

function PlatformContent() {
    const searchParams = useSearchParams();
    const demoAccess = searchParams.get('demo_access') === 'true';

    // We check both the hardcoded user state AND the demo override
    const [user, setUser] = useState(USERS.find(u => u.email === CURRENT_USER_EMAIL)!);

    // Allow logic: Admin OR (Balance > 200 & Sub Active & Not Blocked) OR Demo Override
    const hasAccess = (user.role === 'admin') ||
        (user.walletBalance >= 200 && user.subscriptionStatus === 'active' && !user.isBlocked) ||
        demoAccess;

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col space-y-4">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Platform Access</h2>
                <p className="text-[var(--color-text-muted)]">Access the white-label Meta platform here.</p>
            </div>

            {hasAccess ? (
                <div className="flex-1 flex items-center justify-center">
                    <Card className="max-w-md w-full text-center p-8 border-[var(--color-border)] shadow-lg">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-green-100 rounded-full animate-pulse">
                                <CheckCircle2 className="h-10 w-10 text-green-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Access Granted</h3>
                        <p className="text-[var(--color-text-muted)] mb-8">
                            Your wallet and subscription are active. You can now access your white-label control panel.
                        </p>

                        <Button asChild size="lg" className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-lg h-12">
                            <a href="https://go.wapiflow.site" target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-5 w-5" />
                                Launch Control Panel
                            </a>
                        </Button>
                        <p className="text-xs text-[var(--color-text-muted)] mt-4">
                            Opens in a new secure window
                        </p>
                    </Card>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <Card className="max-w-md w-full text-center p-6 border-[var(--color-border)]">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-red-100 rounded-full">
                                <Lock className="h-8 w-8 text-red-500" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Access Restricted</h3>
                        <p className="text-[var(--color-text-muted)] mb-6">
                            To access the platform, you must meet the following requirements:
                        </p>
                        <ul className="text-left text-sm space-y-2 mb-6 bg-[var(--color-surface)] p-4 rounded-md">
                            <li className="flex items-center gap-2">
                                {user.subscriptionStatus === 'active' ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                    <span className="h-4 w-4 border border-red-500 rounded-full" />
                                )}
                                Active Subscription
                            </li>
                            <li className="flex items-center gap-2">
                                {user.walletBalance >= 200 ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                    <span className="h-4 w-4 border border-red-500 rounded-full" />
                                )}
                                Wallet Balance &ge; ₹200
                            </li>
                            <li className="flex items-center gap-2">
                                {!user.isBlocked ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                    <span className="h-4 w-4 border border-red-500 rounded-full" />
                                )}
                                Account Not Blocked
                            </li>
                        </ul>
                        <div className="flex gap-2 justify-center">
                            {user.walletBalance < 200 && (
                                <Button className="w-full" asChild>
                                    <a href="/dashboard/wallet">Recharge Wallet</a>
                                </Button>
                            )}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default function PlatformPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PlatformContent />
        </Suspense>
    );
}

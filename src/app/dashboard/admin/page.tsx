"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, AlertCircle, CheckCircle2, IndianRupee, Lock, Search } from "lucide-react";
import { USERS, User } from "@/lib/data";

export default function AdminDashboard() {
    const [users, setUsers] = useState<User[]>(USERS);
    const [searchTerm, setSearchTerm] = useState("");

    const handleBlockToggle = (userId: string) => {
        setUsers(users.map(u =>
            u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u
        ));
    };

    const handleMarkPaid = (userId: string) => {
        setUsers(users.map(u =>
            u.id === userId ? { ...u, subscriptionStatus: "active" } : u
        ));
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Admin Dashboard</h2>
                <p className="text-[var(--color-text-muted)]">Manage users, wallets and service access.</p>
            </div>

            <div className="flex items-center space-x-2 bg-[var(--color-surface)] p-2 rounded-lg border border-[var(--color-border)] max-w-md">
                <Search className="h-4 w-4 text-[var(--color-text-muted)]" />
                <input
                    type="text"
                    placeholder="Search users..."
                    className="bg-transparent border-none outline-none flex-1 text-sm text-[var(--color-text-primary)]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b [&_tr]:border-[var(--color-border)]">
                            <tr className="border-b transition-colors hover:bg-[var(--color-background)]/50 data-[state=selected]:bg-[var(--color-background)]">
                                <th className="h-12 px-4 align-middle font-medium text-[var(--color-text-muted)]">User</th>
                                <th className="h-12 px-4 align-middle font-medium text-[var(--color-text-muted)]">Subscription</th>
                                <th className="h-12 px-4 align-middle font-medium text-[var(--color-text-muted)]">Wallet Phase</th>
                                <th className="h-12 px-4 align-middle font-medium text-[var(--color-text-muted)]">Status</th>
                                <th className="h-12 px-4 align-middle font-medium text-[var(--color-text-muted)]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-background)]/50">
                                    <td className="p-4 align-middle">
                                        <div>
                                            <div className="font-medium text-[var(--color-text-primary)]">{user.name}</div>
                                            <div className="text-xs text-[var(--color-text-muted)]">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transtion-colors
                                    ${user.subscriptionStatus === 'active'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                                            {user.subscriptionStatus}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[var(--color-text-primary)]">₹ {user.walletBalance}</span>
                                            {user.walletBalance < 200 && (
                                                <AlertCircle className="h-3 w-3 text-red-500" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle">
                                        {user.isBlocked ? (
                                            <span className="text-red-500 font-medium">Blocked</span>
                                        ) : (
                                            <span className="text-green-500 font-medium">Active</span>
                                        )}
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className="flex items-center gap-2">
                                            {user.subscriptionStatus !== 'active' && (
                                                <Button size="sm" variant="outline" onClick={() => handleMarkPaid(user.id)}>
                                                    Mark Paid
                                                </Button>
                                            )}
                                            <Button
                                                size="sm"
                                                variant={user.isBlocked ? "default" : "destructive"}
                                                onClick={() => handleBlockToggle(user.id)}
                                            >
                                                {user.isBlocked ? "Unblock" : "Block"}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

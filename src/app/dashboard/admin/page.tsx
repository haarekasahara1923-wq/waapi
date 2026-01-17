"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, CheckCircle2, Search, Unlock, Ban, AlertCircle, IndianRupee } from "lucide-react";

// Types
type User = {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    walletBalance: number;
    isBlocked: boolean;
    subscriptionStatus: string; // Allow flexible status from DB
};

export default function AdminDashboard() {
    // In a real app, this would be fetched from your API (GET /api/admin/users)
    // We start with an empty array or initial fetch
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/admin/users");
                const data = await res.json();
                if (data.users) {
                    setUsers(data.users);
                }
            } catch (e) {
                console.error("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Placeholder for Revenue Data
    const revenueData = [
        { id: 1, user: "Real Data Coming Soon", type: "Subscription", amount: 0, date: "2024-03-01" },
    ];

    const filteredUsers = users.filter(user =>
        (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    // Function to simulate blocking/unblocking (Call API here in future)
    const toggleBlockUser = async (userId: string, currentStatus: boolean) => {
        try {
            const res = await fetch("/api/admin/users/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, action: 'block', value: !currentStatus })
            });
            if (res.ok) {
                setUsers(prev => prev.map(u => {
                    if (u.id === userId) return { ...u, isBlocked: !currentStatus };
                    return u;
                }));
            }
        } catch (e) {
            console.error("Failed to update block status");
        }
    };

    // Function to toggle subscription status
    const toggleSubscription = async (userId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'active' || currentStatus === 'ACTIVE'; // check for true
        // We want to flip it. So if active(true), we send false.

        try {
            const res = await fetch("/api/admin/users/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, action: 'subscription', value: !newStatus })
            });

            if (res.ok) {
                setUsers(prev => prev.map(u => {
                    if (u.id === userId) return { ...u, subscriptionStatus: !newStatus ? 'active' : 'inactive' };
                    return u;
                }));
            }
        } catch (e) {
            console.error("Failed to update subscription");
        }
    };

    return (
        <div className="space-y-8">
            {/* ... header ... */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Admin Panel</h2>
                <p className="text-[var(--color-text-muted)]">Manage users, access, and view revenue reports.</p>
            </div>

            {/* ... stats cards ... (unchanged) */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-[var(--color-text-muted)]">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-[var(--color-primary)]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[var(--color-text-primary)]">{users.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-[var(--color-text-muted)]">Active Subscriptions</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[var(--color-text-primary)]">
                            {users.filter(u => u.subscriptionStatus === 'active' || u.subscriptionStatus === 'ACTIVE').length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Users Table */}
            <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-[var(--color-text-muted)]" />
                            <Input
                                placeholder="Search users..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-[var(--color-border)]">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-[var(--color-text-muted)] font-medium">
                                <tr>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Wallet</th>
                                    <th className="p-3">Role</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length === 0 ? (
                                    <tr><td colSpan={6} className="p-4 text-center text-[var(--color-text-muted)]">No users found.</td></tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-background)]">
                                            <td className="p-3 font-medium">{user.name}</td>
                                            <td className="p-3 text-[var(--color-text-muted)]">{user.email}</td>
                                            <td className="p-3">₹{user.walletBalance}</td>
                                            <td className="p-3 capitalize">{user.role}</td>
                                            <td className="p-3">
                                                <Badge
                                                    variant={user.subscriptionStatus === 'active' || user.subscriptionStatus === 'ACTIVE' ? "success" : "secondary"}
                                                    className={user.subscriptionStatus === 'active' || user.subscriptionStatus === 'ACTIVE' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                                                >
                                                    {user.subscriptionStatus || 'inactive'}
                                                </Badge>
                                                {user.isBlocked && <Badge variant="destructive" className="ml-2 bg-red-100 text-red-800">Blocked</Badge>}
                                            </td>
                                            <td className="p-3 flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => toggleBlockUser(user.id, user.isBlocked)}
                                                    className={user.isBlocked ? "text-green-600 hover:text-green-700" : "text-red-500 hover:text-red-600"}
                                                    title={user.isBlocked ? "Unblock User" : "Block User"}
                                                >
                                                    {user.isBlocked ? <Unlock className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => toggleSubscription(user.id, user.subscriptionStatus)}
                                                    className={user.subscriptionStatus === 'active' || user.subscriptionStatus === 'ACTIVE' ? "text-orange-600 hover:text-orange-700" : "text-blue-600 hover:text-blue-700"}
                                                    title={user.subscriptionStatus === 'active' || user.subscriptionStatus === 'ACTIVE' ? "Mark Unpaid" : "Mark Paid"}
                                                >
                                                    {user.subscriptionStatus === 'active' || user.subscriptionStatus === 'ACTIVE' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Revenue Table */}
            <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                <CardHeader>
                    <CardTitle>Revenue & Transactions</CardTitle>
                    <CardDescription>Recent subscription and wallet recharge activities.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-[var(--color-border)]">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-[var(--color-text-muted)] font-medium">
                                <tr>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">User</th>
                                    <th className="p-3">Type</th>
                                    <th className="p-3 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revenueData.map((item) => (
                                    <tr key={item.id} className="border-t border-[var(--color-border)]">
                                        <td className="p-3">{item.date}</td>
                                        <td className="p-3">{item.user}</td>
                                        <td className="p-3">
                                            <Badge variant="outline" className={item.type === 'Subscription' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-green-50 text-green-700 border-green-200'}>
                                                {item.type}
                                            </Badge>
                                        </td>
                                        <td className="p-3 text-right font-medium">₹{item.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

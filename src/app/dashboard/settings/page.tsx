"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (passwords.new !== passwords.confirm) {
            toast.error("New passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            // In a real app, this would call an API endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Password updated successfully");
            setPasswords({ current: "", new: "", confirm: "" });
        } catch (error) {
            toast.error("Failed to update password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Settings</h2>
                <p className="text-[var(--color-text-muted)]">Manage your account settings and preferences.</p>
            </div>

            <Card className="bg-[var(--color-surface)] border-[var(--color-border)] max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-[var(--color-text-primary)]">Security</CardTitle>
                    <CardDescription className="text-[var(--color-text-muted)]">
                        Update your password to keep your account secure.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--color-text-primary)]">
                                Current Password
                            </label>
                            <Input
                                type="password"
                                value={passwords.current}
                                onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--color-text-primary)]">
                                New Password
                            </label>
                            <Input
                                type="password"
                                value={passwords.new}
                                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--color-text-primary)]">
                                Confirm New Password
                            </label>
                            <Input
                                type="password"
                                value={passwords.confirm}
                                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Send, Activity } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Dashboard</h2>
                <p className="text-[var(--color-text-muted)]">Your WhatsApp automation journey starts here.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-[var(--color-text-muted)]">Messages Sent</CardTitle>
                        <Send className="h-4 w-4 text-[var(--color-primary)]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[var(--color-text-primary)]">12,345</div>
                        <p className="text-xs text-[var(--color-text-muted)]">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-[var(--color-text-muted)]">Active Campaigns</CardTitle>
                        <Activity className="h-4 w-4 text-[var(--color-primary)]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[var(--color-text-primary)]">24</div>
                        <p className="text-xs text-[var(--color-text-muted)]">+4 new this week</p>
                    </CardContent>
                </Card>
                <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-[var(--color-text-muted)]">WhatsApp Numbers</CardTitle>
                        <MessageSquare className="h-4 w-4 text-[var(--color-primary)]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[var(--color-text-primary)]">3</div>
                        <p className="text-xs text-[var(--color-text-muted)]">All active</p>
                    </CardContent>
                </Card>
                <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-[var(--color-text-muted)]">Subscription</CardTitle>
                        <Users className="h-4 w-4 text-[var(--color-primary)]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[var(--color-text-primary)]">Premium</div>
                        <p className="text-xs text-[var(--color-text-muted)]">Expires in 230 days</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Area - Empty State Example */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-[var(--color-surface)] border-[var(--color-border)]">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <div className="w-16 h-16 bg-[var(--color-border)] rounded-full flex items-center justify-center mb-4">
                                <Activity className="w-8 h-8 text-[var(--color-text-muted)]" />
                            </div>
                            <p className="text-[var(--color-text-primary)] font-medium">No recent activity</p>
                            <p className="text-[var(--color-text-muted)] text-sm mt-2">Your recent campaigns and message statistics will appear here.</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3 bg-[var(--color-surface)] border-[var(--color-border)]">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="flex items-center p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] hover:bg-[var(--color-surface)] cursor-pointer transition-colors">
                            <div className="w-10 h-10 rounded bg-[var(--color-primary)]/10 flex items-center justify-center mr-4">
                                <MessageSquare className="w-5 h-5 text-[var(--color-primary)]" />
                            </div>
                            <div>
                                <p className="font-medium text-[var(--color-text-primary)]">Connect Number</p>
                                <p className="text-xs text-[var(--color-text-muted)]">Link a new WhatsApp API number</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] hover:bg-[var(--color-surface)] cursor-pointer transition-colors">
                            <div className="w-10 h-10 rounded bg-[var(--color-primary)]/10 flex items-center justify-center mr-4">
                                <Send className="w-5 h-5 text-[var(--color-primary)]" />
                            </div>
                            <div>
                                <p className="font-medium text-[var(--color-text-primary)]">New Campaign</p>
                                <p className="text-xs text-[var(--color-text-muted)]">Start a broadcast message</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

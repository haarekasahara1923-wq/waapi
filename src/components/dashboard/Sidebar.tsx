"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard, MessageSquare, Bot, Radio, Send, Users, Inbox, CreditCard, Settings, Wallet, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
    const { data: session } = useSession();
    // Use the role from the session, defaulting to 'user' if not found
    // Note: We need to ensure the role is actually passed in the session object in auth.ts
    const userRole = (session?.user as any)?.role || "user";

    const menuItems = [
        { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { title: "Wallet & Usage", icon: Wallet, href: "/dashboard/wallet" },
        { title: "Platform Access", icon: Radio, href: "/dashboard/platform" },
        // Only show Admin Panel if user is admin
        ...(userRole === 'admin' ? [{ title: "Admin Panel", icon: Lock, href: "/dashboard/admin" }] : []),
        { title: "WhatsApp API", icon: MessageSquare, href: "/dashboard/api", active: false, badge: "Coming Soon" },
        { title: "Automation", icon: Bot, href: "/dashboard/automation", active: false, badge: "Coming Soon" },
        { title: "Broadcast", icon: Radio, href: "/dashboard/broadcast", active: false, badge: "Coming Soon" },
        { title: "Campaigns", icon: Send, href: "/dashboard/campaigns", active: false, badge: "Coming Soon" },
        { title: "Contacts", icon: Users, href: "/dashboard/contacts", active: false, badge: "Coming Soon" },
        { title: "Inbox", icon: Inbox, href: "/dashboard/inbox", active: false, badge: "Coming Soon" },
        { title: "Billing", icon: CreditCard, href: "/dashboard/billing" },
        { title: "Settings", icon: Settings, href: "/dashboard/settings" },
    ];

    return (
        <aside className="hidden w-64 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] md:flex z-50 h-screen sticky top-0">
            <div className="flex h-16 items-center border-b border-[var(--color-border)] px-6 shrink-0">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[var(--color-text-primary)]">
                    <div className="h-8 w-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                        {/* Logo Icon */}
                        <span className="text-white text-xs">SST</span>
                    </div>
                    <span>Shree Shyam Tech</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="grid gap-1 px-2">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.active === false ? "#" : item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--color-background)] hover:text-[var(--color-primary)] transition-colors",
                                item.href === "/dashboard" ? "bg-[var(--color-background)] text-[var(--color-primary)]" : "text-[var(--color-text-muted)]",
                                item.active === false && "opacity-60 cursor-not-allowed hover:bg-transparent hover:text-[var(--color-text-muted)]"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                            {item.badge && (
                                <span className="ml-auto text-[10px] bg-[var(--color-border)] px-1.5 py-0.5 rounded text-[var(--color-text-muted)]">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="border-t border-[var(--color-border)] p-4 shrink-0">
                <Link
                    href="/api/auth/signout"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    Logout
                </Link>
            </div>
        </aside>
    );
}

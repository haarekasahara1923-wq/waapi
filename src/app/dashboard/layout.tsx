import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const user = session.user as any;

    // Admin bypasses subscription check
    if (user.role !== 'admin') {
        const subscriptionStatus = user.subscription;
        // If subscription is not active, redirect to subscription page
        if (subscriptionStatus !== 'ACTIVE' && subscriptionStatus !== 'active') {
            redirect("/subscription");
        }
    }

    return (
        <div className="flex min-h-screen bg-[var(--color-surface)]">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-6 overflow-y-auto bg-[var(--color-background)] rounded-tl-2xl border-l border-t border-[var(--color-border)] relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                    {children}
                </main>
            </div>
        </div>
    );
}

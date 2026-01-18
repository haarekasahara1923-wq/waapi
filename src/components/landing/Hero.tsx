import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative overflow-hidden py-24 lg:py-32">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="mx-auto max-w-3xl text-center space-y-8">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[var(--color-text-primary)]">
                        Official WhatsApp API & <br className="hidden sm:inline" />
                        <span className="text-[var(--color-primary)]">CPaaS Platform</span> for Businesses
                    </h1>
                    <p className="mx-auto max-w-[700px] text-[var(--color-text-muted)] md:text-xl">
                        Automate WhatsApp, SMS, Email & RCS campaigns with a secure multi-tenant platform.
                        The ultimate solution for scaling your business communication.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/signup">
                            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white shadow-[0_0_20px_rgba(0,92,168,0.3)] hover:shadow-[0_0_30px_rgba(0,92,168,0.5)] transition-shadow">
                                Get Started
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full border-[var(--color-border)] hover:bg-[var(--color-surface)]">
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--color-primary-dark)]/5 rounded-full blur-[80px] -z-10" />
        </section>
    );
}

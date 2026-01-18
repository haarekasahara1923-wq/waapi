import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-[var(--color-text-primary)]">
                        SHREE SHYAM TECH
                    </span>
                </Link>
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="#services" className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                        Services
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                        Pricing
                    </Link>
                    <Link href="/login" className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors">
                        Login
                    </Link>
                    <Link href="/signup">
                        <Button size="sm" className="bg-[var(--color-secondary)] hover:bg-[var(--color-primary-dark)] text-white">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

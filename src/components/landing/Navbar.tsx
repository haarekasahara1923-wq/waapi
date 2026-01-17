import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
                <Link href="/" className="flex items-center space-x-2">
                    {/* Logo Icon (Subtle Green) */}
                    <div className="h-8 w-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                            />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-[var(--color-text-primary)]">
                        Shree Shyam Tech
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
                        <Button size="sm" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

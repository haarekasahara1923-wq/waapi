"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.push("/dashboard");
        }, 1000);
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                    Create an account
                </h1>
                <p className="text-sm text-[var(--color-text-muted)]">
                    Enter your details below to create your account
                </p>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-[var(--color-text-primary)]" htmlFor="name">
                        Full Name
                    </label>
                    <Input id="name" placeholder="John Doe" required disabled={isLoading} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-[var(--color-text-primary)]" htmlFor="email">
                        Email
                    </label>
                    <Input id="email" placeholder="m@example.com" type="email" required disabled={isLoading} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-[var(--color-text-primary)]" htmlFor="password">
                        Password
                    </label>
                    <Input id="password" type="password" required disabled={isLoading} />
                </div>
                <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign Up
                </Button>
            </form>
            <div className="text-center text-sm text-[var(--color-text-muted)]">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-[var(--color-primary)] hover:underline">
                    Sign in
                </Link>
            </div>
        </div>
    );
}

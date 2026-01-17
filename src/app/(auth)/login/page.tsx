"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

function LoginContent() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("registered") === "true") {
            toast.success("Registration successful! Please login to continue.");
        }
    }, [searchParams]);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (result?.error) {
                toast.error("Invalid credentials");
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                    Welcome back
                </h1>
                <p className="text-sm text-[var(--color-text-muted)]">
                    Enter your email to sign in to your account
                </p>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-[var(--color-text-primary)]" htmlFor="email">
                        Email
                    </label>
                    <Input
                        id="email"
                        placeholder="m@example.com"
                        type="email"
                        required
                        disabled={isLoading}
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-[var(--color-text-primary)]" htmlFor="password">
                        Password
                    </label>
                    <Input
                        id="password"
                        type="password"
                        required
                        disabled={isLoading}
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                </Button>
            </form>
            <div className="text-center text-sm text-[var(--color-text-muted)]">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-[var(--color-primary)] hover:underline">
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="flex justify-center"><Loader2 className="animate-spin" /></div>}>
            <LoginContent />
        </Suspense>
    );
}

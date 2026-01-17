"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleDetailsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Account created successfully! Please login to complete payment.");
                router.push("/login?registered=true");
            } else {
                toast.error(data.error || "Signup failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-lg w-full mx-auto">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                    Create an account
                </h1>
                <p className="text-sm text-[var(--color-text-muted)]">
                    Enter your details below to create your account
                </p>
            </div>

            <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-[var(--color-text-primary)]" htmlFor="name">
                        Full Name
                    </label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        disabled={isLoading}
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
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
                <Button type="submit" className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
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

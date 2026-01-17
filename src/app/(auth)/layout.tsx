import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[var(--color-background)]">
            <div className="mb-8">
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-[var(--color-text-primary)]">
                    <div className="h-10 w-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                        <span className="text-white text-sm">SST</span>
                    </div>
                    <span>Shree Shyam Tech</span>
                </Link>
            </div>
            <div className="w-full max-w-md space-y-8 bg-[var(--color-surface)] p-8 rounded-xl border border-[var(--color-border)] shadow-2xl">
                {children}
            </div>
        </div>
    );
}

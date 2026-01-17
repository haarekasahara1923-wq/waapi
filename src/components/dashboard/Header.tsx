import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6">
            <div className="w-full max-w-sm">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--color-text-muted)]" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full bg-[var(--color-background)] pl-8 placeholder:text-[var(--color-text-muted)] border-[var(--color-border)] focus-visible:ring-[var(--color-primary)]"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <div className="flex items-center gap-2 border-l border-[var(--color-border)] pl-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium leading-none text-[var(--color-text-primary)]">Demo User</p>
                        <p className="text-xs text-[var(--color-text-muted)]">Premium Plan</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20">
                        <User className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}

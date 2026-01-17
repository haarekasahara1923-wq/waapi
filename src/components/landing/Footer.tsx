import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-background)] py-12">
            <div className="container px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Shree Shyam Tech</h3>
                        <p className="text-sm text-[var(--color-text-muted)]">
                            Gangotri Vihar, Dehradun (UK) – 248001
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)]">
                            support.ws-store@wapiflow.site
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                            <li><Link href="#services" className="hover:text-[var(--color-primary)]">Services</Link></li>
                            <li><Link href="#pricing" className="hover:text-[var(--color-primary)]">Pricing</Link></li>
                            <li><Link href="/login" className="hover:text-[var(--color-primary)]">Login</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                            <li><Link href="/terms" className="hover:text-[var(--color-primary)]">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-[var(--color-primary)]">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">Social</h4>
                        <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                            <li><Link href="#" className="hover:text-[var(--color-primary)]">Twitter</Link></li>
                            <li><Link href="#" className="hover:text-[var(--color-primary)]">LinkedIn</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-[var(--color-border)] text-center text-sm text-[var(--color-text-muted)]">
                    &copy; {new Date().getFullYear()} Shree Shyam Tech. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

import { CheckCircle2 } from "lucide-react";

const reasons = [
    "Meta Official API Ready",
    "White-Label SaaS",
    "Multi-Tenant Architecture",
    "High Delivery Rates",
    "Secure & Scalable",
    "Built for Indian Businesses",
];

export function WhyChooseUs() {
    return (
        <section className="py-24">
            <div className="container px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[var(--color-text-primary)]">
                            Why Choose <span className="text-[var(--color-primary)]">Shree Shyam Tech</span>?
                        </h2>
                        <p className="text-[var(--color-text-muted)] text-lg">
                            We provide a robust, enterprise-grade infrastructure that ensures your messages get delivered, every time. Built for scale and reliability.
                        </p>
                        <ul className="grid gap-4 sm:grid-cols-2">
                            {reasons.map((reason, index) => (
                                <li key={index} className="flex items-center space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                                    <span className="text-[var(--color-text-primary)]">{reason}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-[var(--color-primary)]/20 blur-[100px] rounded-full -z-10" />
                        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-2xl overflow-hidden">
                            <img
                                src="/why-choose-us.png"
                                alt="Shree Shyam Tech Dashboard"
                                className="w-full h-auto rounded-xl object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
    {
        name: "Monthly",
        price: "₹999",
        period: "/ month",
        features: [
            "Full API Access",
            "Unlimited Contacts",
            "Basic Automation",
            "Email Support",
            "Real-time Analytics"
        ],
        cta: "Choose Monthly",
        popular: false,
    },
    {
        name: "Yearly",
        price: "₹9999",
        period: "/ year",
        features: [
            "Everything in Monthly",
            "Priority Support",
            "Advanced Chatbots",
            "Custom Domain",
            "Dedicated Account Manager",
            "Save ₹1989 (2 Months Free)"
        ],
        cta: "Choose Yearly",
        popular: true,
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="py-24">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[var(--color-text-primary)]">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="mt-4 text-[var(--color-text-muted)]">
                        Choose the plan that's right for your business.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col p-8 rounded-2xl border ${plan.popular
                                    ? "border-[var(--color-primary)] bg-[var(--color-surface)] shadow-[0_0_30px_rgba(37,211,102,0.15)]"
                                    : "border-[var(--color-border)] bg-[var(--color-surface)]/50"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--color-primary)] text-white text-sm font-medium">
                                    Best Value
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-[var(--color-text-muted)]">{plan.name}</h3>
                                <div className="flex items-baseline mt-2">
                                    <span className="text-4xl font-bold text-[var(--color-text-primary)]">{plan.price}</span>
                                    <span className="ml-2 text-[var(--color-text-muted)]">{plan.period}</span>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-[var(--color-text-primary)]">
                                        <Check className="w-5 h-5 text-[var(--color-primary)] mr-3 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/signup" className="w-full">
                                <Button
                                    className={`w-full py-6 text-lg ${plan.popular
                                            ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
                                            : "bg-[var(--color-border)] hover:bg-[var(--color-surface)] text-[var(--color-text-primary)]"
                                        }`}
                                >
                                    {plan.cta}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

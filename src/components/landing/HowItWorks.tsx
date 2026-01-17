import { UserPlus, CheckCheck, CreditCard, Rocket } from "lucide-react";
// Assuming Rocket exists. If not, I'll use Send.

const steps = [
    { step: "01", title: "Signup", description: "Create your account in seconds." },
    { step: "02", title: "Verify WhatsApp", description: "Connect your number via OTP." },
    { step: "03", title: "Choose Plan", description: "Select a plan that fits your needs." },
    { step: "04", title: "Automate & Scale", description: "Start sending campaigns instantly." },
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-[var(--color-surface)]/30">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[var(--color-text-primary)]">
                        How It Works
                    </h2>
                    <p className="mt-4 text-[var(--color-text-muted)]">
                        Get started with WhatsApp automation in 4 simple steps.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-4">
                    {steps.map((item, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center space-y-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] text-2xl font-bold bg-[var(--color-background)] z-10">
                                {item.step}
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-[var(--color-border)] -z-0" />
                            )}
                            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{item.title}</h3>
                            <p className="text-[var(--color-text-muted)] text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

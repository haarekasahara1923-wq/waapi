import { MessageSquare, Bot, Radio, Lock, MessageCircle, Smartphone, Mail, Cpu, Users, Inbox } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
    { title: "WhatsApp Business API", icon: MessageSquare, description: "Official Meta API integration for scalable messaging." },
    { title: "WhatsApp Automation & Chatbots", icon: Bot, description: "Automate responses and build complex flows effortlessly." },
    { title: "Bulk WhatsApp Broadcast", icon: Radio, description: "Reach thousands of customers instantly with high delivery rates." },
    { title: "OTP & Authentication", icon: Lock, description: "Secure and fast OTP delivery via WhatsApp and SMS." },
    { title: "SMS Campaigns", icon: MessageCircle, description: "Traditional SMS marketing for broader reach." },
    { title: "RCS Messaging", icon: Smartphone, description: "Rich Communication Services for interactive mobile experiences." },
    { title: "Email Marketing", icon: Mail, description: "Integrated email campaigns to complement your chat strategy." },
    { title: "AI Automation", icon: Cpu, description: "Smart AI agents to handle customer queries 24/7." },
    { title: "CRM Integration", icon: Users, description: "Seamlessly connect with your existing CRM tools." },
    { title: "Multi-Agent Inbox", icon: Inbox, description: "Collaborative team inbox for efficient support management." },
];

export function Services() {
    return (
        <section id="services" className="py-24 bg-[var(--color-surface)]/30">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[var(--color-text-primary)]">
                        Our Premium Services
                    </h2>
                    <p className="mt-4 text-[var(--color-text-muted)] md:text-lg max-w-[800px] mx-auto">
                        Everything you need to communicate with your customers effectively on their favorite platforms.
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {services.map((service, index) => (
                        <Card key={index} className="bg-[var(--color-background)] border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-colors group">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-[var(--color-surface)] flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/10 transition-colors">
                                    <service.icon className="w-6 h-6 text-[var(--color-primary)]" />
                                </div>
                                <CardTitle className="text-lg">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-[var(--color-text-muted)]">
                                    {service.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

// I'll skip cva for now and write manual classes to save time/dependencies if user didn't ask for cva specifically,
// BUT cva is standard for modern shadcn-like setups.
// Let me verify if I can install it quickly. Yes.
// Actually, I can write a simple component without cva for now to avoid dependency issues if I can't install easily.
// I will use simple props mapping.

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

        const variants = {
            default: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]",
            destructive: "bg-red-500 text-white hover:bg-red-600",
            outline: "border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-surface)] text-[var(--color-text-primary)]",
            secondary: "bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]",
            ghost: "hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]",
            link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
        }

        const sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        }

        return (
            <Comp
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }

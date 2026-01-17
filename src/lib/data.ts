
export type User = {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    walletBalance: number;
    isBlocked: boolean;
    subscriptionStatus: "active" | "inactive";
    servicesActive: boolean;
    joinedDate: string;
};

// Initial Mock Data
export const USERS: User[] = [
    {
        id: "admin-bypass",
        name: "Super Admin",
        email: "dazo192371@gmail.com",
        role: "admin",
        walletBalance: 10000,
        isBlocked: false,
        subscriptionStatus: "active",
        servicesActive: true,
        joinedDate: "2024-01-01",
    },
    {
        id: "user-1",
        name: "Rahul Sharma",
        email: "rahul@example.com",
        role: "user",
        walletBalance: 50, // Insufficient funds
        isBlocked: false,
        subscriptionStatus: "active",
        servicesActive: false, // Inactive due to low balance
        joinedDate: "2024-01-15",
    },
    {
        id: "user-2",
        name: "Sneha Gupta",
        email: "sneha@example.com",
        role: "user",
        walletBalance: 500, // Sufficient funds
        isBlocked: false,
        subscriptionStatus: "active",
        servicesActive: true, // Active
        joinedDate: "2024-01-16",
    }
];

// Helper to simulate DB Delay
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

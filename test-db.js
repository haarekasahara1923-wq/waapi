
const { PrismaClient } = require('@prisma/client');
const { withAccelerate } = require('@prisma/extension-accelerate');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
}).$extends(withAccelerate());

async function main() {
    console.log("Attempting to connect to DB...");
    try {
        await prisma.$connect();
        console.log("Connected successfully!");
        const userCount = await prisma.user.count();
        console.log(`User count: ${userCount}`);
        await prisma.$disconnect();
    } catch (e) {
        console.error("Connection failed:", e);
        process.exit(1);
    }
}

main();

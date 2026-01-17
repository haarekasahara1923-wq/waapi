
import { prisma } from "@/lib/prisma";

export default async function DBTestPage() {
    let status = "Checking...";
    let errorDetails = "";
    let envCheck = "";

    try {
        await prisma.$connect();
        const count = await prisma.user.count();
        status = `Success! Connected. User count: ${count}`;
    } catch (e: any) {
        status = "Connection Failed";
        errorDetails = e.message || JSON.stringify(e);
    }

    // masked check
    const url = process.env.DATABASE_URL || "";
    envCheck = url ? `Defined (starts with ${url.substring(0, 10)}...)` : "Undefined";

    return (
        <div style={{ padding: 40, fontFamily: 'monospace' }}>
            <h1>Database Connection Test</h1>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>DB URL Status:</strong> {envCheck}</p>
            {errorDetails && (
                <div style={{ background: '#fdd', padding: 20, marginTop: 20, whiteSpace: 'pre-wrap' }}>
                    <strong>Error:</strong><br />
                    {errorDetails}
                </div>
            )}
        </div>
    );
}

export const dynamic = 'force-dynamic';

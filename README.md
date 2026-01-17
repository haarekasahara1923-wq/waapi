# Shree Shyam Tech - WhatsApp API & CPaaS SaaS Platform

![Shree Shyam Tech](https://via.placeholder.com/800x400?text=Shree+Shyam+Tech+Platform)

A production-ready, white-label WhatsApp API & CPaaS SaaS platform built with the latest Next.js 15 stack. Designed for high performance, scalability, and a premium "WhatsApp-inspired" user experience.

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Payments**: Razorpay
- **Icons**: Lucide React

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL Database (Local or Cloud like Vercel Postgres/Supabase)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/sst-platform.git
    cd sst-platform
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory based on `.env.example`:
    ```env
    # Database (PostgreSQL)
    DATABASE_URL="postgresql://user:password@localhost:5432/sst_db?schema=public"

    # NextAuth (Generate with `openssl rand -base64 32`)
    NEXTAUTH_SECRET="your-secure-random-secret"
    NEXTAUTH_URL="http://localhost:3000"

    # Razorpay (Payment Gateway)
    RAZORPAY_KEY_ID="rzp_test_..."
    RAZORPAY_SECRET="your_razorpay_secret"
    ```

4.  **Database Setup:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment (Vercel)

This project is optimized for deployment on Vercel.

1.  Push your code to a Git repository (GitHub/GitLab).
2.  Import the project in Vercel.
3.  **Environment Variables**: Add the variables from your `.env` file to the Vercel Project Settings.
4.  **Build Command**: `next build` (Default)
5.  **Install Command**: `npm install` (Default)
6.  Click **Deploy**.

## 💳 Payment Integration (Razorpay)

The platform includes a complete payment flow with Razorpay.
- **Frontend**: Initiates payment using `checkout.razorpay.com`.
- **Backend**:
    - `/api/razorpay/order`: Creates a secure order on the server.
    - `/api/razorpay/verify`: Verifies the payment signature to ensure authenticity.

## 📂 Project Structure

```
├── prisma/               # Database Schema
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router Pages
│   │   ├── (auth)/       # Authentication Pages
│   │   ├── api/          # Backend API Routes
│   │   ├── dashboard/    # Protected Dashboard Area
│   │   └── page.tsx      # Landing Page
│   ├── components/
│   │   ├── dashboard/    # Dashboard-specific Components
│   │   ├── landing/      # Landing Page Components
│   │   └── ui/           # Reusable UI primitives (Button, Card, etc.)
│   └── lib/              # Utilities & Config
└── ...
```

## 🔒 Security

- Payment secrets are NEVER exposed to the client.
- Database access is handled securely via Prisma on the server.
- Passwords should be hashed (implement in auth logic).

## 📄 License

Proprietary Software. All rights reserved by Shree Shyam Tech.

# AutoPilot QA // AI Testing Automation

![Terminal Architect](/public/dashboard-preview.png)

**AutoPilot QA** is a high-performance, developer-first SaaS platform that automates QA testing using AI. It allows developers to deploy testing suites with zero-code Playwright generation and execute them in a scalable headless cloud environment.

## ✨ Key Features

- 🧠 **AI-Powered Test Generation**: Automatically generate production-ready Playwright test scripts based on plain-text user journeys or repository context using Google's Gemini AI.
- ☁️ **Headless Cloud Execution**: Run thousands of tests concurrently in a distributed cloud environment powered by Browserbase. No local infrastructure required.
- 📊 **Real-time Analytics & Dashboard**: Monitor test execution, view live logs in a terminal-like interface, and track test coverage and pass rates over time.
- 🔗 **GitHub Integration**: Connect directly to your GitHub repositories to test branches and pull requests.
- 🔒 **Secure Authentication**: Built-in authentication and user management powered by Clerk.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: React 19, [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives)
- **Database**: [PostgreSQL](https://postgresql.org/) (Serverless via Neon), [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **AI Engine**: Google Gen AI SDK (`@google/genai`)
- **Testing Engine**: [Playwright](https://playwright.dev/) (`playwright-core`)
- **Cloud Infrastructure**: [Browserbase SDK](https://www.browserbase.com/)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm, yarn, or pnpm
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "ai testing automation"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy the example environment file and fill in your keys:
   ```bash
   cp .env.example .env
   ```
   *Required Keys:*
   - Clerk: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
   - Database: `DATABASE_URL` (Neon Postgres)
   - Browserbase: `BROWSERBASE_API_KEY`, `BROWSERBASE_PROJECT_ID`
   - Google AI: `GEMINI_API_KEY`

4. **Initialize the database:**
   Push the schema to your database using Drizzle:
   ```bash
   npm run db:push
   ```
   *(Ensure you have a script defined in package.json for `drizzle-kit push`, e.g., `"db:push": "drizzle-kit push"`)*

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Pages, Layouts, API routes)
│   ├── api/              # API Endpoints (e.g., execute-test, generate-test)
│   ├── workspace/        # Main Dashboard / Authenticated App Area
│   ├── globals.css       # Global styles and Tailwind custom tokens
│   ├── layout.tsx        # Root layout with fonts and providers
│   └── page.tsx          # Landing Page
├── components/           # Reusable UI components (shadcn/ui, layout)
├── context/              # React Context Providers
├── db/                   # Database schema and config (Drizzle)
│   └── schema.ts         # Table definitions (Users, Tests, Repos, etc.)
├── lib/                  # Utility functions and library configs
├── public/               # Static assets (images, icons)
├── .env                  # Environment variables
├── drizzle.config.ts     # Drizzle ORM configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies and scripts
└── tailwind.config.js    # Tailwind configuration (if applicable)
```

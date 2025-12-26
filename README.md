# AI E-Commerce

An AI-powered e-commerce platform where users can chat with an intelligent assistant to discover products, get personalized recommendations, and complete purchases through a conversational interface with dynamic AI-generated UI elements.

## Features

- **Conversational Shopping** - Chat with AI to browse products, ask questions, and get recommendations
- **AI-Driven UI** - Dynamic, context-aware UI components rendered directly in chat responses
- **Smart Search** - Natural language product search and filtering
- **Personalized Recommendations** - AI-powered suggestions based on preferences and browsing history
- **Seamless Checkout** - Complete purchases without leaving the conversation

## Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Accessible component library (Radix UI + CVA)
- **Motion** - Animation library
- **Hugeicons** - Icon library

### Backend & Data

- **oRPC** - End-to-end typesafe API layer
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
- **PostgreSQL** - Primary database
- **Better Auth** - Authentication system

### State & Forms

- **TanStack Query** - Server state management
- **TanStack Form** - Form handling with Zod validation
- **Zustand** - Client state management
- **nuqs** - URL state management

### Tooling

- **T3 Env** - Type-safe environment variables
- **Zod** - Schema validation
- **ESLint** - Code linting

## Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- [PostgreSQL](https://www.postgresql.org/) (v14+)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd ai-ecommerce
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ai_ecommerce

# Authentication
BETTER_AUTH_SECRET=your-secret-key-min-32-characters-long
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Set up the database

```bash
# Push schema to database (development)
bun run db:push

# Or generate and run migrations (production)
bun run db:generate
bun run db:migrate
```

### 5. Start the development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command               | Description                   |
| --------------------- | ----------------------------- |
| `bun dev`             | Start development server      |
| `bun run build`       | Create production build       |
| `bun start`           | Start production server       |
| `bun run lint`        | Run ESLint                    |
| `bun run db:generate` | Generate database migrations  |
| `bun run db:migrate`  | Apply database migrations     |
| `bun run db:push`     | Push schema to database (dev) |
| `bun run db:studio`   | Open Drizzle Studio           |

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   └── env.ts            # Environment validation
├── components/
│   ├── ui/               # shadcn UI components
│   └── forms/            # Form field components
├── db/
│   ├── index.ts          # Database client
│   └── schema/           # Drizzle schemas (by feature)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── drizzle/              # Generated migrations
```

## License

Private

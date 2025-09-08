# 🧱 Build to Learn (Backup Branch for Monorepo Project)

A modern, adaptive, and project-based learning platform designed for developers. Built using a monorepo architecture with Turborepo, this platform features multiple apps (web, dashboard, blog, forum, docs, API) and a shared UI component library.

![Project Demo](./screenshots/demo.png)

> 🚀 Live: [https://build-to-learn-web.vercel.app](https://build-to-learn-web.vercel.app)

## 📦 Monorepo Structure

This project uses **Turborepo** to manage multiple apps and packages.

![App Structure](./screenshots/architecture.png)

```txt
apps/
├── web # Main landing & learning platform (Next.js)
├── dashboard # Instructor/admin panel (Next.js)
├── blog # Developer blog (Next.js)
├── forum # Community Q\&A (Next.js)
├── docs # Platform documentation (Vuepress)
└── api # Backend API service (Nest.js)

configs/
├── eslint-config # Shared ESLint config
└── typescript-config # Shared TypeScript configs

packages/
└──ui # Shared UI components (ShadCN + Tailwind)
```

## 🛠️ Tech Stack

- 🧠 **Next.js 15** (App Router)
- ⚙️ **Nest.js** (Backend API)
- 🖌️ **Tailwind CSS + ShadCN UI**
- 🗃️ **PostgreSQL (Supabase)** (via Prisma)
- 🧪 **Jest + Supertest** (Testing)
- 🐳 **Docker** (for DB & CI/CD)
- ☁️ **GitHub Actions** (CI)
- 🌐 **Vercel** (Deployment)

## 🚀 Getting Started

> Ensure you have [PNPM](https://pnpm.io), [Node.js (>=22.x)](https://nodejs.org/en), and [Docker](https://www.docker.com/) installed.

### 1. Clone the repository

```bash
git clone https://github.com/maruf-pfc/build-to-learn.git
cd build-to-learn
```

### 2. Install dependencies

```bash
pnpm install
```

> 💡 If you face issues, try:
> `pnpm install --no-frozen-lockfile`

### 3. Setup Environment Variables

Create `.env` files in relevant apps:

#### For `apps/api/.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/build_to_learn_db
JWT_SECRET=your_secret_here
```

#### For `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Start PostgreSQL with Docker

```bash
docker compose up -d
```

> ⚠️ Make sure port `5432` is not already in use on your machine.

### Stop the Docker containers

```bash
docker compose down
```

### Rebuild and start Docker in development mode

```bash
docker compose up --build
```

### 5. Push Prisma Schema (API)

```bash
pnpm --filter api prisma db push
```

### 6. Start Development Servers

```bash
pnpm dev
```

> Starts all apps concurrently (via Turborepo). You can also run each app individually:

```bash
pnpm --filter web dev
pnpm --filter api dev
```

## 🧪 Running Tests

To run backend tests:

```bash
pnpm --filter api test
```

## 🔍 Code Quality

- Format code:

```bash
pnpm format
```

- Lint code:

```bash
pnpm lint
```

## 📦 Building for Production

```bash
pnpm build
```

## 🌍 Deployment

- Web apps (`web`, `dashboard`, etc.) are deployed via **Vercel**.
- Backend (`api`) can be deployed via **Render**, **Railway**, or **Docker VPS**.

## 📁 Useful Scripts

```bash
pnpm dev                # Start all apps for development
pnpm build              # Build all apps
pnpm lint               # Run ESLint across all packages
pnpm format             # Run Prettier
pnpm test               # Run all tests (API)
```

## 🤝 Contributing

We welcome contributions! Feel free to:

- Open issues
- Suggest features
- Submit pull requests

## 📄 License

Apache License

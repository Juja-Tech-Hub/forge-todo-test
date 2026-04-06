# Repo — Monorepo

A full-stack monorepo containing a **NestJS backend** and a **React frontend**, managed with npm workspaces.

---

## Project Structure

```
repo/
├── apps/
│   ├── backend/          # NestJS API application
│   └── frontend/         # React + Vite application
├── .gitignore
├── package.json          # Root workspace configuration
└── README.md
```

---

## Prerequisites

| Tool | Minimum Version |
|------|-----------------|
| Node.js | 18.x |
| npm | 9.x |

---

## Getting Started

### 1. Install all dependencies

```bash
npm install
```

### 2. Start development servers

```bash
# Start both backend and frontend in watch mode
npm run dev

# Start backend only
npm run dev --workspace=apps/backend

# Start frontend only
npm run dev --workspace=apps/frontend
```

### 3. Build for production

```bash
npm run build
```

### 4. Run tests

```bash
# Run tests across all workspaces
npm run test

# Run monorepo structure tests
npm run test:root
```

---

## Applications

### Backend (`apps/backend`)

- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** TypeScript
- **Package name:** `@repo/backend`

See [`apps/backend/README.md`](./apps/backend/README.md) for details.

### Frontend (`apps/frontend`)

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Package name:** `@repo/frontend`

See [`apps/frontend/README.md`](./apps/frontend/README.md) for details.

---

## Workspace Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all apps in development mode |
| `npm run build` | Build all apps for production |
| `npm run test` | Run all test suites |
| `npm run lint` | Lint all apps |
| `npm run clean` | Remove all build artifacts and node_modules |

---

## Contributing

1. Create a feature branch from `main`.
2. Follow the commit message convention: `type(scope): message`.
3. Open a pull request and ensure all CI checks pass.

---

## License

MIT

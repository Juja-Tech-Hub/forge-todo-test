# Forge Todo Test

## Overview

A full-stack todo application built with a monorepo architecture.

### Tech Stack
- **Backend**: NestJS (TypeScript)
- **Frontend**: React + Vite (TypeScript)
- **Monorepo**: npm workspaces

### Repository Structure

```
forge-todo-test/
├── apps/
│   ├── backend/          # NestJS API server
│   └── frontend/         # React + Vite client
├── package.json          # Root workspace config
├── .gitignore
└── README.md
```

### Getting Started

#### Prerequisites
- Node.js >= 18
- npm >= 9

#### Install Dependencies

```bash
npm install
```

#### Development

Run the backend:
```bash
npm run dev:backend
```

Run the frontend:
```bash
npm run dev:frontend
```

#### Testing

Run all tests:
```bash
npm test
```

Run backend tests:
```bash
npm run test:backend
```

Run frontend tests:
```bash
npm run test:frontend
```

#### Build

```bash
npm run build:backend
npm run build:frontend
```

### Features
- Add, edit, and delete tasks
- Mark tasks as complete
- Persistent storage

### Contributing

Feel free to contribute by opening issues or pull requests.

### License

MIT License

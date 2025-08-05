# Backend - Task Management System

## Pré-requisitos

- Node.js v18+
- Docker e Docker Compose

## Instalação

```bash
cd backend
npm install


cd ../postgres
docker compose up -d


cd ../backend
npx drizzle-kit push

npm run start:dev

A API estará disponível em http://localhost:3000/tasks
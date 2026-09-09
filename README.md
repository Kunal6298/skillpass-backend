# ⚙️ Skillpass Backend — Express 5, Prisma & Clean Architecture

![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-5.1-black?style=for-the-badge&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-6.9-2D3748?style=for-the-badge&logo=prisma)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)
[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions)](#)

The robust, scalable backend powering **Skillpass**. Implements **Clean Architecture** (Domain, Use Cases, Interfaces, Infrastructure), **Prisma ORM**, Google Gemini AI, Razorpay payments, and WebSockets.

---

## 🏛️ Architecture Overview

The codebase is organized according to **Clean Architecture / Use-Case Driven Design**:

`
src/
├── entities/       # Enterprise business rules & core models
├── IReps/          # Repository interfaces (Contracts)
├── InfraReps/      # Infrastructure layer (Prisma & MySQL implementations)
├── UseCases/       # Application business rules (1 file per use case)
├── Interfaces/     # Controllers & Express Route definitions
├── middlewares/    # Authentication & JWT validation
└── utils/          # Gemini AI client, Nodemailer, Cookies & Signatures
`

---

## 🐳 Docker & Containerization

### Run with Docker Compose (Database + API):
`ash
docker compose up --build
`
This automatically boots:
- A MySQL 8.0 instance on port 3306
- The Express Backend API on port 5000

---

## 🛠️ Local Development

### 1. Install dependencies
`ash
npm install
`

### 2. Configure Environment
Copy .env.example to .env and configure your database and credentials:
`ash
cp .env.example .env
`

### 3. Generate Prisma Client & Run Migrations
`ash
npx prisma generate
npx prisma migrate dev
`

### 4. Start Server
`ash
npm run dev
`

---

## 🚀 CI/CD Pipeline
Continuous Integration is configured via **GitHub Actions** (.github/workflows/ci.yml) to automatically compile TypeScript, generate Prisma models, and test Docker container builds on every commit.

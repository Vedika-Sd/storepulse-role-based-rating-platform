## Assignment Explanation

What this app actually is

It's a store rating platform — think of it like a mini Google Reviews, but scoped to just ratings (1-5 stars) for stores, with three different types of users who each see a different version of the app after logging in. This is a classic "role-based access control" (RBAC) system — a very common real-world pattern, so this is a solid interview-portfolio piece too.

The three roles, in plain terms
System Administrator — the god-mode user. Creates stores, creates other users (including other admins), and sees platform-wide stats (total users/stores/ratings). Basically a CRUD + dashboard admin panel.
Normal User — the public-facing user. Signs themselves up, browses stores, searches, and rates stores. Can edit their own rating later.
Store Owner — a narrower dashboard. Doesn't manage stores or users — just sees who rated their store and their average rating.

Login is unified — one login page, but what you see after logging in depends on your role. That means your JWT/session needs to carry a role field, and your frontend needs route guards per role, and your backend needs middleware that checks role before allowing certain endpoints.

Core entities (this maps directly to your DB schema)
User: id, name, email, password (hashed), address, role (admin/user/store_owner)
Store: id, name, email, address, owner_id (FK → User, only if role=store_owner), created_at
Rating: id, user_id (FK), store_id (FK), rating_value (1–5), created_at/updated_at

## Folder Strcuture

xroxiler_task/
├── backend/
│ ├── prisma/
│ │ ├── schema.prisma # User, Store, Rating models
│ │ └── migrations/
│ ├── src/
│ │ ├── config/db.ts
│ │ ├── middleware/
│ │ │ ├── auth.ts # requireAuth
│ │ │ └── requireRole.ts
│ │ ├── controllers/
│ │ │ ├── auth.controller.ts
│ │ │ ├── admin.controller.ts
│ │ │ ├── user.controller.ts
│ │ │ ├── store.controller.ts
│ │ │ └── rating.controller.ts
│ │ ├── routes/
│ │ ├── services/
│ │ │ ├── sentiment.service.ts
│ │ │ └── anomaly.service.ts
│ │ ├── validators/ # zod or express-validator schemas
│ │ ├── utils/
│ │ └── index.ts
│ ├── .env
│ ├── package.json
│ └── tsconfig.json
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Login.tsx / Signup.tsx
│ │ │ ├── admin/ (Dashboard, Users, Stores)
│ │ │ ├── user/ (StoreList, MyRatings)
│ │ │ └── owner/ (Dashboard)
│ │ ├── components/
│ │ ├── context/AuthContext.tsx
│ │ ├── api/axios.ts
│ │ ├── routes/ProtectedRoute.tsx
│ │ └── App.tsx
│ ├── .env
│ └── package.json
└── README.md

## installation instructions

Node.js LTS (v20+) — check with node -v

- version = v22.17.0

Neon account (neon.tech, free, no card) → create Postgres project → copy connection string. This is your DB, no local install needed.

- neon connection string = postgresql://neondb_owner:npg_qA9hzOLxMrC3@ep-icy-water-ayv1murk-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

Backend: npm init, then express, prisma, @prisma/client, bcrypt, jsonwebtoken, cors, dotenv, zod (or express-validator), sentiment
Frontend: npm create vite@latest frontend -- --template react-ts, then react-router-dom, axios, tailwindcss
Render account for backend deploy (connect GitHub repo)
Vercel account for frontend deploy (connect GitHub repo)
Postman/Thunder Client for API testing as you build

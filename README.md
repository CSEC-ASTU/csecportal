# CSEC Portal

A community portal with a Next.js frontend and an Express + TypeScript backend using Prisma (MongoDB) and Passport for authentication.

This README provides a concise overview, development/run instructions, important scripts, and debugging tips.

---

## Table of contents

- Project overview
- Tech stack
- Repository layout
- Requirements
- Quick start (development)
- Build & production
- Environment variables (example)
- Database (Prisma + Mongo)
- Helpful scripts
- Common debugging steps
- Contributing
- License

---

## Project overview

CSEC Portal is a two-part application:

- `api/` — Express + TypeScript backend exposing REST endpoints (members, divisions, articles, sessions, attendance, resources, elections, auth, etc.). Uses Passport (local) for authentication and Prisma for DB access (MongoDB).
- `client/` — Next.js frontend (React) that serves the landing pages, member UI, and admin interfaces.

The project supports email (SMTP/SendGrid) and file uploads (Cloudinary + multer).

---

## Tech stack

- Backend: Node.js, TypeScript, Express, Passport, Prisma (MongoDB)
- Frontend: Next.js (React), Tailwind CSS (utility classes), client-side components
- Authentication: Session-based (express-session) + Passport local strategy
- Storage / services: Cloudinary (uploads), Nodemailer / SendGrid (email)
- DB: MongoDB (via Prisma)

---

## Repository layout

- `/api` — backend source, Prisma schema, server bootstrap, routes, controllers, services
- `/client` — Next.js frontend source
- `/prisma` or `/api/prisma` — Prisma schema (if present)
- `/scripts` — helpful maintenance/diagnostic scripts

---

## Requirements

- Node.js (v16+ recommended)
- npm (or yarn)
- A MongoDB instance (Atlas or self-hosted)
- Environment variables configured (see below)

---

## Quick start (development)

Open two terminals: one for backend and one for frontend.

1. Backend

```bash
cd api
npm install
# generate Prisma client (if you change schema or after fresh install)
npx prisma generate
# run in dev
npm run dev
```

2. Frontend

```bash
cd client
npm install
npm run dev
# open http://localhost:3000
```

Notes:
- Backend dev script typically uses `ts-node`/`nodemon` to run TypeScript directly.
- Backend server typically listens on `PORT` (default in .env).

---

## Build & production

1. Backend

```bash
cd api
npm run build
npm start
```

2. Frontend

```bash
cd client
npm run build
npm start
```

Deploy according to your hosting provider. Ensure all environment variables are set in production and that you use a persistent session store (Redis, etc.) instead of express-session MemoryStore.

---

## Environment variables (example)

Create `.env` in `api/` (or set env vars in your hosting environment):

```
DATABASE_URL="mongodb+srv://<user>:<pass>@cluster.example.mongodb.net/csec?retryWrites=true&w=majority"
PORT=5500
NODE_ENV=development
SESSION_SECRET="a-secure-secret"
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=secret
SENDGRID_API_KEY=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Adjust for your infrastructure. In production, do not use the default fallback session secret.

---

## Database (Prisma + Mongo)

- Prisma schema is located under `api/prisma/schema.prisma` (or `prisma/`).
- After editing schema run:

```bash
cd api
npx prisma format
npx prisma validate
npx prisma generate
```

- Prisma + Mongo has caveats: migrations and cascade behaviors differ from relational DBs. Review schema types (ObjectId vs uuid) and ensure IDs/relations are consistent.

---

## Helpful scripts (dev)

Several helper scripts exist in `api/scripts` to inspect or manage users:

- Find a user by email:
```bash
cd api
node scripts/find-user.js <email>
```

- Verify a plaintext password against a stored hash:
```bash
cd api
node scripts/check-password.js <email> <plaintextPassword>
```

- Promote a user to PRESIDENT (demotes other presidents first):
```bash
cd api
node scripts/promote-to-president.js <email>
```

- Create president script (if present):
```bash
cd api
node create-president.js
```

Important: ensure scripts run from the `api/` folder so they load the correct `.env` and connect to the right DB.

---

## Common debugging steps (auth / login issues)

If login fails for an account you created:

1. Confirm the user exists in the same database the server uses:
   - Run `node scripts/find-user.js klaus@gmail.com` from `api/` and check `email`, `role`, `status`, and `isEmailVerified`.

2. Verify password:
   - Run `node scripts/check-password.js klaus@gmail.com 1029qpwo` to confirm the plaintext password matches the stored hash.

3. Confirm environment parity:
   - When you ran `node create-president.js`, it may have read a different `.env` depending on your working directory. Ensure the server and the script use the same `DATABASE_URL`.

4. Check server logs:
   - The server logs Passport lookup and password comparison outcomes in development mode. Watch the backend console when attempting login.

5. Role and status:
   - Some flows expect a `PRESIDENT` role or `status: ACTIVE`. Use `promote-to-president.js` if you need to change role safely.

6. DB connectivity:
   - If scripts throw connection errors, verify `DATABASE_URL`, network access (IP whitelist for Atlas), and credentials.

---

## Security & operational notes

- Do not use express-session MemoryStore in production. Configure a persistent session store (Redis, etc.).
- Ensure `SESSION_SECRET` is set in production and is not the default hard-coded value.
- Add rate limiting to public auth endpoints to prevent brute force attacks.
- Add CSRF protection if using session-based cookies for state-changing operations.
- Audit repo for any committed secrets (rotate if found).

---

## Contributing

- Fork the repo and open pull requests for changes.
- Run tests (if present) and ensure TypeScript builds clean: `npm run build` (in both `api` and `client`).
- Keep changes small and focused; include a short description of the problem and the fix.

---

## License

Add your license here (e.g., MIT) or set the license used by the project.

---

If you want, I can:
- Add this README to the repository (create `/README.md`) now.
- Generate a `.env.example` file with the vars shown above.
- Create a short `api/README.md` and `client/README.md` with more detailed run
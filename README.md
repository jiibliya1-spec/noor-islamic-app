# Noor — Islamic App

A full-featured Islamic web application built with React + Vite (frontend) and Node.js + Express (backend).

## Features

- **Home** — Live clock, Hijri date, verse of the day, prayer times widget
- **Quran** — All 114 surahs with Arabic text, English translation, and audio player (3 reciters)
- **Prayer Times** — Geolocation-based prayer times via aladhan.com API with calculation method selection
- **Adhkar & Tasbeeh** — Morning, evening, sleep, after-prayer, and daily dhikr with interactive tasbeeh counter
- **Islamic Calendar** — Hijri calendar with Islamic holidays highlighted, plus personal event management
- **Mosque Finder** — Find nearby mosques using OpenStreetMap
- **Dashboard** — Personal spiritual journey tracker
- **Settings** — 4-language switcher (English, Arabic, French, German) with full RTL support for Arabic
- **Auth** — Register, login, logout with JWT

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, shadcn/ui, Wouter, TanStack Query |
| Backend | Node.js, Express, Fastify-pino logging |
| Database | PostgreSQL via Drizzle ORM |
| Auth | JWT + Node.js crypto (scrypt) |
| External APIs | alquran.cloud, aladhan.com, OpenStreetMap, Nominatim |
| Monorepo | pnpm workspaces |

---

## Local Development

### Prerequisites
- Node.js 20+
- pnpm 9+
- PostgreSQL database

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/noor-islamic-app.git
cd noor-islamic-app

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET

# 4. Push the database schema
pnpm --filter @workspace/db run db:push

# 5. Start the API server
pnpm --filter @workspace/api-server run dev

# 6. Start the frontend (in a separate terminal)
BASE_PATH=/ PORT=5173 pnpm --filter @workspace/noor run dev
```

Open http://localhost:5173 in your browser.

---

## Deploy to Vercel (Frontend)

The frontend is a pure static SPA — deploy it to Vercel in one click.

### Steps

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your GitHub repo.
3. Vercel auto-detects the `vercel.json` at the root. No changes needed.
4. Add these **Environment Variables** in Vercel project settings:

| Variable | Value |
|---|---|
| `BASE_PATH` | `/` |
| `VITE_API_URL` | Your backend API URL (see below) |

5. Click **Deploy**.

> The `vercel.json` sets the build command, output directory, and SPA rewrite rule automatically.

---

## Deploy the API to Railway / Render

The backend needs a persistent Node.js server and a PostgreSQL database.

### Railway (recommended)

1. Create a new Railway project.
2. Add a **PostgreSQL** plugin — Railway gives you `DATABASE_URL` automatically.
3. Deploy the repo: set the **Start Command** to:
   ```
   pnpm --filter @workspace/api-server run start
   ```
4. Add environment variables:
   ```
   DATABASE_URL=<from Railway PostgreSQL>
   JWT_SECRET=<generate with: openssl rand -hex 32>
   PORT=8080
   ```
5. Copy the Railway public URL (e.g. `https://noor-api.railway.app`) and set it as `VITE_API_URL` in your Vercel project.

### Render

1. New **Web Service** → connect your GitHub repo.
2. Build Command: `pnpm install && pnpm --filter @workspace/api-server run build`
3. Start Command: `node artifacts/api-server/dist/index.mjs`
4. Add the same environment variables as above.

---

## Environment Variables Reference

| Variable | Where | Description |
|---|---|---|
| `DATABASE_URL` | API server | PostgreSQL connection string |
| `JWT_SECRET` | API server | Secret for signing JWT tokens |
| `PORT` | API server | HTTP port (default 8080) |
| `BASE_PATH` | Frontend (build) | Vite base path (use `/`) |
| `VITE_API_URL` | Frontend (build) | Backend API base URL |

---

## Project Structure

```
noor-islamic-app/
├── artifacts/
│   ├── noor/              # React + Vite frontend
│   │   ├── src/
│   │   │   ├── pages/     # Home, Quran, Prayer Times, Adhkar, Calendar, Mosques...
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── lib/       # i18n, utils
│   │   └── vite.config.ts
│   └── api-server/        # Express backend
│       └── src/
│           ├── routes/    # auth, user, adhkar, favorites, calendar
│           ├── lib/       # auth helpers, logger
│           └── middlewares/
├── lib/
│   ├── db/                # Drizzle ORM schema + client
│   ├── api-spec/          # OpenAPI spec
│   ├── api-client-react/  # Generated React Query hooks
│   └── api-zod/           # Generated Zod validators
├── vercel.json            # Vercel deployment config
└── .env.example
```

---

## License

MIT

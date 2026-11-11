# CoolBridge Mechanical: commercial HVAC contracting site

A website for selling multi-year HVAC maintenance and replacement contracts to shopping centers, office complexes and factories. "CoolBridge Mechanical" is a placeholder name.

```
hvac-contracts/
├── backend/    Express + Mongoose REST API (port 5000)
└── frontend/   Next.js 15 (App Router, TypeScript) + Tailwind CSS 4 (port 3000)
```

## Run it

Two terminals, one per folder.

```bash
# 1. Backend
cd backend
npm install
cp .env.example .env        # paste your MongoDB connection string into MONGODB_URI
npm run seed                # optional: loads sample services and testimonials
npm run dev                 # http://localhost:5000

# 2. Frontend
cd frontend
npm install
cp .env.example .env.local  # BACKEND_URL defaults to http://localhost:5000
npm run dev                 # http://localhost:3000
```

Production: `npm run build && npm start` in `frontend/`, and `npm start` in `backend/`.

Without a connection string both apps still start. The page shows built-in sample services and testimonials, and the quote form shows "Database not connected" until `MONGODB_URI` is set.

## How the two halves connect

The browser only talks to the Next.js origin. `frontend/next.config.ts` rewrites `/api/*` to `BACKEND_URL`, so there is no CORS setup and the backend address never appears in client code. Server components also fetch services and testimonials from the backend directly and refresh them every 60 seconds.

## Backend (`backend/src`)

| Path | Purpose |
|---|---|
| `config/` | `env.js` reads `.env`; `db.js` connects to MongoDB |
| `models/` | `Service`, `Inquiry` (with a `status` field: new, contacted, quoted, won, lost), `Testimonial` |
| `controllers/` | Request handlers for each resource |
| `routes/index.js` | `GET /api/health`, `GET /api/services`, `GET /api/testimonials`, `POST /api/inquiries` |
| `middleware/` | `requireDb` (503 when no database), rate limiting on quote requests, error handling |
| `seed/` | Sample data and the `npm run seed` script |

Security basics are on: `helmet`, a CORS allow-list (`CORS_ORIGIN`), a 50 KB body limit, and 10 quote requests per 15 minutes per IP.

## Frontend (`frontend/src`)

| Path | Purpose |
|---|---|
| `app/` | `layout.tsx`, `page.tsx` (fetches data on the server), `globals.css` (Tailwind theme tokens) |
| `components/` | One file per page section, plus `ContractPlanner` and `QuoteForm` (client components) |
| `components/ui/Segmented.tsx` | Accessible segmented radio control |
| `context/PlanContext.tsx` | Shares the planner's choices with the quote form |
| `lib/planner.ts` | Planner rules: visit frequency and replacement phases |
| `lib/api.ts`, `lib/fallback.ts` | Backend fetching with built-in fallback content |

Colors and fonts are Tailwind theme tokens in `globals.css` (`ink`, `chill`, `flame` and so on). The font is Archivo, bundled through `@fontsource-variable/archivo`, so it works offline.

## Before launch

- The planner's visit frequencies (monthly for shopping centers and offices, every two weeks for factories) are assumptions. Change them in `frontend/src/lib/planner.ts`.
- Testimonials in `backend/src/seed/data.js` are placeholders. Replace them with real client quotes.
- There is no admin login. View leads in the `inquiries` collection in MongoDB, or add an authenticated admin route before exposing lead data.

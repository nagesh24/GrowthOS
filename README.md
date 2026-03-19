# GrowthOS — SaaS Growth Dashboard

A production-ready Next.js 14 + Supabase app with auth, real-time data,
leads CRM, goal tracking, and notifications.

---

## Stack

| Layer      | Tech                         |
|------------|------------------------------|
| Framework  | Next.js 14 (App Router)      |
| Styling    | Tailwind CSS                 |
| Charts     | Recharts                     |
| Backend    | Supabase (Postgres + Auth)   |
| Deploy     | Vercel (free tier)           |

---

## Quick Start (5 minutes)

### 1 — Install dependencies
```bash
npm install
```

### 2 — Create Supabase project
1. Go to https://supabase.com and sign up (free)
2. Click "New project"
3. Go to **Settings → API** and copy:
   - `Project URL`
   - `anon public` key

### 3 — Set environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### 4 — Set up the database
1. In Supabase dashboard, click **SQL Editor**
2. Paste the contents of `supabase-schema.sql`
3. Click **Run**

### 5 — Run the app
```bash
npm run dev
```
Open http://localhost:3000 — sign up and start using GrowthOS!

---

## Deploy to Vercel (free)

```bash
npm install -g vercel
vercel
```
Add your two env variables in the Vercel dashboard under
**Project → Settings → Environment Variables**, then redeploy.

Or connect your GitHub repo at vercel.com for auto-deploy on every push.

---

## Project Structure

```
growthOS/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Tailwind + global styles
│   ├── page.tsx            # Redirect to auth or dashboard
│   ├── auth/
│   │   ├── page.tsx        # Login / signup page
│   │   └── callback/
│   │       └── route.ts    # Supabase OAuth callback
│   └── dashboard/
│       └── page.tsx        # Main dashboard (protected)
├── components/
│   └── dashboard/
│       ├── Topbar.tsx
│       ├── Sidebar.tsx
│       ├── OverviewTab.tsx
│       ├── LeadsTab.tsx
│       ├── GoalsTab.tsx
│       └── NotificationsPanel.tsx
├── lib/
│   └── supabase.ts         # Supabase browser client
├── types/
│   └── index.ts            # TypeScript types
├── supabase-schema.sql     # Database setup script
├── .env.example            # Environment variable template
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Adding Features

- **Email sequences** — add Resend (`npm install resend`) and create `/app/api/email/route.ts`
- **Stripe billing** — add `stripe` package and `/app/api/billing/route.ts`
- **Real-time notifications** — use `supabase.channel()` in a `useEffect` for live updates
- **Team collaboration** — add a `workspaces` table and update RLS policies

---

## Environment Variables

| Variable                          | Where to find it              |
|-----------------------------------|-------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`        | Supabase → Settings → API     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Supabase → Settings → API     |

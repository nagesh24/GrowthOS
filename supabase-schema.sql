-- ============================================================
-- GrowthOS — Supabase SQL Schema
-- Run this in your Supabase SQL Editor (supabase.com/dashboard)
-- ============================================================

-- LEADS TABLE
create table if not exists leads (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users on delete cascade not null,
  company     text not null,
  contact     text default '',
  acv         integer default 0,
  stage       text default 'cold' check (stage in ('cold','warm','hot','won')),
  created_at  timestamptz default now()
);

-- GOALS TABLE
create table if not exists goals (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users on delete cascade not null,
  name        text not null,
  progress    integer default 0 check (progress >= 0 and progress <= 100),
  category    text default 'Revenue',
  due         text default 'Q2 2026',
  created_at  timestamptz default now()
);

-- NOTIFICATIONS TABLE
create table if not exists notifications (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users on delete cascade not null,
  title       text not null,
  type        text default 'info' check (type in ('success','warning','info','danger')),
  read        boolean default false,
  created_at  timestamptz default now()
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────
alter table leads        enable row level security;
alter table goals        enable row level security;
alter table notifications enable row level security;

-- Each user can only see and modify their own data
create policy "leads: user owns"         on leads         for all using (auth.uid() = user_id);
create policy "goals: user owns"         on goals         for all using (auth.uid() = user_id);
create policy "notifications: user owns" on notifications for all using (auth.uid() = user_id);

-- ── INDEXES ────────────────────────────────────────────────
create index if not exists leads_user_id_idx         on leads        (user_id);
create index if not exists goals_user_id_idx         on goals        (user_id);
create index if not exists notifications_user_id_idx on notifications (user_id);

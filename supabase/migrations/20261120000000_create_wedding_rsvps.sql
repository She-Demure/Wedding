create table if not exists public.wedding_rsvps (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  attendance text not null check (attendance in ('accept', 'decline')),
  created_at timestamptz not null default now()
);

alter table public.wedding_rsvps enable row level security;

drop policy if exists "Allow guests to submit wedding RSVPs"
  on public.wedding_rsvps;

create policy "Allow guests to submit wedding RSVPs"
  on public.wedding_rsvps
  for insert
  to anon, authenticated
  with check (true);

revoke all on public.wedding_rsvps from anon, authenticated;
grant insert (full_name, attendance) on public.wedding_rsvps to anon, authenticated;

create table public.website_enquiries (
id uuid primary key,
created_at timestamptz not null default now(),
kind text not null check (kind in ('membership','partnership')),
name text not null check (length(trim(name)) between 1 and 200),
email text not null check (length(email) between 3 and 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'),
details jsonb not null check (jsonb_typeof(details) = 'object' and octet_length(details::text) <= 16000)
);
alter table public.website_enquiries enable row level security;
revoke all on public.website_enquiries from anon, authenticated;
grant insert (id,kind,name,email,details) on public.website_enquiries to anon,authenticated;
create policy website_enquiries_insert on public.website_enquiries for insert to anon,authenticated with check (true);

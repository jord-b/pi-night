-- Create the pie commitments table
create table if not exists pie_commitments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  pie_name text not null,
  pie_type text not null check (pie_type in ('sweet', 'savory', 'other')),
  serves text not null,
  notes text
);

-- Enable Row Level Security
alter table pie_commitments enable row level security;

-- Allow anyone to view all pies (this is a public event!)
create policy "Anyone can view pies"
  on pie_commitments for select
  using (true);

-- Allow anyone to add a pie commitment
create policy "Anyone can add a pie"
  on pie_commitments for insert
  with check (true);

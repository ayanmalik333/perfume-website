-- Create the table for contact form inquiries
create table contact_inquiries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  email text not null,
  phone text,
  inquiry_type text not null,
  preferred_notes text,
  message text not null,
  status text default 'pending'
);

-- Enable Row Level Security (RLS)
alter table contact_inquiries enable row level security;

-- Create an RLS policy to allow anonymous/public inserts
create policy "Allow public inserts"
on contact_inquiries
for insert
to public
with check (true);

-- Create an RLS policy to allow authenticated users to view the data
create policy "Allow authenticated selects"
on contact_inquiries
for select
to authenticated
using (true);

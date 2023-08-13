create table
users (
id uuid primary key references auth.users(id) on delete cascade,
email text UNIQUE,
created_at timestamp with time zone not null default now(),
updated_at timestamp with time zone not null default now()
);

alter table users enable row level security;
create policy "Can only access myself" on users
  for all
  using (auth.uid() = id)
  with check (auth.uid() = id);
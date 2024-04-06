CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS scores (
  id uuid default uuid_generate_v4(),

  player_name varchar not null,
  score integer not null default 0,
  created_at timestamptz not null,

  primary key (id)
);
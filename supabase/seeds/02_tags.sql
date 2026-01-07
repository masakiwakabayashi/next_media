-- Seed data for public.tags
truncate table public.tags restart identity cascade;

insert into public.tags (id, name) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'sushi'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'yakitori'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'ramen'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'late-night')
on conflict (id) do update set
  name = excluded.name;

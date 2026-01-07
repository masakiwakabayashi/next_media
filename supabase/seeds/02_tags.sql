insert into public.tags (id, name) values
  ('fea341c8-78c9-4f44-9893-2af9efc47adc', 'sushi'),
  ('c8f1bb13-3ffb-4d7a-a5f6-df5c8a7fb87d', 'coffee'),
  ('09d42d75-7b6f-4cb3-bdf1-1f9c6dbd6b5a', 'ramen'),
  ('d6338d68-9a97-459d-8c7a-772316bed112', 'dessert'),
  ('f4478b4d-ec2b-4a46-9f52-c293e2ca9d7a', 'date-night')
on conflict (id) do update set name = excluded.name;

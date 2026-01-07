insert into public.restaurant_photos (id, restaurant_id, url) values
  (
    '1f93b7f8-6e41-4c54-9f54-3da6dfd5f901',
    '9b3c7e63-221b-4f7c-98b0-3f857c114c8a',
    'https://images.example.com/sushi_hayashi_counter.webp'
  ),
  (
    'b6d783a3-9917-45a5-8b17-13e8f6ca1767',
    '9b3c7e63-221b-4f7c-98b0-3f857c114c8a',
    'https://images.example.com/sushi_hayashi_omakase.webp'
  ),
  (
    '2bfc97f0-6756-41fd-9bc3-3efe474014b6',
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'https://images.example.com/cafe_aurora_brunch.webp'
  ),
  (
    '3d2c6a75-f3d6-4181-b91f-8a8953eb0efe',
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'https://images.example.com/cafe_aurora_latte.webp'
  ),
  (
    '1ca4fa6e-86df-4bd6-848f-a25cf205b59f',
    'b1d3594e-1c53-4482-b7bd-9bab7c56a1fa',
    'https://images.example.com/ramen_atlas_bowl.webp'
  )
on conflict (id) do update set url = excluded.url;

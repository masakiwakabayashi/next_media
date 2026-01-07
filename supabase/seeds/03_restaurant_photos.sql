-- Seed data for public.restaurant_photos
truncate table public.restaurant_photos restart identity cascade;

insert into public.restaurant_photos (id, restaurant_id, url) values
  (
    '44444444-4444-4444-4444-444444444441',
    '11111111-1111-1111-1111-111111111111',
    'https://example.com/photos/sushi-kanda-counter.jpg'
  ),
  (
    '44444444-4444-4444-4444-444444444442',
    '11111111-1111-1111-1111-111111111111',
    'https://example.com/photos/sushi-kanda-omakase.jpg'
  ),
  (
    '55555555-5555-5555-5555-555555555551',
    '22222222-2222-2222-2222-222222222222',
    'https://example.com/photos/yakitori-hashimoto-grill.jpg'
  ),
  (
    '66666666-6666-6666-6666-666666666661',
    '33333333-3333-3333-3333-333333333333',
    'https://example.com/photos/ramen-tsubame-bowl.jpg'
  )
on conflict (id) do update set
  restaurant_id = excluded.restaurant_id,
  url = excluded.url;

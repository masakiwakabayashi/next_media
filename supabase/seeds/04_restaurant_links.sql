-- Seed data for public.restaurant_links
truncate table public.restaurant_links restart identity cascade;

insert into public.restaurant_links (id, restaurant_id, link_type, url) values
  (
    '77777777-7777-7777-7777-777777777771',
    '11111111-1111-1111-1111-111111111111',
    'official',
    'https://sushi-kanda.example.jp/'
  ),
  (
    '77777777-7777-7777-7777-777777777772',
    '11111111-1111-1111-1111-111111111111',
    'tabelog',
    'https://tabelog.com/tokyo/SushiKanda'
  ),
  (
    '88888888-8888-8888-8888-888888888881',
    '22222222-2222-2222-2222-222222222222',
    'official',
    'https://yakitori-hashimoto.example.jp/'
  ),
  (
    '88888888-8888-8888-8888-888888888882',
    '33333333-3333-3333-3333-333333333333',
    'other',
    'https://ramen-tsubame.example.jp/blog'
  )
on conflict (id) do update set
  restaurant_id = excluded.restaurant_id,
  link_type = excluded.link_type,
  url = excluded.url;

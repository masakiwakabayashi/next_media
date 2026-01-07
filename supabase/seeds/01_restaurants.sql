-- Seed data for public.restaurants
truncate table public.restaurants restart identity cascade;

insert into public.restaurants (
  id,
  wish_status,
  rating,
  name,
  comment,
  address,
  google_maps_embed_url,
  business_days_note
) values
  (
    '11111111-1111-1111-1111-111111111111',
    'want_to_go',
    5,
    'Sushi Kanda',
    '季節の魚介を使ったおまかせコースが看板メニュー。',
    '東京都中央区銀座5-1-1',
    'https://maps.google.com/?q=Sushi+Kanda',
    '火〜日 17:00-23:00 / 月曜定休'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'repeat',
    4,
    'Yakitori Hashimoto',
    '炭火焼きの香りが豊かな焼き鳥と日本酒を楽しめる。',
    '東京都渋谷区代官山町2-11',
    'https://maps.google.com/?q=Yakitori+Hashimoto',
    '水〜月 16:00-24:00 / 火曜定休'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'good',
    3,
    'Ramen Tsubame',
    '背脂醤油ベースの燕三条系ラーメン。深夜まで営業。',
    '東京都新宿区歌舞伎町1-9-3',
    'https://maps.google.com/?q=Ramen+Tsubame',
    '年中無休 11:00-28:00'
  )
on conflict (id) do update set
  wish_status = excluded.wish_status,
  rating = excluded.rating,
  name = excluded.name,
  comment = excluded.comment,
  address = excluded.address,
  google_maps_embed_url = excluded.google_maps_embed_url,
  business_days_note = excluded.business_days_note,
  updated_at = now();

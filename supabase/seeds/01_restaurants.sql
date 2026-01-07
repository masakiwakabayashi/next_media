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
    '9b3c7e63-221b-4f7c-98b0-3f857c114c8a',
    'repeat',
    5,
    'Sushi Hayashi',
    'Seasonal omakase counter with focus on local catch and aged tuna.',
    '1-2-3 Ginza, Chuo-ku, Tokyo',
    'https://www.google.com/maps/embed?pb=sushi_hayashi',
    'Closed on Mondays; last order 21:30.'
  ),
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'good',
    4,
    'Cafe Aurora',
    'All-day cafe known for single-origin pour-overs and brunch plates.',
    '5-11-8 Jingumae, Shibuya-ku, Tokyo',
    'https://www.google.com/maps/embed?pb=cafe_aurora',
    'Open daily 08:00-20:00; brunch on weekends only.'
  ),
  (
    'b1d3594e-1c53-4482-b7bd-9bab7c56a1fa',
    'want_to_go',
    null,
    'Ramen Atlas',
    'New-school ramen spot experimenting with shellfish broth flights.',
    '2-9-14 Ebisu, Shibuya-ku, Tokyo',
    'https://www.google.com/maps/embed?pb=ramen_atlas',
    'Closed on Tuesdays; limited 40 bowls per day.'
  )
on conflict (id) do update
set
  wish_status = excluded.wish_status,
  rating = excluded.rating,
  name = excluded.name,
  comment = excluded.comment,
  address = excluded.address,
  google_maps_embed_url = excluded.google_maps_embed_url,
  business_days_note = excluded.business_days_note;

insert into public.restaurant_links (id, restaurant_id, link_type, url) values
  (
    '7d6913b3-862f-4cc7-9054-ac63d9cf95de',
    '9b3c7e63-221b-4f7c-98b0-3f857c114c8a',
    'official',
    'https://sushihayashi.example.com'
  ),
  (
    'c7b6f25d-6239-4a3d-b6ce-63bf718fc642',
    '9b3c7e63-221b-4f7c-98b0-3f857c114c8a',
    'tabelog',
    'https://tabelog.com/tokyo/A1301/A130101/0001/'
  ),
  (
    '94d33626-d271-40a1-8904-3d94a8654906',
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'official',
    'https://cafearora.example.com'
  ),
  (
    '353dd5ad-7961-4b2a-8976-df2c68363c17',
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'other',
    'https://www.instagram.com/cafearora'
  ),
  (
    'eb1d51cb-4ca0-4a65-a834-3180bbbc5907',
    'b1d3594e-1c53-4482-b7bd-9bab7c56a1fa',
    'official',
    'https://ramenatlas.example.com'
  ),
  (
    '4dfdcc12-5fa5-45f0-8782-57e4b2db09a2',
    'b1d3594e-1c53-4482-b7bd-9bab7c56a1fa',
    'rakuten',
    'https://gourmet.rakuten.co.jp/ramenatlas'
  )
on conflict (id) do update
set
  restaurant_id = excluded.restaurant_id,
  link_type = excluded.link_type,
  url = excluded.url;

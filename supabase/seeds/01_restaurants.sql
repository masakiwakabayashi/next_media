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

-- ざっくりとした場所もカラムに加える(入谷とか浅草橋とか)

  (
    '9b3c7e63-221b-4f7c-98b0-3f857c114c8a',
    'repeat',
    5,
    '肉源 六本木店',
    'ランチで食べられる焼肉と冷麺のセットがおすすめ。',
    '東京都港区六本木７丁目１５−１７ ユニ六本木ビル 2F',
    'https://maps.app.goo.gl/qQfA7vcWRgcVtCgMA',
    ''
  ),
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'repeat',
    5,
    '四川食堂KARyu 浅草橋店',
    '辛くない料理もある。美味しい。',
    '東京都台東区浅草橋１丁目２３−４ 浅草橋サンロード １階',
    'https://maps.app.goo.gl/8D4vhDByBAoBhAGv7',
    ''
  ),
  (
    'b1d3594e-1c53-4482-b7bd-9bab7c56a1fa',
    'good',
    4,
    'ツイテル(Tsui-teru!)',
    '熟成肉のお店',
    '東京都中野区中野５丁目３６−５ ヴィラＡＫ 2F',
    'https://maps.app.goo.gl/eNb4refMJipwYv5v8',
    ''
  ),
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'repeat',
    5,
    '浅草おにぎり はるちゃん',
    'ツナマヨと鶏そぼろのおにぎりが美味しかった。ねぎとろとツナマヨも美味しかった。豚汁も美味しい。',
    '',
    '',
    ''
  ),
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'good',
    4,
    'まぜはる 浅草橋',
    'ちょっと辛めだけど美味しい。',
    '',
    '',
    ''
  ),
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'repeat',
    4,
    'エスニック料理ギータ-GITA-',
    'チーズナンがめちゃくちゃ美味しい。',
    '',
    '',
    ''
  ),
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'good',
    3,
    'カレーは飲み物。 秋葉原店',
    'カツカレーは結構油っこい感じだけど美味しい。',
    '',
    '',
    ''
  ),
  -- あとは浅草付近のお店を追加する
































on conflict (id) do update
set
  wish_status = excluded.wish_status,
  rating = excluded.rating,
  name = excluded.name,
  comment = excluded.comment,
  address = excluded.address,
  google_maps_embed_url = excluded.google_maps_embed_url,
  business_days_note = excluded.business_days_note;

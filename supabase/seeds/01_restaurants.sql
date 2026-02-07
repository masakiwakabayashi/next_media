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

-- レストランではなく記事テーブルの方がいいかもしれない
-- テーブルは再度考え直す

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
  -- 追加1
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'repeat',
    5,
    'ココトモバウム',
    '米粉のバウムクーヘン。玄米のやつが特に美味しい。犬山に店舗があるけど通販もある。',
    '愛知県犬山市犬山東古券76番地',
    'https://maps.app.goo.gl/SRE1Ber2wNvauSea9',
    ''
  ),
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'good',
    3,
    'りんごぽむぽむ',
    'りんごの味がする日本酒。',
    '通販',
    'Googleマップ',
    ''
  ),
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    -- これは行ってみたいお店
    'good',
    3,
    '右翼のおかき、播磨屋本店',
    '思想が強めなおかきのお店。味は美味しいと聞いている。',
    '通販',
    'Googleマップ',
    ''
  ),
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'good',
    4,
    '上野 焼きそば 想夫恋',
    '上野にある焼きそば専門店',
    '東京都台東区上野４丁目６−７ 白鳥舎ビル 1F',
    'https://maps.app.goo.gl/YDJk6cmUi3NFRiL47',
    ''
  ),
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'repeat',
    3,
    '池袋肉劇場',
    '色々なお肉が乗ったどんぶり。美味しい。',
    '東京都豊島区東池袋１丁目２−１１',
    'https://maps.app.goo.gl/9uoRTrUXE3n1qRKS8',
    ''
  ),
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'good',
    3,
    '君に、揚げる。とんかつ',
    '浅草の田原町付近にあるとんかつのお店。ランチのチキンカツが美味しかった。',
    '東京都台東区松が谷１丁目４−６ ライオンズマンション上野松が谷 1F',
    'https://maps.app.goo.gl/A5LZWtyUMpMqm8Sw6',
    ''
  ),
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'good',
    3,
    '蔵前のピザ屋、名前は忘れた',
    '詳細',
    '住所',
    'Googleマップ',
    ''
  ),
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'good',
    3,
    '田原町付近のそばと親子丼のお店、名前は忘れた',
    '名前は忘れたけどめっちゃ美味しかった',
    '住所',
    'Google',
    ''
  ),
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'repeat',
    5,
    '極(きわみ) 新宿食肉センター極 南越谷店',
    '埼玉にある焼肉。極み。深夜ランチよく食べてたところ。レバーとピートロが美味しい。',
    '埼玉県越谷市南越谷１丁目２６−１４ KO’z-1ビル 3階',
    'https://maps.app.goo.gl/diFz6VCn1RyznG6S7',
    ''
  ),
  -- 行ってみたい
  (
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'good',
    3,
    '浅草橋のギリシャ料理',
    '詳細',
    '住所',
    'Googleマップ',
    ''
  ),



























on conflict (id) do update
set
  wish_status = excluded.wish_status,
  rating = excluded.rating,
  name = excluded.name,
  comment = excluded.comment,
  address = excluded.address,
  google_maps_embed_url = excluded.google_maps_embed_url,
  business_days_note = excluded.business_days_note;

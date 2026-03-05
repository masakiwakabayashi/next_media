-- ブログ関連テーブルのシーダー
-- お店と商品(お菓子やお酒)を同じ記事という括りにしたいので、こういう構成にする

-- 著者
insert into public.authors (
  id,
  display_name,
  bio,
  avatar_url
) values
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    '山田太郎',
    'フードライター。東京を中心にグルメ情報を発信中。',
    null
  )
on conflict (id) do update
set
  display_name = excluded.display_name,
  bio = excluded.bio,
  avatar_url = excluded.avatar_url;

-- カテゴリ
insert into public.categories (
  id,
  name,
  slug
) values
  (
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'また行きたい！',
    'repeat'
  ),
  (
    'd4e5f6a7-b8c9-0123-def1-234567890123',
    'よかった！',
    'good'
  ),
  (
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '行ってみたい！',
    'want_to_go'
  )
on conflict (id) do update
set
  name = excluded.name,
  slug = excluded.slug;

-- タグ
insert into public.tags (
  id,
  name,
  slug
) values
  (
    'f6a7b8c9-d0e1-2345-f123-456789012345',
    '焼肉',
    'yakiniku'
  ),
  (
    'a7b8c9d0-e1f2-3456-0123-567890123456',
    'ランチ',
    'lunch'
  ),
  (
    'b8c9d0e1-f2a3-4567-1234-678901234567',
    'カレー',
    'curry'
  ),
  (
    'c9d0e1f2-a3b4-5678-2345-789012345678',
    'スイーツ',
    'sweets'
  ),
  (
    'd0e1f2a3-b4c5-6789-0123-456789012345',
    '中華',
    'chinese'
  ),
  (
    'e1f2a3b4-c5d6-7890-1234-567890123456',
    'おにぎり',
    'onigiri'
  ),
  (
    'f2a3b4c5-d6e7-8901-2345-678901234567',
    'まぜそば',
    'mazesoba'
  ),
  (
    'a3b4c5d6-e7f8-9012-3456-789012345678',
    'エスニック',
    'ethnic'
  ),
  (
    'b4c5d6e7-f8a9-0123-4567-890123456789',
    '日本酒',
    'sake'
  ),
  (
    'c5d6e7f8-a9b0-1234-5678-901234567890',
    'お菓子',
    'okashi'
  ),
  (
    'd6e7f8a9-b0c1-2345-6789-012345678901',
    '焼きそば',
    'yakisoba'
  ),
  (
    'e7f8a9b0-c1d2-3456-7890-123456789012',
    '丼もの',
    'donburi'
  ),
  (
    'f8a9b0c1-d2e3-4567-8901-234567890123',
    'とんかつ',
    'tonkatsu'
  ),
  (
    'a9b0c1d2-e3f4-5678-9012-345678901234',
    'ピザ',
    'pizza'
  ),
  (
    'b0c1d2e3-f4a5-6789-0123-456789012345',
    'そば',
    'soba'
  ),
  (
    'c1d2e3f4-a5b6-7890-1234-567890123456',
    'ギリシャ料理',
    'greek'
  ),
  (
    'd2e3f4a5-b6c7-8901-2345-678901234567',
    '熟成肉',
    'aged-meat'
  )
on conflict (id) do update
set
  name = excluded.name,
  slug = excluded.slug;

-- 記事
insert into public.posts (
  id,
  author_id,
  category_id,
  title,
  slug,
  image_path,
  content,
  status,
  published_at
) values
  -- 肉源 六本木店
  (
    'd0e1f2a3-b4c5-6789-3456-890123456789',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '肉源 六本木店',
    'nikugen-roppongi',
    '/images/posts/nikugen-roppongi.jpg',
    'ランチで食べられる焼肉と冷麺のセットがおすすめ。

住所: 東京都港区六本木７丁目１５−１７ ユニ六本木ビル 2F
Google Maps: https://maps.app.goo.gl/qQfA7vcWRgcVtCgMA',
    'published',
    now()
  ),
  -- 四川食堂KARyu 浅草橋店
  (
    'e1f2a3b4-c5d6-7890-4567-901234567890',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '四川食堂KARyu 浅草橋店',
    'karyu-asakusabashi',
    '/images/posts/karyu-asakusabashi.jpg',
    '辛くない料理もある。美味しい。

住所: 東京都台東区浅草橋１丁目２３−４ 浅草橋サンロード １階
Google Maps: https://maps.app.goo.gl/8D4vhDByBAoBhAGv7',
    'published',
    now()
  ),
  -- ツイテル(Tsui-teru!)
  (
    'f2a3b4c5-d6e7-8901-5678-012345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'ツイテル(Tsui-teru!)',
    'tsuiteru-nakano',
    '/images/posts/tsuiteru-nakano.jpg',
    '熟成肉のお店

住所: 東京都中野区中野５丁目３６−５ ヴィラＡＫ 2F
Google Maps: https://maps.app.goo.gl/eNb4refMJipwYv5v8',
    'published',
    now()
  ),
  -- 浅草おにぎり はるちゃん
  (
    'a3b4c5d6-e7f8-9012-6789-123456789012',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '浅草おにぎり はるちゃん',
    'haruchan-asakusa',
    '/images/posts/haruchan-asakusa.jpg',
    'ツナマヨと鶏そぼろのおにぎりが美味しかった。ねぎとろとツナマヨも美味しかった。豚汁も美味しい。',
    'published',
    now()
  ),
  -- まぜはる 浅草橋
  (
    'b4c5d6e7-f8a9-0123-7890-234567890123',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'まぜはる 浅草橋',
    'mazeharu-asakusabashi',
    '/images/posts/mazeharu-asakusabashi.jpg',
    'ちょっと辛めだけど美味しい。',
    'published',
    now()
  ),
  -- エスニック料理ギータ-GITA-
  (
    'c5d6e7f8-a9b0-1234-8901-345678901234',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'エスニック料理ギータ-GITA-',
    'gita-ethnic',
    '/images/posts/gita-ethnic.jpg',
    'チーズナンがめちゃくちゃ美味しい。',
    'published',
    now()
  ),
  -- カレーは飲み物。 秋葉原店
  (
    'd6e7f8a9-b0c1-2345-9012-456789012345',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'カレーは飲み物。 秋葉原店',
    'curry-ha-nomimono-akihabara',
    '/images/posts/curry-ha-nomimono-akihabara.jpg',
    'カツカレーは結構油っこい感じだけど美味しい。',
    'published',
    now()
  ),
  -- ココトモバウム
  (
    'e7f8a9b0-c1d2-3456-0123-567890123456',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'ココトモバウム',
    'cocotomo-baum',
    '/images/posts/cocotomo-baum.jpg',
    '米粉のバウムクーヘン。玄米のやつが特に美味しい。犬山に店舗があるけど通販もある。

住所: 愛知県犬山市犬山東古券76番地
Google Maps: https://maps.app.goo.gl/SRE1Ber2wNvauSea9',
    'published',
    now()
  ),
  -- りんごぽむぽむ
  (
    'f8a9b0c1-d2e3-4567-1234-678901234567',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'りんごぽむぽむ',
    'ringo-pompom',
    '/images/posts/ringo-pompom.jpg',
    'りんごの味がする日本酒。通販で購入可能。',
    'published',
    now()
  ),
  -- 右翼のおかき、播磨屋本店
  (
    'a9b0c1d2-e3f4-5678-2345-789012345678',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '播磨屋本店',
    'harimaya-honten',
    '/images/posts/harimaya-honten.jpg',
    '思想が強めなおかきのお店。味は美味しいと聞いている。通販で購入可能。',
    'published',
    now()
  ),
  -- 上野 焼きそば 想夫恋
  (
    'b0c1d2e3-f4a5-6789-3456-890123456789',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '上野 焼きそば 想夫恋',
    'sofuren-ueno',
    '/images/posts/sofuren-ueno.jpg',
    '上野にある焼きそば専門店

住所: 東京都台東区上野４丁目６−７ 白鳥舎ビル 1F
Google Maps: https://maps.app.goo.gl/YDJk6cmUi3NFRiL47',
    'published',
    now()
  ),
  -- 池袋肉劇場
  (
    'c1d2e3f4-a5b6-7890-4567-901234567890',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '池袋肉劇場',
    'ikebukuro-nikugekijo',
    '/images/posts/ikebukuro-nikugekijo.jpg',
    '色々なお肉が乗ったどんぶり。美味しい。

住所: 東京都豊島区東池袋１丁目２−１１
Google Maps: https://maps.app.goo.gl/9uoRTrUXE3n1qRKS8',
    'published',
    now()
  ),
  -- 君に、揚げる。とんかつ
  (
    'd2e3f4a5-b6c7-8901-5678-012345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '君に、揚げる。とんかつ',
    'kimini-ageru-tonkatsu',
    '/images/posts/kimini-ageru-tonkatsu.jpg',
    '浅草の田原町付近にあるとんかつのお店。ランチのチキンカツが美味しかった。

住所: 東京都台東区松が谷１丁目４−６ ライオンズマンション上野松が谷 1F
Google Maps: https://maps.app.goo.gl/A5LZWtyUMpMqm8Sw6',
    'published',
    now()
  ),
  -- 蔵前のピザ屋
  (
    'e3f4a5b6-c7d8-9012-6789-123456789012',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '蔵前のピザ屋 PIZZA LINDA',
    'kuramae-pizza',
    '/images/posts/kuramae-pizza.jpg',
    '蔵前にあるピザ屋。イタリアで修行したシェフがピザ窯でピザを焼いてるところ。たぶんここ。https://pizzalinda.jp/',
    'published',
    now()
  ),
  -- 田原町付近のそばと親子丼のお店
  (
    'f4a5b6c7-d8e9-0123-7890-234567890123',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '田原町付近のそばと親子丼のお店',
    'tawaramachi-soba-oyakodon',
    '/images/posts/tawaramachi-soba-oyakodon.jpg',
    '名前は忘れたけどめっちゃ美味しかった。',
    'published',
    now()
  ),
  -- 極(きわみ) 新宿食肉センター極 南越谷店
  (
    'a5b6c7d8-e9f0-1234-8901-345678901234',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '極(きわみ) 新宿食肉センター極 南越谷店',
    'kiwami-minamikoshigaya',
    '/images/posts/kiwami-minamikoshigaya.jpg',
    '埼玉にある焼肉。極み。深夜ランチよく食べてたところ。レバーとピートロが美味しい。

住所: 埼玉県越谷市南越谷１丁目２６−１４ KO''z-1ビル 3階
Google Maps: https://maps.app.goo.gl/diFz6VCn1RyznG6S7',
    'published',
    now()
  ),
  -- 浅草橋のギリシャ料理
  (
    'b6c7d8e9-f0a1-2345-9012-456789012345',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '浅草橋のギリシャ料理',
    'asakusabashi-greek',
    '/images/posts/asakusabashi-greek.jpg',
    '浅草橋にあるギリシャ料理のお店。行ってみたい。',
    'published',
    now()
  ),
  -- 焼酎 宝山
  (
    'b6c7d8e9-f0a1-2345-9012-456789012345',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '焼酎 宝山',
    'houzan',
    '/images/posts/sample.jpg',
    'トリクラで飲んだ焼酎。美味しかったやつ。',
    'published',
    now()
  ),
  -- 扇屋製菓 メロンパフェ 静岡の伊豆にあるところ
  (
    'b6c7d8e9-f0a1-2345-9012-456789012345',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '扇屋製菓 メロンパフェ',
    'ougiya-melon',
    '/images/posts/sample.jpg',
    '静岡の伊豆にあるメロンパフェが食べられるところ。メロンを半玉使っているパフェ。http://ougiya-melon.com/cafe',
    'published',
    now()
  ),
  -- あつみのかりんとう(秋田で人気のお菓子)
  (
    'b6c7d8e9-f0a1-2345-9012-456789012345',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'あつみのかりんとう',
    'atsumi-karintou',
    '/images/posts/sample.jpg',
    '秋田県のお菓子。あつみのかりんとうは商品名？',
    'published',
    now()
  ),
  -- 渋谷のハワイのお店
  (
    'b6c7d8e9-f0a1-2345-9012-456789012345',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    "渋谷のハワイのお店 hale'aina HOA Shibuya",
    'houzan',
    '/images/posts/sample.jpg',
    "チキンステーキが美味しかった。https://tabelog.com/tokyo/A1303/A130301/13298163/",
    'published',
    now()
  ),
  -- ウルフギャング
  (
    'b6c7d8e9-f0a1-2345-9012-456789012345',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    'ウルフギャング',
    'wolfgangs-steak',
    '/images/posts/sample.jpg',
    'ステーキのお店。スカウトのグルコンで名前が上がっていたので行ってみたい。https://wolfgangssteakhouse.jp/',
    'published',
    now()
  ),
  -- 浅草 楓(みたらし団子が美味しそうなお店)
  (
    'b6c7d8e9-f0a1-2345-9012-456789012345',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '浅草 楓',
    'asakusa-kaede',
    '/images/posts/sample.jpg',
    'みたらし団子が美味しそうなお店。https://tabelog.com/tokyo/A1311/A131102/13009811/',
    'published',
    now()
  ),
  -- 浅草のつきたてのお餅が食べられるお店(餅屋半兵衛)
  (
    'b6c7d8e9-f0a1-2345-9012-456789012345',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '餅屋半兵衛 浅草のつきたてのお餅が食べられるお店',
    'asakusa-omochi',
    '/images/posts/sample.jpg',
    '浅草のつきたてのお餅が食べられるお店 https://hanbei.ltd/mochishop/',
    'published',
    now()
  )




-- これが行ってみたいのカテゴリーのid
-- e5f6a7b8-c9d0-1234-ef12-345678901234

-- 他に追加するところ
-- ・上野の中華のお店(火鍋の横のお店)
-- ・上野の北京ダックのお店
-- ・上野のシカゴピザ
-- ・シェラスコ(サーロインとか色々食べられるお店)
-- ・バターバトラー(渋谷のスクランブルスクエアにあるところ)
-- 




on conflict (id) do update
set
  author_id = excluded.author_id,
  category_id = excluded.category_id,
  title = excluded.title,
  slug = excluded.slug,
  image_path = excluded.image_path,
  content = excluded.content,
  status = excluded.status,
  published_at = excluded.published_at;

-- 記事×タグ
insert into public.post_tags (
  post_id,
  tag_id
) values
  -- 肉源 六本木店 × 焼肉, ランチ
  ('d0e1f2a3-b4c5-6789-3456-890123456789', 'f6a7b8c9-d0e1-2345-f123-456789012345'),
  ('d0e1f2a3-b4c5-6789-3456-890123456789', 'a7b8c9d0-e1f2-3456-0123-567890123456'),
  -- 四川食堂KARyu × 中華
  ('e1f2a3b4-c5d6-7890-4567-901234567890', 'd0e1f2a3-b4c5-6789-0123-456789012345'),
  -- ツイテル × 熟成肉
  ('f2a3b4c5-d6e7-8901-5678-012345678901', 'd2e3f4a5-b6c7-8901-2345-678901234567'),
  -- 浅草おにぎり はるちゃん × おにぎり
  ('a3b4c5d6-e7f8-9012-6789-123456789012', 'e1f2a3b4-c5d6-7890-1234-567890123456'),
  -- まぜはる × まぜそば
  ('b4c5d6e7-f8a9-0123-7890-234567890123', 'f2a3b4c5-d6e7-8901-2345-678901234567'),
  -- ギータ × エスニック
  ('c5d6e7f8-a9b0-1234-8901-345678901234', 'a3b4c5d6-e7f8-9012-3456-789012345678'),
  -- カレーは飲み物 × カレー
  ('d6e7f8a9-b0c1-2345-9012-456789012345', 'b8c9d0e1-f2a3-4567-1234-678901234567'),
  -- ココトモバウム × スイーツ
  ('e7f8a9b0-c1d2-3456-0123-567890123456', 'c9d0e1f2-a3b4-5678-2345-789012345678'),
  -- りんごぽむぽむ × 日本酒
  ('f8a9b0c1-d2e3-4567-1234-678901234567', 'b4c5d6e7-f8a9-0123-4567-890123456789'),
  -- 播磨屋本店 × お菓子
  ('a9b0c1d2-e3f4-5678-2345-789012345678', 'c5d6e7f8-a9b0-1234-5678-901234567890'),
  -- 想夫恋 × 焼きそば
  ('b0c1d2e3-f4a5-6789-3456-890123456789', 'd6e7f8a9-b0c1-2345-6789-012345678901'),
  -- 池袋肉劇場 × 丼もの
  ('c1d2e3f4-a5b6-7890-4567-901234567890', 'e7f8a9b0-c1d2-3456-7890-123456789012'),
  -- 君に、揚げる × とんかつ, ランチ
  ('d2e3f4a5-b6c7-8901-5678-012345678901', 'f8a9b0c1-d2e3-4567-8901-234567890123'),
  ('d2e3f4a5-b6c7-8901-5678-012345678901', 'a7b8c9d0-e1f2-3456-0123-567890123456'),
  -- 蔵前のピザ屋 × ピザ
  ('e3f4a5b6-c7d8-9012-6789-123456789012', 'a9b0c1d2-e3f4-5678-9012-345678901234'),
  -- 田原町のそば × そば
  ('f4a5b6c7-d8e9-0123-7890-234567890123', 'b0c1d2e3-f4a5-6789-0123-456789012345'),
  -- 極 × 焼肉
  ('a5b6c7d8-e9f0-1234-8901-345678901234', 'f6a7b8c9-d0e1-2345-f123-456789012345'),
  -- 浅草橋ギリシャ料理 × ギリシャ料理
  ('b6c7d8e9-f0a1-2345-9012-456789012345', 'c1d2e3f4-a5b6-7890-1234-567890123456')
on conflict (post_id, tag_id) do nothing;

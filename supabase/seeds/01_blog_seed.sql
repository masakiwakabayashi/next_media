-- ブログ関連テーブルのシーダー
-- お店と商品(お菓子やお酒)を同じ記事という括りにしたいので、こういう構成にする

-- データのバックアップをどうやって取るか？
-- シーダーを整理する

-- プロフィール (user_id は auth ユーザー作成時にトリガーで設定されるため null)
insert into public.profiles (id, display_name, bio, avatar_url)
values (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '山田太郎',
  '東京を中心にグルメ情報を発信中。',
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

  -- postsテーブルに
  -- ・url (文字列null許容)を追加する

-- 記事
insert into public.posts (
  id,
  author_id,
  category_id,
  title,
  slug,
  image_path,
  content,
  google_maps_url,
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

住所: 東京都港区六本木７丁目１５−１７ ユニ六本木ビル 2F',
    'https://maps.app.goo.gl/qQfA7vcWRgcVtCgMA',
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

住所: 東京都台東区浅草橋１丁目２３−４ 浅草橋サンロード １階',
    'https://maps.app.goo.gl/8D4vhDByBAoBhAGv7',
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

住所: 東京都中野区中野５丁目３６−５ ヴィラＡＫ 2F',
    'https://maps.app.goo.gl/eNb4refMJipwYv5v8',
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
    null,
    'published',
    now()
  ),
  -- まぜはる 浅草橋
  (
    'b4c5d6e7-f8a9-0123-7890-234567890123',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'd4e5f6a7-b8c9-0123-def1-234567890123',
    'まぜはる 浅草橋',
    'mazeharu-asakusabashi',
    '/images/posts/mazeharu-asakusabashi.jpg',
    'ちょっと辛めだけど美味しい。',
    null,
    'published',
    now()
  ),
  -- エスニック料理ギータ-GITA-
  (
    'c5d6e7f8-a9b0-1234-8901-345678901234',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'd4e5f6a7-b8c9-0123-def1-234567890123',
    'エスニック料理ギータ-GITA-',
    'gita-ethnic',
    '/images/posts/gita-ethnic.jpg',
    'チーズナンがめちゃくちゃ美味しい。',
    null,
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

住所: 愛知県犬山市犬山東古券76番地',
    'https://maps.app.goo.gl/SRE1Ber2wNvauSea9',
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
    null,
    'published',
    now()
  ),
  -- 右翼のおかき、播磨屋本店
  (
    'a9b0c1d2-e3f4-5678-2345-789012345678',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '播磨屋本店',
    'harimaya-honten',
    '/images/posts/harimaya-honten.jpg',
    '思想が強めなおかきのお店。味は美味しいと聞いている。通販で購入可能。',
    null,
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

住所: 東京都台東区上野４丁目６−７ 白鳥舎ビル 1F',
    'https://maps.app.goo.gl/YDJk6cmUi3NFRiL47',
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

住所: 東京都豊島区東池袋１丁目２−１１',
    'https://maps.app.goo.gl/9uoRTrUXE3n1qRKS8',
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

住所: 東京都台東区松が谷１丁目４−６ ライオンズマンション上野松が谷 1F',
    'https://maps.app.goo.gl/A5LZWtyUMpMqm8Sw6',
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
    null,
    'published',
    now()
  ),
  -- 田原町付近のそばと親子丼のお店
  (
    'f4a5b6c7-d8e9-0123-7890-234567890123',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '田原町付近のそばと親子丼のお店(さ和鳥)',
    'tawaramachi-soba-oyakodon',
    '/images/posts/tawaramachi-soba-oyakodon.jpg',
    'そばも親子丼もめっちゃ美味しかった。https://sawacyo-kamo.foodre.jp/',
    null,
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

住所: 埼玉県越谷市南越谷１丁目２６−１４ KO''z-1ビル 3階',
    'https://maps.app.goo.gl/diFz6VCn1RyznG6S7',
    'published',
    now()
  ),
  -- 浅草橋のギリシャ料理
  (
    '8401bbac-76b7-48e0-badf-62b6c979d6a0',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '浅草橋のギリシャ料理',
    'asakusabashi-greek',
    '/images/posts/asakusabashi-greek.jpg',
    '浅草橋にあるギリシャ料理のお店。行ってみたい。',
    null,
    'published',
    now()
  ),
  -- 焼酎 宝山
  (
    '9c851a79-24e7-45d5-b4c7-c644d9cdcffb',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '焼酎 宝山',
    'houzan',
    '/images/posts/sample.jpg',
    'トリクラで飲んだ焼酎。美味しかったやつ。',
    null,
    'published',
    now()
  ),
  -- 扇屋製菓 メロンパフェ 静岡の伊豆にあるところ
  (
    '63d5eec0-33c3-442e-80a7-8c58eb73b7a4',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '扇屋製菓 メロンパフェ',
    'ougiya-melon',
    '/images/posts/sample.jpg',
    '静岡の伊豆にあるメロンパフェが食べられるところ。メロンを半玉使っているパフェ。http://ougiya-melon.com/cafe',
    null,
    'published',
    now()
  ),
  -- あつみのかりんとう(秋田で人気のお菓子)
  (
    '3a1ad2e8-5882-4fca-9b15-b8a8940e3be5',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'あつみのかりんとう',
    'atsumi-karintou',
    '/images/posts/sample.jpg',
    '秋田県のお菓子。あつみのかりんとうは商品名？',
    null,
    'published',
    now()
  ),
  -- 渋谷のハワイのお店
  (
    '7c427bc9-5e7c-4d4b-b20f-6e7e10db78cd',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'd4e5f6a7-b8c9-0123-def1-234567890123',
    '渋谷のハワイのお店 hale’aina HOA Shibuya',
    'haleaina-hoa-shibuya',
    '/images/posts/sample.jpg',
    'チキンステーキが美味しかった。https://tabelog.com/tokyo/A1303/A130301/13298163/',
    null,
    'published',
    now()
  ),
  -- ウルフギャング
  (
    'f7556089-5619-4c83-82aa-a06b3b056da2',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    'ウルフギャング',
    'wolfgangs-steak',
    '/images/posts/sample.jpg',
    'ステーキのお店。スカウトのグルコンで名前が上がっていたので行ってみたい。https://wolfgangssteakhouse.jp/',
    null,
    'published',
    now()
  ),
  -- 浅草 楓(みたらし団子が美味しそうなお店)
  (
    '2f283474-5e28-417c-ac09-ba5112f7400e',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '浅草 楓',
    'asakusa-kaede',
    '/images/posts/sample.jpg',
    'みたらし団子が美味しそうなお店。https://tabelog.com/tokyo/A1311/A131102/13009811/',
    null,
    'published',
    now()
  ),
  -- 浅草のつきたてのお餅が食べられるお店(餅屋半兵衛)
  (
    'e23e1ff8-d1c6-40a3-b750-2212ab85a9d1',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '餅屋半兵衛 浅草のつきたてのお餅が食べられるお店',
    'asakusa-omochi',
    '/images/posts/sample.jpg',
    '浅草のつきたてのお餅が食べられるお店 https://hanbei.ltd/mochishop/',
    null,
    'published',
    now()
  ),
  -- 貝料理の専門店 牡蠣のまぜそばが美味しかったところ
  (
    'b5c6d7e8-f9a0-1234-5678-901234567890',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '貝料理の専門店 牡蠣のまぜそばが美味しかった 貝料理 梵厨(ぼんず)',
    'kairyouri',
    '/images/posts/sample.jpg',
    'https://tabelog.com/tokyo/A1311/A131101/13228306/',
    null,
    'published',
    now()
  ),
  -- ブラジル料理のお店 チキンが美味しかった
  (
    'd3e4f5a6-b7c8-9012-3456-789012345678',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '浅草にあるブラジル料理のお店 ランチに食べたチキンが美味しかった「シュハスカリア キボン 浅草店」',
    'churrascaria',
    '/images/posts/sample.jpg',
    '創業20年だそう。https://tabelog.com/tokyo/A1311/A131102/13031549/',
    null,
    'published',
    now()
  ),
  -- 上野の中華のお店 駅近の火鍋のお店の隣
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '上野の中華のお店 駅近の火鍋のお店の隣',
    'slag',
    '/images/posts/sample.jpg',
    '上野駅のすぐそばの1993年の火鍋のお店の隣にある中華料理のお店。本格中華って感じで美味しい',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- シェラスコ 渋谷にあるところ
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'シェラスコ アレグリア渋谷',
    'slag',
    '/images/posts/sample.jpg',
    'お店の名前は忘れたけど、たぶんここ。 https://tabelog.com/tokyo/A1303/A130301/13244702/',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- 上野のシカゴピザのお店(デリリウムカフェ)
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '上野のシカゴピザのお店「デリリウムカフェ」',
    'slag',
    '/images/posts/sample.jpg',
    'シカゴピザが食べられるお店。ビールが特に美味しい。料理は全般的に美味しい。',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- 千駄ヶ谷の茶そば屋さん
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '千駄ヶ谷の茶そば屋さん「お茶処 辰吉 （オチャドコロ シンキチ）」',
    'slag',
    '/images/posts/sample.jpg',
    '茶そば唐揚げセットがおすすめ。卵かけご飯もついててよかった。',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- しきんはんてん
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '千駄ヶ谷にある中華屋さん「紫金飯店 原宿店」',
    'slag',
    '/images/posts/sample.jpg',
    '昭和41年創業だそう。千駄ヶ谷にある美味しい中華屋さん。お店の読み方は「しきんはんてん」',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- しきんはんてんの隣のパスタ のりとチーズのパスタが美味しいところ
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'しきんはんてんの隣のパスタ「SPAGO(スパゴ)」',
    'slag',
    '/images/posts/sample.jpg',
    '千駄ヶ谷のしきんはんてんの隣にあるパスタのお店。のりとチーズのパスタが美味しい。 https://tabelog.com/tokyo/A1306/A130601/13012687/',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- まんてん 代々木にある焼肉屋
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'まんてん 代々木にある焼肉屋',
    'slag',
    '/images/posts/sample.jpg',
    '代々木にある焼肉屋。はらみとかまるちょうが美味しい。ランチのカレーも美味しい',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- 千駄ヶ谷のカレーうどん「黒うどん山長 原宿店」
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '千駄ヶ谷のカレーうどん「黒うどん山長 原宿店」',
    'slag',
    '/images/posts/sample.jpg',
    '検索しても煮込みうどんの写真しか出てこないけど、カレーうどんが美味しいお店はここのはず',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- とりくら
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'とりくら',
    'slag',
    '/images/posts/sample.jpg',
    '普通のコースと水炊きのコースがあって、両方美味しいけど個人的に水炊きの方が好き。デザートのプリンがめっちゃ美味しかった。',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- The God Dineer 
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'The God Dineer 上野にあるハンバーガーのお店',
    'slag',
    '/images/posts/sample.jpg',
    'ハンバーガーが肉肉しくて美味しかった。入口が自販機になってる。初見だとお店だとわからないような感じ。',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- 浅草どぜう「どぜう飯田屋」 
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '浅草どぜう「どぜう飯田屋」',
    'slag',
    '/images/posts/sample.jpg',
    '浅草のどぜうのお店。気になっているところ1つ目。 https://dozeu-iidaya.com/',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- 浅草どぜう「駒形どぜう 本店」
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '浅草どぜう「駒形どぜう 本店」',
    'slag',
    '/images/posts/sample.jpg',
    '浅草のどぜうのお店。気になっているところ2つ目。 https://dozeu.com/',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- 上野の北京ダックのお店
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '上野の北京ダックのお店',
    'slag',
    '/images/posts/sample.jpg',
    '上野駅のすぐ近くにある北京ダックのお店',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- トロワ 田原町にあるプリンのお店
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    'トロワ 田原町にあるプリンのお店',
    'slag',
    '/images/posts/sample.jpg',
    'プリンが美味しそう。',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- 入谷のぺりぺりチキン専門店
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '入谷のぺりぺりチキン専門店',
    'slag',
    '/images/posts/sample.jpg',
    'https://tabelog.com/tokyo/A1311/A131104/13268713/',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- 神保町のフレッシュムーン
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '神保町のフレッシュムーン',
    'slag',
    '/images/posts/sample.jpg',
    'https://kanda-bunsendo.com/wagashi/freshmoon_freshroman',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- うさぎが食べられるお店　御徒町にある
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    'うさぎが食べられるお店 御徒町にある',
    'slag',
    '/images/posts/sample.jpg',
    'https://tabelog.com/tokyo/A1311/A131101/13189152/',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- ズーガンズー　ワニとカンガルーの肉が食べられる
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    'ズーガンズー ワニとカンガルーの肉が食べられる',
    'slag',
    '/images/posts/sample.jpg',
    'https://zoogunzoo.com/',
    'GoogleマップのURL',
    'published',
    now()
  ),
  -- 中野にある豚肉のお店
  (
    'uuid',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'd4e5f6a7-b8c9-0123-def1-234567890123',
    '幸運豚人/Tsui-teru ! Porkman',
    'slag',
    '/images/posts/sample.jpg',
    '中野にある豚肉のお店。けっこうがっつりめのお店。ツイテルの系列店っぽい。 https://tabelog.com/tokyo/A1319/A131902/13214614/',
    'GoogleマップのURL',
    'published',
    now()
  )


on conflict (id) do update
set
  author_id = excluded.author_id,
  category_id = excluded.category_id,
  title = excluded.title,
  slug = excluded.slug,
  image_path = excluded.image_path,
  content = excluded.content,
  google_maps_url = excluded.google_maps_url,
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
  ('8401bbac-76b7-48e0-badf-62b6c979d6a0', 'c1d2e3f4-a5b6-7890-1234-567890123456')
on conflict (post_id, tag_id) do nothing;

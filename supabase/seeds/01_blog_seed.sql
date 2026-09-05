-- ブログ関連テーブルのシーダー
-- お店と商品(お菓子やお酒)を同じ記事という括りにしたいので、こういう構成にする

-- データのバックアップをどうやって取るか？

-- 画像が表示されるようにする


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
    'リピート！',
    'repeat'
  ),
  (
    'd4e5f6a7-b8c9-0123-def1-234567890123',
    'よかった！',
    'good'
  ),
  (
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '気になる！',
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
  ),
  (
    'ec99c2f6-ef95-44ad-baf6-2064e6588a52',
    '焼酎',
    'shochu'
  ),
  (
    'ae840b2e-d3fa-4c3e-9d36-1cb829232b23',
    'ハワイアン',
    'hawaiian'
  ),
  (
    '73310851-188a-4047-af82-ee7438d2fc5f',
    'ステーキ',
    'steak'
  ),
  (
    '5c4eaca8-d1e8-421e-97ae-464f8439524e',
    '和菓子',
    'wagashi'
  ),
  (
    '6f639741-3560-435a-8e67-7e62d7721453',
    '貝料理',
    'shellfish'
  ),
  (
    'fcbce47c-9951-45dc-b6aa-e82d48c311c7',
    'ブラジル料理',
    'brazilian'
  ),
  (
    'fafb56ba-8bc9-4133-a889-bfbef5e7e200',
    'パスタ',
    'pasta'
  ),
  (
    '0ae831dc-c481-4365-a959-7638310c873a',
    'うどん',
    'udon'
  ),
  (
    '83598cc7-f4a6-4192-96c9-4b1161875d6a',
    '水炊き',
    'mizutaki'
  ),
  (
    '4fdcb64f-56b5-4c61-a88f-472635254c08',
    'ハンバーガー',
    'hamburger'
  ),
  (
    '94b00e06-3492-4c64-9740-6c386029e712',
    'どじょう',
    'dojou'
  ),
  (
    'af4abcd5-6643-4be4-8b02-58f7ee798b90',
    'チキン',
    'chicken'
  ),
  (
    'b057402d-c8db-49b3-8087-859c286181c1',
    'ジビエ',
    'gibier'
  ),
  (
    '1ee26916-7940-487d-b8b9-d3fdaedb0dbd',
    '豚肉',
    'pork'
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
    'https://maps.app.goo.gl/atCcgzAZamGLCCwm7',
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
    'https://maps.app.goo.gl/w49ixJdtnu9UGmKD6',
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
    'https://maps.app.goo.gl/PKcKv8JseRkofJSE6',
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
    '浅草橋のギリシャ料理「フィリ」',
    'asakusabashi-greek',
    '/images/posts/asakusabashi-greek.jpg',
    '浅草橋にあるギリシャ料理のお店。行ってみたい。',
    'https://maps.app.goo.gl/xMy4Q3Ps1HSg9Uf98',
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
    'https://maps.app.goo.gl/c5WzrkyKVfET1LW5A',
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
    'https://maps.app.goo.gl/Y2YH9FMkkaFeEC7k8',
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
    '夜は混むらしい。昼に行ったときは空いてた。https://tabelog.com/tokyo/A1311/A131101/13228306/',
    'https://maps.app.goo.gl/oGS9JEsPont1x3EBA',
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
    'https://maps.app.goo.gl/WYbJFWHXgf4gnfNJ6',
    'published',
    now()
  ),
  -- 上野の中華のお店 駅近の火鍋のお店の隣
  (
    'd478cecd-7a2b-45fe-adff-f1f4b925b6f9',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '上野の中華のお店 駅近の火鍋のお店の隣',
    'ueno-chinese-near-hotpot',
    '/images/posts/sample.jpg',
    '上野駅のすぐそばの1993年の火鍋のお店の隣にある中華料理のお店。本格中華って感じで美味しい',
    null,
    'published',
    now()
  ),
  -- シェラスコ 渋谷にあるところ
  (
    '162bb720-e55f-4b82-b42a-ac4b0fc879b8',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'シェラスコ アレグリア渋谷',
    'churrasco-alegria-shibuya',
    '/images/posts/sample.jpg',
    'お店の名前は忘れたけど、たぶんここ。 https://tabelog.com/tokyo/A1303/A130301/13244702/',
    null,
    'published',
    now()
  ),
  -- 上野のシカゴピザのお店(デリリウムカフェ)
  (
    '2a0597b7-465f-4527-a336-3672f59f4a09',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '上野のシカゴピザのお店「デリリウムカフェ」',
    'delirium-cafe-ueno',
    '/images/posts/sample.jpg',
    'シカゴピザが食べられるお店。ビールが特に美味しい。料理は全般的に美味しい。',
    null,
    'published',
    now()
  ),
  -- 千駄ヶ谷の茶そば屋さん
  (
    '5a4d7f52-dafe-41a8-aded-31aed7ed85a3',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '千駄ヶ谷の茶そば屋さん「お茶処 辰吉 （オチャドコロ シンキチ）」',
    'ochadokoro-shinkichi',
    '/images/posts/sample.jpg',
    '茶そば唐揚げセットがおすすめ。卵かけご飯もついててよかった。',
    'https://maps.app.goo.gl/9PXWbWXn5yfDjYQB7',
    'published',
    now()
  ),
  -- しきんはんてん
  (
    'e2b98ab8-9933-4d28-9911-c8229baa1040',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '千駄ヶ谷にある中華屋さん「紫金飯店 原宿店」',
    'shikinhanten-harajuku',
    '/images/posts/sample.jpg',
    '昭和41年創業だそう。千駄ヶ谷にある美味しい中華屋さん。お店の読み方は「しきんはんてん」',
    'https://maps.app.goo.gl/A7uMa6c8GAvmU6hHA',
    'published',
    now()
  ),
  -- しきんはんてんの隣のパスタ のりとチーズのパスタが美味しいところ
  (
    '73d87d09-7e34-402e-ac18-60b1b45fb884',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'しきんはんてんの隣のパスタ「SPAGO(スパゴ)」',
    'spago-sendagaya',
    '/images/posts/sample.jpg',
    '千駄ヶ谷のしきんはんてんの隣にあるパスタのお店。のりとチーズのパスタが美味しい。 https://tabelog.com/tokyo/A1306/A130601/13012687/',
    'https://maps.app.goo.gl/pVvy4qAMhSNnX6QV6',
    'published',
    now()
  ),
  -- まんてん 代々木にある焼肉屋
  (
    '0f94ad6a-abfa-4b5b-9526-fdb85d501c8f',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'まんてん 代々木にある焼肉屋',
    'manten-yoyogi',
    '/images/posts/sample.jpg',
    '代々木にある焼肉屋。はらみとかまるちょうが美味しい。ランチのカレーも美味しい',
    'https://maps.app.goo.gl/LCnFrHLXpw7cdsXn8',
    'published',
    now()
  ),
  -- 千駄ヶ谷のカレーうどん「黒うどん山長 原宿店」
  (
    'cabdaff4-7d9d-46e1-99de-1578eee0a4b0',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '千駄ヶ谷のカレーうどん「黒うどん山長 原宿店」',
    'kuroudon-yamacho-harajuku',
    '/images/posts/sample.jpg',
    '検索しても煮込みうどんの写真しか出てこないけど、カレーうどんが美味しいお店はここのはず',
    'https://maps.app.goo.gl/cbYDaG41zo2VW5vq7',
    'published',
    now()
  ),
  -- とりくら
  (
    '260ee3c5-0b99-48e2-abbf-bb6d3b97f041',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'とりくら',
    'torikura',
    '/images/posts/sample.jpg',
    '普通のコースと水炊きのコースがあって、両方美味しいけど個人的に水炊きの方が好き。デザートのプリンがめっちゃ美味しかった。',
    'https://maps.app.goo.gl/kAex59KuoHTPJKmG9',
    'published',
    now()
  ),
  -- The God Diner 
  (
    'cce91deb-790f-4a1e-9afb-09cca966ad43',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'The God Diner 上野にあるハンバーガーのお店',
    'the-god-dineer-ueno',
    '/images/posts/sample.jpg',
    'ハンバーガーが肉肉しくて美味しかった。入口が自販機になってる。初見だとお店だとわからないような感じ。',
    'https://maps.app.goo.gl/GvdAWXR3Kj6NR6FJ9',
    'published',
    now()
  ),
  -- 浅草どぜう「どぜう飯田屋」 
  (
    'd204765c-137c-4026-b813-4c1eba53729e',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '浅草どぜう「どぜう飯田屋」',
    'dozeu-iidaya',
    '/images/posts/sample.jpg',
    '浅草のどぜうのお店。気になっているところ1つ目。 https://dozeu-iidaya.com/',
    'https://maps.app.goo.gl/o18eQQxT38bN7E8X6',
    'published',
    now()
  ),
  -- 浅草どぜう「駒形どぜう 本店」
  (
    '66f6ba2b-84ee-4a1e-b9f3-b36a08c6b0c8',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '浅草どぜう「駒形どぜう 本店」',
    'komagata-dozeu',
    '/images/posts/sample.jpg',
    '浅草のどぜうのお店。気になっているところ2つ目。 https://dozeu.com/',
    'https://maps.app.goo.gl/EoesfaAiqTLXmC8J9',
    'published',
    now()
  ),
  -- 上野の北京ダックのお店
  (
    '29776b16-843b-4a6c-b43c-27558e9a0fa2',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '上野の北京ダックのお店',
    'ueno-peking-duck',
    '/images/posts/sample.jpg',
    '上野駅のすぐ近くにある北京ダックのお店',
    'https://maps.app.goo.gl/RUyK1sMr1a4tUeDo6',
    'published',
    now()
  ),
  -- トロワ 田原町にあるプリンのお店
  (
    '6e6bebbe-6f37-47fd-80fe-c63ad963a1b1',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    'トロワ 田原町にあるプリンのお店',
    'trois-tawaramachi-pudding',
    '/images/posts/sample.jpg',
    'プリンが美味しそう。',
    'https://maps.app.goo.gl/3p2V5H1pCxjmAvsT6',
    'published',
    now()
  ),
  -- 入谷のぺりぺりチキン専門店
  (
    '5ce42dc6-2aa9-43ba-b142-dc10d6592972',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '入谷のぺりぺりチキン専門店',
    'iriya-peri-peri-chicken',
    '/images/posts/sample.jpg',
    'https://tabelog.com/tokyo/A1311/A131104/13268713/',
    'https://maps.app.goo.gl/3A6jKGiMkkdZ2G9j8',
    'published',
    now()
  ),
  -- 神保町のフレッシュムーン
  (
    'f1b90691-6c56-41af-9368-df0bf3c4f159',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '神保町のフレッシュムーン「橘昌文銭堂」',
    'freshmoon-jimbocho',
    '/images/posts/sample.jpg',
    '邪神ちゃんドロップキックに出てくるやつ。https://kanda-bunsendo.com/wagashi/freshmoon_freshroman',
    'https://maps.app.goo.gl/KKeTBzezgEnSyeEt5',
    'published',
    now()
  ),
  -- うさぎが食べられるお店　御徒町にある
  (
    '0a9bd73a-93f5-4d20-b496-b18942d04924',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    'うさぎが食べられるお店 御徒町にある',
    'okachimachi-rabbit',
    '/images/posts/sample.jpg',
    'https://tabelog.com/tokyo/A1311/A131101/13189152/',
    null,
    'published',
    now()
  ),
  -- ズーガンズー　ワニとカンガルーの肉が食べられる
  (
    'b1c79d35-8dc5-428f-a7b9-ec542337a39c',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    'ズーガンズー ワニとカンガルーの肉が食べられる',
    'zoogunzoo',
    '/images/posts/sample.jpg',
    'https://zoogunzoo.com/',
    null,
    'published',
    now()
  ),
  -- 中野にある豚肉のお店
  (
    '9e459503-c056-42ce-a88d-c568882c0041',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'd4e5f6a7-b8c9-0123-def1-234567890123',
    '幸運豚人/Tsui-teru ! Porkman',
    'porkman',
    '/images/posts/sample.jpg',
    '中野にある豚肉のお店。けっこうがっつりめのお店。ツイテルの系列店っぽい。 https://tabelog.com/tokyo/A1319/A131902/13214614/',
    'https://maps.app.goo.gl/UzmUkYBjFjYRHfyh6',
    'published',
    now()
  ),
  -- ニューヨークチーズケーキ(専門店の通販)
  (
    '1ba49844-2525-426d-9c33-95294861bba1',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    'ニューヨークチーズケーキ(専門店の通販)',
    'papajons-ny-cheesecake',
    '/images/posts/sample.jpg',
    'https://www.papajons.net/shopdetail/010001000002/',
    null,
    'published',
    now()
  ),
  -- 邪神ちゃんドロップキックに出てきた神保町のカレー屋さん ボンディ
  (
    '4b6495bb-a016-4af5-8b8b-1f94d5846f0e',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '神保町のカレー「ボンディ」',
    'bondy-jimbocho',
    '/images/posts/sample.jpg',
    '邪神ちゃんドロップキックに出てきたカレー屋さん。 https://tabelog.com/tokyo/A1310/A131003/13000439/',
    'https://maps.app.goo.gl/M4QhcGrmmFaCwXKP8',
    'published',
    now()
  ),
  -- 邪神ちゃんドロップキックに出てきた神保町の大丸やき
  (
    '16030160-97d6-4d24-8440-0868251fd11d',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '「大丸やき茶房」邪神ちゃんドロップキックに出てきた神保町の大丸やきのお店',
    'daimaruyaki-jimbocho',
    '/images/posts/sample.jpg',
    'https://retty.me/area/PRE13/ARE11/SUB1104/100000862770/',
    'https://maps.app.goo.gl/LxGmAd6giJgbeePy5',
    'published',
    now()
  ),
  -- 邪神ちゃんドロップキックの生いちごジュース
  (
    'bfa336b8-6354-4fd9-9612-1e02a80e1c94',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '「さぼうる」神保町の生いちごジュース',
    'saboru-jimbocho',
    '/images/posts/sample.jpg',
    '2ではなく本店の方。神保町の生いちごジュース 邪神ちゃんドロップキックに出てくるやつ。邪神ちゃんがよく飲んでる。 https://tabelog.com/tokyo/A1310/A131003/13000609/',
    'https://maps.app.goo.gl/WfWoreNv24mnermS7',
    'published',
    now()
  ),
  -- 北海道 釧路の勝手丼
  (
    '35463dca-abdd-4bc5-b7e1-68c5c1a50ef3',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '北海道 釧路の勝手丼',
    'kushiro-kattedon',
    '/images/posts/sample.jpg',
    '自分の好きなものを乗せられるやつ。釧路で食べられるっぽい',
    null,
    'published',
    now()
  ),
  -- 北海道 笹谷商店のいくら
  (
    '4ccc27c4-3f16-4fe8-9dbe-7ea570aa1f0b',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    '北海道 笹谷商店のいくら',
    'sasaya-ikura',
    '/images/posts/sample.jpg',
    'ここのお店で食べられるっぽい。 https://tabelog.com/hokkaido/A0112/A011201/1051822/dtlrvwlst/B420467842/',
    null,
    'published',
    now()
  )


-- ・月島もんじゃ どてや 月島本店
-- マグロのレモンソテーがめっちゃ美味しい。アスパラとかも美味しかった。どら焼きとかのデザートもあるっぽい。











-- ・イリヤプラスカフェ
-- パンケーキがおすすめっぽい。 https://tabelog.com/tokyo/A1311/A131104/13090365/

-- ・浅草橋の焼きカレーのお店
-- 前に行ったところ

-- ・浅草「フルーツパーラーゴトー」
-- パフェとか。 https://tabelog.com/tokyo/A1311/A131102/13095672/

-- ・静岡「石橋うなぎ屋」
-- 渡部の歩き方で紹介されていたところ。一本焼うなぎ定食。静岡駅からはちょっと遠い。
-- https://tabelog.com/shizuoka/A2201/A220101/22000386/

-- ・静岡「てんぷら 成生」
-- 渡部の歩き方で紹介されていたところ。 https://tabelog.com/shizuoka/A2201/A220101/22037788/

-- ・静岡のおでん「三河屋」
-- さくらももこさんが常連だったらしい。あと渡部の歩き方の穴場編で紹介されていたっぽい。
-- https://tabelog.com/shizuoka/A2201/A220101/22000762/
-- 静岡駅から徒歩12分

-- ・釧路のまりもようかん
-- 1953年創業の北海まりも製菓。邪神ちゃんドロップキックに出てきた。https://hokkai-marimoseika.jimdofree.com/


-- ・ 十勝銘菓 あんバタサン
-- 北海道 帯広のあんバターサンド。邪神ちゃんドロップキックに出てきたお菓子。 https://www.ryugetsu.co.jp/items/anbatasan


-- ・北海道 帯広のスイートポテト「クランベリー 本店」
-- 1972年開業の洋菓子店。邪神ちゃんドロップキックに出てきたお店。 https://tabelog.com/hokkaido/A0111/A011101/1001664/


-- ・オオイリヤ
-- ・つる瀬 湯島本店
-- ・花見煎餅
-- ・生果実専門店 ASAKUSA YOROZU CAFE
-- ・高級鯛焼本舗 柳屋 創業大正五年
-- ・東京駅のカレーのお店 チキンカレーを食べたところ
-- ・東京駅のブラウニー専門店 オンラインでも買える https://sucreyshopping.jp/cotecour
-- ・東京駅にあるアメのお店
-- ・すあま 通販の良さそうなお店 https://item.rakuten.co.jp/kamejirushi/000000000043/
-- ・水戸銘菓「吉原殿中」 これも美味しそう。手作業でしか作れないらしい。 https://item.rakuten.co.jp/kamejirushi/000000000004-14/



-- アメ
-- ・カベンディッシュ ミックスグラスジャー
-- ・フランスシュクル・ドルジュモレ修道院の大麦キャンディ
-- ・榮太樓總本舗 ここ黒蜜あめとかもある
-- ・フランス ナント リゴレット フルーツ 缶
-- ーーーーーーーー

-- ・信玄餅
-- https://kinseiken.co.jp/product/

-- ・プリン ちょっと高級そうなやつ
-- https://thpurin.com/


-- ・オーガニックの金平糖 彩輪商店

-- ・冷しみたらし
-- https://eclat.hpplus.jp/jmadam/yumiko01/gourmet/204131/01/

-- ・エアーストリーム
-- 富山の味噌ラーメンがめっちゃ美味しいお店。今のところ、これまで食べた味噌ラーメンで一番美味しかったのはここか大阪の坂本龍馬のお店のどちらか。

-- 神保町の焼肉屋も載せておく



-- ーーーーーーーーーーーーー

-- レシピも追加したい
-- お店、通販・商品、料理、レシピ
-- みたいに分かれているから、そのあたりもどうにかしたい

-- 行ってみたいお店、食べてみたい料理・食材・お菓子、作ってみたい料理は全部別ものなので、
-- そのあたりを上手く整理したい






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
  ('8401bbac-76b7-48e0-badf-62b6c979d6a0', 'c1d2e3f4-a5b6-7890-1234-567890123456'),
  -- 焼酎 宝山 × 焼酎
  ('9c851a79-24e7-45d5-b4c7-c644d9cdcffb', 'ec99c2f6-ef95-44ad-baf6-2064e6588a52'),
  -- 扇屋製菓 メロンパフェ × スイーツ
  ('63d5eec0-33c3-442e-80a7-8c58eb73b7a4', 'c9d0e1f2-a3b4-5678-2345-789012345678'),
  -- あつみのかりんとう × お菓子
  ('3a1ad2e8-5882-4fca-9b15-b8a8940e3be5', 'c5d6e7f8-a9b0-1234-5678-901234567890'),
  -- 渋谷のハワイのお店 × ハワイアン
  ('7c427bc9-5e7c-4d4b-b20f-6e7e10db78cd', 'ae840b2e-d3fa-4c3e-9d36-1cb829232b23'),
  -- ウルフギャング × ステーキ
  ('f7556089-5619-4c83-82aa-a06b3b056da2', '73310851-188a-4047-af82-ee7438d2fc5f'),
  -- 浅草 楓 × 和菓子
  ('2f283474-5e28-417c-ac09-ba5112f7400e', '5c4eaca8-d1e8-421e-97ae-464f8439524e'),
  -- 餅屋半兵衛 × 和菓子
  ('e23e1ff8-d1c6-40a3-b750-2212ab85a9d1', '5c4eaca8-d1e8-421e-97ae-464f8439524e'),
  -- 貝料理の専門店 × まぜそば, 貝料理
  ('b5c6d7e8-f9a0-1234-5678-901234567890', 'f2a3b4c5-d6e7-8901-2345-678901234567'),
  ('b5c6d7e8-f9a0-1234-5678-901234567890', '6f639741-3560-435a-8e67-7e62d7721453'),
  -- ブラジル料理のお店 シュハスカリア × ブラジル料理, ランチ
  ('d3e4f5a6-b7c8-9012-3456-789012345678', 'fcbce47c-9951-45dc-b6aa-e82d48c311c7'),
  ('d3e4f5a6-b7c8-9012-3456-789012345678', 'a7b8c9d0-e1f2-3456-0123-567890123456'),
  -- 上野の中華のお店 × 中華
  ('d478cecd-7a2b-45fe-adff-f1f4b925b6f9', 'd0e1f2a3-b4c5-6789-0123-456789012345'),
  -- シェラスコ アレグリア渋谷 × ブラジル料理
  ('162bb720-e55f-4b82-b42a-ac4b0fc879b8', 'fcbce47c-9951-45dc-b6aa-e82d48c311c7'),
  -- 上野のシカゴピザのお店「デリリウムカフェ」 × ピザ
  ('2a0597b7-465f-4527-a336-3672f59f4a09', 'a9b0c1d2-e3f4-5678-9012-345678901234'),
  -- 千駄ヶ谷の茶そば屋さん × そば
  ('5a4d7f52-dafe-41a8-aded-31aed7ed85a3', 'b0c1d2e3-f4a5-6789-0123-456789012345'),
  -- 千駄ヶ谷にある中華屋さん「紫金飯店 原宿店」 × 中華
  ('e2b98ab8-9933-4d28-9911-c8229baa1040', 'd0e1f2a3-b4c5-6789-0123-456789012345'),
  -- しきんはんてんの隣のパスタ「SPAGO」 × パスタ
  ('73d87d09-7e34-402e-ac18-60b1b45fb884', 'fafb56ba-8bc9-4133-a889-bfbef5e7e200'),
  -- まんてん 代々木にある焼肉屋 × 焼肉
  ('0f94ad6a-abfa-4b5b-9526-fdb85d501c8f', 'f6a7b8c9-d0e1-2345-f123-456789012345'),
  -- 千駄ヶ谷のカレーうどん「黒うどん山長 原宿店」 × カレー, うどん
  ('cabdaff4-7d9d-46e1-99de-1578eee0a4b0', 'b8c9d0e1-f2a3-4567-1234-678901234567'),
  ('cabdaff4-7d9d-46e1-99de-1578eee0a4b0', '0ae831dc-c481-4365-a959-7638310c873a'),
  -- とりくら × 水炊き
  ('260ee3c5-0b99-48e2-abbf-bb6d3b97f041', '83598cc7-f4a6-4192-96c9-4b1161875d6a'),
  -- The God Dineer × ハンバーガー
  ('cce91deb-790f-4a1e-9afb-09cca966ad43', '4fdcb64f-56b5-4c61-a88f-472635254c08'),
  -- 浅草どぜう「どぜう飯田屋」 × どじょう
  ('d204765c-137c-4026-b813-4c1eba53729e', '94b00e06-3492-4c64-9740-6c386029e712'),
  -- 浅草どぜう「駒形どぜう 本店」 × どじょう
  ('66f6ba2b-84ee-4a1e-b9f3-b36a08c6b0c8', '94b00e06-3492-4c64-9740-6c386029e712'),
  -- 上野の北京ダックのお店 × 中華
  ('29776b16-843b-4a6c-b43c-27558e9a0fa2', 'd0e1f2a3-b4c5-6789-0123-456789012345'),
  -- トロワ 田原町にあるプリンのお店 × スイーツ
  ('6e6bebbe-6f37-47fd-80fe-c63ad963a1b1', 'c9d0e1f2-a3b4-5678-2345-789012345678'),
  -- 入谷のぺりぺりチキン専門店 × チキン
  ('5ce42dc6-2aa9-43ba-b142-dc10d6592972', 'af4abcd5-6643-4be4-8b02-58f7ee798b90'),
  -- 神保町のフレッシュムーン × 和菓子
  ('f1b90691-6c56-41af-9368-df0bf3c4f159', '5c4eaca8-d1e8-421e-97ae-464f8439524e'),
  -- うさぎが食べられるお店 御徒町にある × ジビエ
  ('0a9bd73a-93f5-4d20-b496-b18942d04924', 'b057402d-c8db-49b3-8087-859c286181c1'),
  -- ズーガンズー ワニとカンガルーの肉が食べられる × ジビエ
  ('b1c79d35-8dc5-428f-a7b9-ec542337a39c', 'b057402d-c8db-49b3-8087-859c286181c1'),
  -- 幸運豚人/Tsui-teru! Porkman 中野にある豚肉のお店 × 豚肉
  ('9e459503-c056-42ce-a88d-c568882c0041', '1ee26916-7940-487d-b8b9-d3fdaedb0dbd')
on conflict (post_id, tag_id) do nothing;

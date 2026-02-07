-- ブログ関連テーブルのシーダー

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
  ),
  (
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    '佐藤花子',
    'カフェ巡りが趣味のライター。',
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
    'グルメ',
    'gourmet'
  ),
  (
    'd4e5f6a7-b8c9-0123-def1-234567890123',
    'カフェ',
    'cafe'
  ),
  (
    'e5f6a7b8-c9d0-1234-ef12-345678901234',
    'ライフスタイル',
    'lifestyle'
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
  content,
  status,
  published_at
) values
  (
    'd0e1f2a3-b4c5-6789-3456-890123456789',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '六本木でおすすめの焼肉ランチ',
    'roppongi-yakiniku-lunch',
    '六本木エリアで食べられる美味しい焼肉ランチをご紹介します。

## 肉源 六本木店

ランチで食べられる焼肉と冷麺のセットがおすすめ。お肉の質も良く、コスパ抜群です。',
    'published',
    now()
  ),
  (
    'e1f2a3b4-c5d6-7890-4567-901234567890',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'd4e5f6a7-b8c9-0123-def1-234567890123',
    '浅草橋エリアのおすすめランチスポット',
    'asakusabashi-lunch-spots',
    '浅草橋周辺で見つけた美味しいランチスポットをまとめました。

## 四川食堂KARyu

辛くない料理もあるので、辛いものが苦手な方でも楽しめます。',
    'published',
    now()
  ),
  (
    'f2a3b4c5-d6e7-8901-5678-012345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    '犬山のおすすめスイーツ：ココトモバウム',
    'inuyama-cocotomo-baum',
    '愛知県犬山市にある米粉のバウムクーヘン専門店「ココトモバウム」をご紹介。

## ココトモバウム

米粉を使用したバウムクーヘンが絶品。特に玄米のバウムクーヘンがおすすめです。通販もあるので全国どこからでも購入可能。',
    'draft',
    null
  )
on conflict (id) do update
set
  author_id = excluded.author_id,
  category_id = excluded.category_id,
  title = excluded.title,
  slug = excluded.slug,
  content = excluded.content,
  status = excluded.status,
  published_at = excluded.published_at;

-- 記事×タグ
insert into public.post_tags (
  post_id,
  tag_id
) values
  ('d0e1f2a3-b4c5-6789-3456-890123456789', 'f6a7b8c9-d0e1-2345-f123-456789012345'), -- 焼肉ランチ記事 × 焼肉
  ('d0e1f2a3-b4c5-6789-3456-890123456789', 'a7b8c9d0-e1f2-3456-0123-567890123456'), -- 焼肉ランチ記事 × ランチ
  ('e1f2a3b4-c5d6-7890-4567-901234567890', 'a7b8c9d0-e1f2-3456-0123-567890123456'), -- 浅草橋記事 × ランチ
  ('f2a3b4c5-d6e7-8901-5678-012345678901', 'c9d0e1f2-a3b4-5678-2345-789012345678')  -- スイーツ記事 × スイーツ
on conflict (post_id, tag_id) do nothing;

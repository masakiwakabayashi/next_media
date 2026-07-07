-- 特集関連テーブルのシーダー

-- 特集: 邪神ちゃんドロップキック 聖地巡礼(神保町編)
insert into public.collections (
  id,
  title,
  slug,
  description,
  image_path,
  status,
  published_at
) values (
  '87c0cb3c-1a65-41b6-8d74-22cc3c3eee08',
  '邪神ちゃんドロップキック 聖地巡礼(神保町編)',
  'jashinchan-dropkick-jimbocho',
  '邪神ちゃんドロップキックに登場する神保町のお店を巡る特集。',
  '/images/collections/sample.jpg',
  'published',
  now()
)
on conflict (id) do update
set
  title = excluded.title,
  slug = excluded.slug,
  description = excluded.description,
  image_path = excluded.image_path,
  status = excluded.status,
  published_at = excluded.published_at;

-- 特集×記事
insert into public.collection_posts (
  collection_id,
  post_id,
  position
) values
  -- 神保町のフレッシュムーン「橘昌文銭堂」
  ('87c0cb3c-1a65-41b6-8d74-22cc3c3eee08', 'f1b90691-6c56-41af-9368-df0bf3c4f159', 0),
  -- 神保町のカレー「ボンディ」
  ('87c0cb3c-1a65-41b6-8d74-22cc3c3eee08', '4b6495bb-a016-4af5-8b8b-1f94d5846f0e', 1),
  -- 「大丸やき茶房」神保町の大丸やきのお店
  ('87c0cb3c-1a65-41b6-8d74-22cc3c3eee08', '16030160-97d6-4d24-8440-0868251fd11d', 2),
  -- 「さぼうる」神保町の生いちごジュース
  ('87c0cb3c-1a65-41b6-8d74-22cc3c3eee08', 'bfa336b8-6354-4fd9-9612-1e02a80e1c94', 3)
on conflict (collection_id, post_id) do update
set position = excluded.position;

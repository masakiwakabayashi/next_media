-- 20251218_create_restaurant_schema.sql
-- Supabase (PostgreSQL) migration

-- UUID生成用
create extension if not exists pgcrypto;

-- ENUM 定義
do $$
begin
  if not exists (select 1 from pg_type where typname = 'restaurant_link_type') then
    create type restaurant_link_type as enum ('official', 'tabelog', 'rakuten', 'other');
  end if;

  if not exists (select 1 from pg_type where typname = 'restaurant_wish_status') then
    create type restaurant_wish_status as enum ('want_to_go', 'good', 'repeat');
  end if;
end $$;

-- レストランテーブル
create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),

  wish_status restaurant_wish_status not null,  -- 行ってみたい / また行きたい
  rating smallint,                               -- 星3,4,5
  name text not null,                            -- 店舗名
  comment text,                                  -- コメント
  address text,                                  -- 住所
  google_maps_embed_url text,                    -- Googleマップ埋め込みリンク
  business_days_note text,                       -- 営業日・定休日

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint restaurants_rating_check
    check (rating is null or rating in (3,4,5))
);

create index if not exists idx_restaurants_wish_status
  on public.restaurants (wish_status);
create index if not exists idx_restaurants_rating
  on public.restaurants (rating);

-- updated_at 自動更新
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_restaurants_set_updated_at on public.restaurants;
create trigger trg_restaurants_set_updated_at
before update on public.restaurants
for each row execute function public.set_updated_at();

-- 写真テーブル
create table if not exists public.restaurant_photos (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null
    references public.restaurants(id) on delete cascade,
  url text not null,

  created_at timestamptz not null default now()
);

create index if not exists idx_restaurant_photos_restaurant_id
  on public.restaurant_photos (restaurant_id);

-- タグテーブル
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,

  created_at timestamptz not null default now()
);

-- レストランとタグの中間テーブル
create table if not exists public.restaurant_tags (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null
    references public.restaurants(id) on delete cascade,
  tag_id uuid not null
    references public.tags(id) on delete cascade,

  created_at timestamptz not null default now(),

  constraint restaurant_tags_unique unique (restaurant_id, tag_id)
);

create index if not exists idx_restaurant_tags_restaurant_id
  on public.restaurant_tags (restaurant_id);
create index if not exists idx_restaurant_tags_tag_id
  on public.restaurant_tags (tag_id);

-- リンクテーブル
create table if not exists public.restaurant_links (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null
    references public.restaurants(id) on delete cascade,
  link_type restaurant_link_type not null, -- 公式 / 食べログ / 楽天
  url text not null,

  created_at timestamptz not null default now()
);

create index if not exists idx_restaurant_links_restaurant_id
  on public.restaurant_links (restaurant_id);
create index if not exists idx_restaurant_links_type
  on public.restaurant_links (link_type);


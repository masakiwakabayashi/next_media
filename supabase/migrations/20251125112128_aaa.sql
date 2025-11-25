-- UUID生成用
create extension if not exists "pgcrypto";

-- ユーザープロフィール
create table public.user_profile (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'user',
  icon_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 飲食店テーブル
create table public.restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  prefecture text,
  address text,
  website_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_restaurants_prefecture on public.restaurants (prefecture);

-- タグ
create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

-- 飲食店 × タグ 中間テーブル
create table public.restaurant_tags (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- 同じ店に同じタグを重複して付けられないようにする
create unique index uniq_restaurant_tags_restaurant_tag
  on public.restaurant_tags (restaurant_id, tag_id);

create index idx_restaurant_tags_restaurant_id
  on public.restaurant_tags (restaurant_id);

create index idx_restaurant_tags_tag_id
  on public.restaurant_tags (tag_id);






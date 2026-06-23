-- 0001_create_blog_tables.sql

-- UUID生成用
create extension if not exists "pgcrypto";

-- updated_at 自動更新用 function
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ユーザープロフィール
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  bio text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- カテゴリ
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index categories_slug_idx on public.categories (slug);

create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

-- タグ
create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index tags_slug_idx on public.tags (slug);

create trigger tags_set_updated_at
before update on public.tags
for each row execute function public.set_updated_at();

-- 記事
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete restrict,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  image_path text,
  content text not null, -- ここに食べログのリンクを入れたり詳細とかを書く想定
  google_maps_url text, -- Googleマップのリンクがあった方が場所がわかりやすい
  status text not null default 'draft', -- draft | published
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint posts_status_check check (status in ('draft', 'published'))
);

create index posts_slug_idx on public.posts (slug);
create index posts_status_published_at_idx on public.posts (status, published_at desc);
create index posts_author_id_idx on public.posts (author_id);
create index posts_category_id_idx on public.posts (category_id);

create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

-- 記事 × タグ（多対多）
create table public.post_tags (
  post_id uuid not null references public.posts(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, tag_id)
);

create index post_tags_tag_id_idx on public.post_tags (tag_id);




-- profiles テーブルに auth.users への参照カラムを追加
ALTER TABLE public.profiles
  ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);

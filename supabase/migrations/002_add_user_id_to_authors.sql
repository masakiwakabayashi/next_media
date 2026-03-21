-- authors テーブルに auth.users への参照カラムを追加
ALTER TABLE public.authors
  ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

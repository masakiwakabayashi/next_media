-- RLS を有効化
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

-- 管理者判定ヘルパー関数
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
$$;

-- posts: 公開済みは全認証ユーザー、下書きは管理者のみ
CREATE POLICY "posts_select"
  ON public.posts FOR SELECT
  USING (status = 'published' OR public.is_admin());

CREATE POLICY "posts_insert"
  ON public.posts FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "posts_update"
  ON public.posts FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "posts_delete"
  ON public.posts FOR DELETE
  USING (public.is_admin());

-- authors: 全認証ユーザーが読み取り可、書き込みは管理者のみ
CREATE POLICY "authors_select"
  ON public.authors FOR SELECT USING (true);

CREATE POLICY "authors_insert"
  ON public.authors FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "authors_update"
  ON public.authors FOR UPDATE USING (public.is_admin());

CREATE POLICY "authors_delete"
  ON public.authors FOR DELETE USING (public.is_admin());

-- categories: 全認証ユーザーが読み取り可、書き込みは管理者のみ
CREATE POLICY "categories_select"
  ON public.categories FOR SELECT USING (true);

CREATE POLICY "categories_insert"
  ON public.categories FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "categories_update"
  ON public.categories FOR UPDATE USING (public.is_admin());

CREATE POLICY "categories_delete"
  ON public.categories FOR DELETE USING (public.is_admin());

-- tags: 全認証ユーザーが読み取り可、書き込みは管理者のみ
CREATE POLICY "tags_select"
  ON public.tags FOR SELECT USING (true);

CREATE POLICY "tags_insert"
  ON public.tags FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "tags_update"
  ON public.tags FOR UPDATE USING (public.is_admin());

CREATE POLICY "tags_delete"
  ON public.tags FOR DELETE USING (public.is_admin());

-- post_tags: 読み取りは全認証ユーザー（posts の RLS で下書きへのアクセスは制限される）
-- 書き込みは管理者のみ
CREATE POLICY "post_tags_select"
  ON public.post_tags FOR SELECT USING (true);

CREATE POLICY "post_tags_insert"
  ON public.post_tags FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "post_tags_update"
  ON public.post_tags FOR UPDATE USING (public.is_admin());

CREATE POLICY "post_tags_delete"
  ON public.post_tags FOR DELETE USING (public.is_admin());

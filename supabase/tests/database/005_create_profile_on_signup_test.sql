-- supabase/migrations/005_create_profile_on_signup.sql の検証
--   関数     : public.handle_new_user()
--   トリガー : auth.users への INSERT 時に on_auth_user_created が発火し、
--              public.profiles に user_id / display_name を自動挿入する
--
-- 実行方法: supabase test db
--   （pgTAP を使った SQL テスト。BEGIN 〜 ROLLBACK で囲っているため副作用は残らない）

BEGIN;

SELECT plan(11);

-- ---------------------------------------------------------------------------
-- テスト用の auth.users レコードを作るヘルパー（このセッション限定の一時関数）
-- ---------------------------------------------------------------------------
CREATE FUNCTION pg_temp.make_auth_user(p_id uuid, p_email text, p_meta jsonb)
RETURNS void
LANGUAGE sql
AS $$
  INSERT INTO auth.users (
    id, instance_id, role, aud, email,
    raw_app_meta_data, raw_user_meta_data, encrypted_password,
    created_at, updated_at,
    confirmation_token, recovery_token, email_change_token_new, email_change
  )
  VALUES (
    p_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    p_email,
    '{"provider":"email","providers":["email"]}'::jsonb,
    p_meta,
    'x',
    now(), now(),
    '', '', '', ''
  );
$$;

-- ---------------------------------------------------------------------------
-- スキーマ構造の確認
-- ---------------------------------------------------------------------------
SELECT has_function(
  'public', 'handle_new_user', ARRAY[]::text[],
  'public.handle_new_user() 関数が存在する'
);

SELECT has_trigger(
  'auth', 'users', 'on_auth_user_created',
  'auth.users に on_auth_user_created トリガーが存在する'
);

SELECT trigger_is(
  'auth', 'users', 'on_auth_user_created',
  'public', 'handle_new_user',
  'on_auth_user_created は public.handle_new_user() を実行する'
);

-- ---------------------------------------------------------------------------
-- ケース1: raw_user_meta_data.full_name がある場合、それが display_name になる
-- ---------------------------------------------------------------------------
SELECT pg_temp.make_auth_user(
  '00000000-0000-0000-0000-0000000000a1',
  'has-fullname@example.com',
  '{"full_name": "山田花子"}'::jsonb
);

SELECT is(
  (SELECT display_name FROM public.profiles
     WHERE user_id = '00000000-0000-0000-0000-0000000000a1'),
  '山田花子',
  'full_name がある場合は display_name に full_name が入る'
);

SELECT is(
  (SELECT count(*)::int FROM public.profiles
     WHERE user_id = '00000000-0000-0000-0000-0000000000a1'),
  1,
  'サインアップ1回につき profiles が1件だけ作成される'
);

-- ---------------------------------------------------------------------------
-- ケース2: full_name が無い場合は email が display_name になる
-- ---------------------------------------------------------------------------
SELECT pg_temp.make_auth_user(
  '00000000-0000-0000-0000-0000000000a2',
  'no-fullname@example.com',
  '{"some_other_key": "値"}'::jsonb
);

SELECT is(
  (SELECT display_name FROM public.profiles
     WHERE user_id = '00000000-0000-0000-0000-0000000000a2'),
  'no-fullname@example.com',
  'full_name が無い場合は display_name に email が入る'
);

-- ---------------------------------------------------------------------------
-- ケース3: raw_user_meta_data が空 {} でも email にフォールバックする
-- ---------------------------------------------------------------------------
SELECT pg_temp.make_auth_user(
  '00000000-0000-0000-0000-0000000000a3',
  'empty-meta@example.com',
  '{}'::jsonb
);

SELECT is(
  (SELECT display_name FROM public.profiles
     WHERE user_id = '00000000-0000-0000-0000-0000000000a3'),
  'empty-meta@example.com',
  'メタデータが空 {} でも email にフォールバックする'
);

SELECT is(
  (SELECT user_id FROM public.profiles
     WHERE user_id = '00000000-0000-0000-0000-0000000000a3'),
  '00000000-0000-0000-0000-0000000000a3'::uuid,
  '作成された profiles.user_id が auth.users.id と一致する'
);

-- ---------------------------------------------------------------------------
-- ケース4: 既に同じ user_id の profiles が存在する場合
--          ON CONFLICT (user_id) DO NOTHING でエラーにならず、既存行も変更されない
--
-- profiles.user_id は auth.users(id) を参照する FK を持つため、先に profiles だけを
-- 作ることができない。seed と同じく session_replication_role='replica' で
-- トリガー / FK チェックを一時的に止め、先に「既存プロフィール」を用意しておく。
-- ---------------------------------------------------------------------------
SET LOCAL session_replication_role = 'replica';
INSERT INTO public.profiles (user_id, display_name)
VALUES ('00000000-0000-0000-0000-0000000000a4', '既存プロフィール');
SET LOCAL session_replication_role = 'origin';

SELECT lives_ok(
  $$ SELECT pg_temp.make_auth_user(
       '00000000-0000-0000-0000-0000000000a4',
       'conflict@example.com',
       '{"full_name": "上書きされない名前"}'::jsonb
     ) $$,
  '同じ user_id の profiles が既存でも auth.users への INSERT は成功する'
);

SELECT is(
  (SELECT display_name FROM public.profiles
     WHERE user_id = '00000000-0000-0000-0000-0000000000a4'),
  '既存プロフィール',
  'ON CONFLICT DO NOTHING により既存の profiles は上書きされない'
);

SELECT is(
  (SELECT count(*)::int FROM public.profiles
     WHERE user_id = '00000000-0000-0000-0000-0000000000a4'),
  1,
  '既存 profiles があっても重複行は作られない'
);

SELECT * FROM finish();

ROLLBACK;

---
name: e2e
description: |
  Full-stack e2e テストを生成して実行する。引数でテストしたい機能を指定すると、
  対象コードを読んでセレクタを把握し、Supabase でのデータ seed/cleanup 付きの
  テストファイルを生成して即実行する。/e2e-setup が完了していることが前提。
  使い方: /e2e <テストしたい機能の説明>
  例: /e2e 記事の新規作成から下書き一覧への反映
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
---

引数で指定された機能の e2e テストを生成して実行する。

## Step 1: 前提確認

```bash
ls e2e/fixtures/index.ts e2e/helpers/db.ts e2e/setup/auth.setup.ts playwright.config.ts 2>&1
```

`e2e/fixtures/index.ts` が存在しない場合は「先に `/e2e-setup` を実行してください」と伝えて停止する。

## Step 2: テスト対象を把握する

引数（テストしたい機能）から対象のページ・コンポーネント・アクションを特定する。

関連するファイルを Read する（例: 記事作成なら）:
- `app/(admin)/admin/posts/new/page.tsx`
- `app/(admin)/admin/posts/drafts/page.tsx`
- `features/` 以下の Server Actions
- `components/` 以下の関連コンポーネント

```bash
find app features components -type f -name "*.tsx" | head -30
```

フォームの input や button の `name`, `aria-label`, `role`, `data-testid` 属性を確認して正確なセレクタを把握する。

## Step 3: テストファイルを生成する

ファイル名は `e2e/<feature-name>.spec.ts` の形式にする（例: `e2e/post-creation.spec.ts`）。

**テストの構造テンプレート**:

```typescript
import { test, expect } from './fixtures/index';
import { createTestAuthor, createTestPost, deletePost, deleteAuthor } from './helpers/db';
import * as path from 'path';

// 管理者の storageState を使用 (admin テスト) または user.json (一般ユーザーテスト)
const ADMIN_STATE = path.join(__dirname, '.auth/admin.json');

test.use({ storageState: ADMIN_STATE });

test.describe('<機能名>', () => {
  let authorId: string;

  test.beforeEach(async ({ supabaseAdmin, cleanup }) => {
    // テストデータを DB に直接投入
    authorId = await createTestAuthor(supabaseAdmin, { display_name: 'テスト著者' });
    
    // afterEach で自動クリーンアップ登録
    cleanup(async () => {
      await deleteAuthor(supabaseAdmin, authorId);
    });
  });

  test('<具体的なシナリオ>', async ({ page, supabaseAdmin, cleanup }) => {
    // 1. ページへ移動
    await page.goto('/admin/posts/new');

    // 2. UI 操作
    await page.getByLabel('タイトル').fill('テスト記事');
    await page.getByRole('button', { name: '保存' }).click();

    // 3. UI のアサーション
    await expect(page.getByText('保存しました')).toBeVisible();

    // 4. DB のアサーション (UIだけでなく実際にデータが保存されたか確認)
    const { data } = await supabaseAdmin
      .from('posts')
      .select('id, title, status')
      .eq('title', 'テスト記事')
      .single();
    
    expect(data).not.toBeNull();
    expect(data!.status).toBe('draft');

    // 作成したレコードも cleanup に登録
    cleanup(async () => {
      await deletePost(supabaseAdmin, data!.id);
    });
  });
});
```

**重要なルール**:
- セレクタは Read で確認した実際の属性を使う。推測しない
- `cleanup()` で登録した関数は afterEach で逆順実行される（子→親の順で安全に削除できる）
- DB アサーションは UI アサーションの後に置く
- テストは 1 シナリオ = 1 `test()` ブロック。複数シナリオある場合は別々の `test()` に分割
- `storageState` は admin/user を機能に合わせて選ぶ
  - admin 機能: `ADMIN_STATE` (user1@example.com)
  - 一般ユーザー機能: `USER_STATE` = `path.join(__dirname, '.auth/user.json')`

## Step 4: セレクタの検証 (オプション)

dev サーバーが起動していれば gstack browse でセレクタを事前確認できる:

```bash
# gstack browse が使えるなら (別スキル /browse を参照)
# アプリが起動していれば snapshot で確認
```

起動していない場合はコードから推測したセレクタで生成して実行時に確認する。

## Step 5: テストを実行する

```bash
# 指定ファイルのみ実行 (chromium のみ、高速)
pnpm playwright test e2e/<生成したファイル名>.spec.ts --project=chromium 2>&1
```

dev サーバーが起動していない場合は playwright.config.ts の webServer が自動起動するが時間がかかる。その場合は別ターミナルで `pnpm dev` を先に起動するようユーザーに伝える。

## Step 6: 結果を報告する

**成功した場合**:
- 何を確認したか（UI / DB 両方）を簡潔に伝える
- テストファイルのパスを示す

**失敗した場合**:
1. エラーメッセージを読んでセレクタのズレか、DB接続か、データ問題かを特定する
2. セレクタのズレ → 実際のコードを再 Read して修正
3. DB 接続エラー → `.env.test` の SUPABASE_SECRET_KEY を確認するよう促す
4. `storageState` が存在しない → `pnpm playwright test --project=setup` を実行するよう促す
5. 修正後に再実行して確認する

失敗が3回続いたら原因を報告して停止する。

## ヒント

- **一般ユーザーと管理者の両方をテストしたい場合**: `test.describe` を2つに分けて `test.use({ storageState })` を別々に設定する
- **ページをまたぐフロー**: `page.goto()` を複数呼んで遷移を確認する
- **楽観的UI (即時反映) のテスト**: `await expect(locator).toBeVisible()` は自動でリトライするので sleep は不要
- **エラーケースのテスト**: 意図的に不正なデータを入力して、エラーメッセージが表示されることを確認する

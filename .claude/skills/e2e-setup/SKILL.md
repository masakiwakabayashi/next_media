---
name: e2e-setup
description: |
  One-time setup for full-stack Playwright e2e tests with Supabase local.
  Configures playwright.config.ts (baseURL, webServer, dotenv), creates shared
  Supabase admin fixtures for test data seed/cleanup, and generates auth storage
  states for test users. Run once before writing any e2e tests with /e2e.
allowed-tools:
  - Bash
  - Read
  - Edit
  - Write
---

このプロジェクトのフルスタック e2e テスト環境を一度だけセットアップする。

## Step 1: 現状確認

```bash
cat .env
cat playwright.config.ts
ls e2e/
```

ローカル Supabase の認証情報を確認する:

```bash
pnpm supabase status 2>/dev/null | grep -E "API URL|anon key|service_role key" || echo "supabase status unavailable"
```

## Step 2: .env.test を作成

プロジェクトルートに `.env.test` を作成する。ローカル Supabase のデフォルト値を使用:

```
# ローカル Supabase (supabase status で確認した値を使う)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:55321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<supabase status の anon key>
SUPABASE_SECRET_KEY=<supabase status の service_role key>

# テスト用アプリURL
BASE_URL=http://localhost:3000
```

`supabase status` が使えない場合はローカル Supabase のデフォルトキーを使う:
- anon key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRFA0NiK7T9fuKy3EZpvVt7duMMN9JSvVloBurBr7LE`
- service_role key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hj04zWl196z2-SBc0`

## Step 3: playwright.config.ts を更新

以下を反映するよう playwright.config.ts を Edit する:
1. `dotenv` で `.env.test` を読み込む（`import dotenv/config` を使う）
2. `use.baseURL` を `process.env.BASE_URL ?? 'http://localhost:3000'` に設定
3. `webServer` を追加してテスト前に dev サーバーを自動起動
4. ローカル実行は `chromium` のみに絞り高速化（firefox/webkit はコメントアウト）
5. `use.storageState` は後で fixture 側で制御するので設定しない

更新後の playwright.config.ts のイメージ:

```typescript
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config'; // .env.test を読み込む（NODE_ENV=test 時）

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false, // DB状態を共有するためシリアル実行
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    // 認証状態を生成するセットアップ
    {
      name: 'setup',
      testMatch: '**/e2e/setup/*.setup.ts',
    },
    // メインテスト (chromium のみ)
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      dependencies: ['setup'],
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
```

dotenv を使うため `dotenv` パッケージが必要か確認:
```bash
pnpm list dotenv 2>/dev/null || echo "not installed"
```

未インストールなら:
```bash
pnpm add -D dotenv
```

ただし `dotenv/config` でなく Next.js 側で env が読まれているなら playwright 側は `process.env` 経由で読むだけでも可。その場合は `.env.test` を実行時に手動で export させるか、`envFile` オプションを使う。

実際には playwright.config.ts で以下のように読み込むほうがシンプルな場合も多い:

```typescript
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env.test') });
```

## Step 4: 共有 fixture を作成

`e2e/fixtures/index.ts` を作成する。このファイルが全テストの起点になる:

```typescript
import { test as base, expect, Page } from '@playwright/test';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

type Cleanup = () => Promise<void>;

type TestFixtures = {
  supabaseAdmin: SupabaseClient;
  cleanup: (fn: Cleanup) => void;
};

export const test = base.extend<TestFixtures>({
  supabaseAdmin: async ({}, use) => {
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    );
    await use(client);
  },

  cleanup: async ({}, use) => {
    const fns: Cleanup[] = [];
    await use((fn) => fns.push(fn));
    // afterEach 相当: 逆順でクリーンアップ
    for (const fn of fns.reverse()) {
      await fn();
    }
  },
});

export { expect };
```

`@supabase/supabase-js` はすでに依存に含まれているので追加不要。

## Step 5: 認証セットアップファイルを作成

`e2e/setup/auth.setup.ts` を作成する。テストユーザーでログインして storageState（クッキー＋localStorage）を保存する:

```typescript
import { test as setup } from '@playwright/test';
import * as path from 'path';

const ADMIN_STATE = path.join(__dirname, '../.auth/admin.json');
const USER_STATE = path.join(__dirname, '../.auth/user.json');

// 管理者ユーザー (user1@example.com)
setup('authenticate as admin', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel(/メールアドレス|email/i).fill('user1@example.com');
  await page.getByLabel(/パスワード|password/i).fill('passwo!rd');
  await page.getByRole('button', { name: /ログイン|sign in/i }).click();
  await page.waitForURL(/\/admin|^\//);
  await page.context().storageState({ path: ADMIN_STATE });
});

// 一般ユーザー (user2@example.com)
setup('authenticate as user', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel(/メールアドレス|email/i).fill('user2@example.com');
  await page.getByLabel(/パスワード|password/i).fill('passwo!rd');
  await page.getByRole('button', { name: /ログイン|sign in/i }).click();
  await page.waitForURL(/^\//);
  await page.context().storageState({ path: USER_STATE });
});
```

実際のログインページの input の label/role は `e2e/setup/auth.setup.ts` を書く前に Read で確認し、正確なセレクタを使うこと。

`e2e/.auth/` ディレクトリを `.gitignore` に追加:
```bash
echo "e2e/.auth/" >> .gitignore
```

## Step 6: テスト用ヘルパー関数を作成

`e2e/helpers/db.ts` を作成する。このプロジェクトの DB スキーマ（authors, posts, categories, tags）に合わせたヘルパー:

```typescript
import { SupabaseClient } from '@supabase/supabase-js';

// テスト用の著者を作成して ID を返す
export async function createTestAuthor(
  db: SupabaseClient,
  overrides: Partial<{ display_name: string; bio: string }> = {}
) {
  const { data, error } = await db
    .from('authors')
    .insert({
      display_name: overrides.display_name ?? `Test Author ${Date.now()}`,
      bio: overrides.bio ?? 'Test bio',
    })
    .select('id')
    .single();
  if (error) throw error;
  return data.id as string;
}

// テスト用の下書き記事を作成して ID を返す
export async function createTestPost(
  db: SupabaseClient,
  authorId: string,
  overrides: Partial<{ title: string; slug: string; status: string }> = {}
) {
  const slug = overrides.slug ?? `test-post-${Date.now()}`;
  const { data, error } = await db
    .from('posts')
    .insert({
      author_id: authorId,
      title: overrides.title ?? 'Test Post',
      slug,
      content: 'Test content',
      status: overrides.status ?? 'draft',
    })
    .select('id')
    .single();
  if (error) throw error;
  return data.id as string;
}

// 記事を ID で削除
export async function deletePost(db: SupabaseClient, id: string) {
  await db.from('posts').delete().eq('id', id);
}

// 著者を ID で削除
export async function deleteAuthor(db: SupabaseClient, id: string) {
  await db.from('authors').delete().eq('id', id);
}
```

## Step 7: 確認

```bash
ls e2e/
ls e2e/fixtures/
ls e2e/setup/
cat playwright.config.ts
```

## Step 8: ユーザーへの案内

セットアップ完了後、以下を伝える:

1. **ローカル Supabase を起動してから使うこと**:
   ```bash
   pnpm supabase start
   ```

2. **認証状態を生成する** (初回と認証情報が変わった時):
   ```bash
   pnpm playwright test --project=setup
   ```

3. **テストを書く**: `/e2e <テストしたい機能の説明>` でテストを生成できる

4. **.env.test を `.gitignore` に追加することを検討** (サービスロールキーが入るため)

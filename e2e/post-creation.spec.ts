import { test, expect } from '@playwright/test';
import * as path from 'path';

const ADMIN_STATE = path.join(__dirname, '.auth/admin.json');

test.use({ storageState: ADMIN_STATE });

test.describe('記事の新規作成', () => {
  const testSlug = `test-post-creation-${Date.now()}`;

  test('フォームを送信すると DB に下書きが保存され、下書き一覧に表示される', async ({ page }) => {
    await page.goto('/admin/posts/new');

    await page.locator('#title').fill('E2Eテスト用記事');
    await page.locator('#slug').fill(testSlug);
    await page.locator('#content').fill('E2Eテスト用の本文です。');

    // ステータスはデフォルトで「下書き」
    await expect(page.locator('input[name="status"][value="draft"]')).toBeChecked();

    await page.getByRole('button', { name: '保存する' }).click();

    // 保存後に下書き一覧へリダイレクト
    await page.waitForURL('/admin/posts/drafts');

    // UI: 作成した記事が一覧に表示される
    await expect(page.getByRole('heading', { name: 'E2Eテスト用記事' })).toBeVisible();

    // UI: 下書きバッジが表示される
    await expect(page.getByText('下書き').first()).toBeVisible();
  });
});

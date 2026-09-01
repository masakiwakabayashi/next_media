import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { randomUUID } from 'node:crypto'
import { adminClient, anonClient, createAuthedClient, TEST_USERS } from './helpers'

// supabase/migrations/003_add_rls_policies.sql の categories テーブルに対するポリシーを検証する
// - select: 全認証ユーザーが閲覧可能（未ログインユーザーは閲覧不可）
// - insert / update / delete: 管理者のみ

describe('categories RLS', () => {
  const createdCategoryIds: string[] = []

  let selectTargetCategoryId: string
  let updateTargetCategoryId: string
  let deleteTargetCategoryId: string

  async function createFixtureCategory(name: string) {
    const { data, error } = await adminClient
      .from('categories')
      .insert({ name, slug: `rls-test-${randomUUID()}` })
      .select('id')
      .single()

    if (error || !data) {
      throw new Error(`fixture category作成に失敗しました: ${error?.message}`)
    }

    createdCategoryIds.push(data.id)
    return data.id
  }

  beforeAll(async () => {
    selectTargetCategoryId = await createFixtureCategory('カテゴリ(RLSテスト・SELECT用)')
    updateTargetCategoryId = await createFixtureCategory('カテゴリ(RLSテスト・UPDATE用)')
    deleteTargetCategoryId = await createFixtureCategory('カテゴリ(RLSテスト・DELETE用)')
  })

  afterAll(async () => {
    if (createdCategoryIds.length === 0) return
    await adminClient.from('categories').delete().in('id', createdCategoryIds)
  })

  describe('SELECT', () => {
    it('未ログインユーザーはカテゴリを閲覧できない', async () => {
      const { data, error } = await anonClient
        .from('categories')
        .select('id')
        .eq('id', selectTargetCategoryId)

      expect(error).toBeNull()
      expect(data).toHaveLength(0)
    })

    it('一般ユーザーはカテゴリを閲覧できる', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('categories')
        .select('id')
        .eq('id', selectTargetCategoryId)

      expect(error).toBeNull()
      expect(data).toHaveLength(1)
    })
  })

  describe('INSERT', () => {
    it('未ログインユーザーはカテゴリを作成できない', async () => {
      const { error } = await anonClient
        .from('categories')
        .insert({ name: '未ログイン作成テスト', slug: `rls-test-${randomUUID()}` })

      expect(error).not.toBeNull()
      expect(error?.code).toBe('42501')
    })

    it('一般ユーザーはカテゴリを作成できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { error } = await client
        .from('categories')
        .insert({ name: '一般ユーザー作成テスト', slug: `rls-test-${randomUUID()}` })

      expect(error).not.toBeNull()
      expect(error?.code).toBe('42501')
    })

    it('管理者ユーザーはカテゴリを作成できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client
        .from('categories')
        .insert({ name: '管理者作成テスト', slug: `rls-test-${randomUUID()}` })
        .select('id')
        .single()

      expect(error).toBeNull()
      expect(data).not.toBeNull()

      if (data) createdCategoryIds.push(data.id)
    })
  })

  describe('UPDATE', () => {
    it('一般ユーザーはカテゴリを更新できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('categories')
        .update({ name: '改ざんされたカテゴリ名' })
        .eq('id', updateTargetCategoryId)
        .select('id')

      expect(error).toBeNull()
      expect(data).toHaveLength(0)

      const { data: current } = await adminClient
        .from('categories')
        .select('name')
        .eq('id', updateTargetCategoryId)
        .single()
      expect(current?.name).toBe('カテゴリ(RLSテスト・UPDATE用)')
    })

    it('管理者ユーザーはカテゴリを更新できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client
        .from('categories')
        .update({ name: '更新後カテゴリ名' })
        .eq('id', updateTargetCategoryId)
        .select('name')
        .single()

      expect(error).toBeNull()
      expect(data?.name).toBe('更新後カテゴリ名')
    })
  })

  describe('DELETE', () => {
    it('一般ユーザーはカテゴリを削除できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('categories')
        .delete()
        .eq('id', deleteTargetCategoryId)
        .select('id')

      expect(error).toBeNull()
      expect(data).toHaveLength(0)

      const { data: current } = await adminClient
        .from('categories')
        .select('id')
        .eq('id', deleteTargetCategoryId)
        .maybeSingle()
      expect(current).not.toBeNull()
    })

    it('管理者ユーザーはカテゴリを削除できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { error } = await client.from('categories').delete().eq('id', deleteTargetCategoryId)

      expect(error).toBeNull()

      const { data: current } = await adminClient
        .from('categories')
        .select('id')
        .eq('id', deleteTargetCategoryId)
        .maybeSingle()
      expect(current).toBeNull()
    })
  })
})

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { randomUUID } from 'node:crypto'
import { adminClient, anonClient, createAuthedClient, TEST_USERS } from './helpers'

// supabase/migrations/006_create_collections.sql の collections テーブルに対するポリシーを検証する
// - select: 公開済みは全認証ユーザー、下書きは管理者のみ（未ログインユーザーは閲覧不可）
// - insert / update / delete: 管理者のみ

describe('collections RLS', () => {
  const createdCollectionIds: string[] = []

  let selectPublishedCollectionId: string
  let selectDraftCollectionId: string
  let updateTargetCollectionId: string
  let deleteTargetCollectionId: string

  async function createFixtureCollection(status: 'draft' | 'published', title: string) {
    const { data, error } = await adminClient
      .from('collections')
      .insert({ title, slug: `rls-test-${randomUUID()}`, status })
      .select('id')
      .single()

    if (error || !data) {
      throw new Error(`fixture collection作成に失敗しました: ${error?.message}`)
    }

    createdCollectionIds.push(data.id)
    return data.id
  }

  beforeAll(async () => {
    selectPublishedCollectionId = await createFixtureCollection('published', '公開特集(RLSテスト・SELECT用)')
    selectDraftCollectionId = await createFixtureCollection('draft', '下書き特集(RLSテスト・SELECT用)')
    updateTargetCollectionId = await createFixtureCollection('published', '公開特集(RLSテスト・UPDATE用)')
    deleteTargetCollectionId = await createFixtureCollection('published', '公開特集(RLSテスト・DELETE用)')
  })

  afterAll(async () => {
    if (createdCollectionIds.length === 0) return
    await adminClient.from('collections').delete().in('id', createdCollectionIds)
  })

  describe('SELECT', () => {
    it('未ログインユーザーは公開済み特集を閲覧できない', async () => {
      const { data, error } = await anonClient
        .from('collections')
        .select('id')
        .eq('id', selectPublishedCollectionId)

      expect(error).toBeNull()
      expect(data).toHaveLength(0)
    })

    it('未ログインユーザーは下書き特集を閲覧できない', async () => {
      const { data, error } = await anonClient
        .from('collections')
        .select('id')
        .eq('id', selectDraftCollectionId)

      expect(error).toBeNull()
      expect(data).toHaveLength(0)
    })

    it('一般ユーザーは公開済み特集を閲覧できる', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('collections')
        .select('id')
        .eq('id', selectPublishedCollectionId)

      expect(error).toBeNull()
      expect(data).toHaveLength(1)
    })

    it('一般ユーザーは下書き特集を閲覧できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('collections')
        .select('id')
        .eq('id', selectDraftCollectionId)

      expect(error).toBeNull()
      expect(data).toHaveLength(0)
    })

    it('管理者ユーザーは下書き特集も閲覧できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client
        .from('collections')
        .select('id')
        .eq('id', selectDraftCollectionId)

      expect(error).toBeNull()
      expect(data).toHaveLength(1)
    })
  })

  describe('INSERT', () => {
    it('未ログインユーザーは特集を作成できない', async () => {
      const { error } = await anonClient
        .from('collections')
        .insert({ title: '未ログイン作成テスト', slug: `rls-test-${randomUUID()}`, status: 'draft' })

      expect(error).not.toBeNull()
      expect(error?.code).toBe('42501')
    })

    it('一般ユーザーは特集を作成できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { error } = await client
        .from('collections')
        .insert({ title: '一般ユーザー作成テスト', slug: `rls-test-${randomUUID()}`, status: 'draft' })

      expect(error).not.toBeNull()
      expect(error?.code).toBe('42501')
    })

    it('管理者ユーザーは特集を作成できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client
        .from('collections')
        .insert({ title: '管理者作成テスト', slug: `rls-test-${randomUUID()}`, status: 'draft' })
        .select('id')
        .single()

      expect(error).toBeNull()
      expect(data).not.toBeNull()

      if (data) createdCollectionIds.push(data.id)
    })
  })

  describe('UPDATE', () => {
    it('一般ユーザーは特集を更新できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('collections')
        .update({ title: '改ざんされたタイトル' })
        .eq('id', updateTargetCollectionId)
        .select('id')

      expect(error).toBeNull()
      expect(data).toHaveLength(0)

      const { data: current } = await adminClient
        .from('collections')
        .select('title')
        .eq('id', updateTargetCollectionId)
        .single()
      expect(current?.title).toBe('公開特集(RLSテスト・UPDATE用)')
    })

    it('管理者ユーザーは特集を更新できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client
        .from('collections')
        .update({ title: '更新後タイトル' })
        .eq('id', updateTargetCollectionId)
        .select('title')
        .single()

      expect(error).toBeNull()
      expect(data?.title).toBe('更新後タイトル')
    })
  })

  describe('DELETE', () => {
    it('一般ユーザーは特集を削除できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('collections')
        .delete()
        .eq('id', deleteTargetCollectionId)
        .select('id')

      expect(error).toBeNull()
      expect(data).toHaveLength(0)

      const { data: current } = await adminClient
        .from('collections')
        .select('id')
        .eq('id', deleteTargetCollectionId)
        .maybeSingle()
      expect(current).not.toBeNull()
    })

    it('管理者ユーザーは特集を削除できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { error } = await client.from('collections').delete().eq('id', deleteTargetCollectionId)

      expect(error).toBeNull()

      const { data: current } = await adminClient
        .from('collections')
        .select('id')
        .eq('id', deleteTargetCollectionId)
        .maybeSingle()
      expect(current).toBeNull()
    })
  })
})

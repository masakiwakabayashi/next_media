import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { randomUUID } from 'node:crypto'
import { adminClient, anonClient, createAuthedClient, TEST_USERS } from './helpers'

// supabase/migrations/003_add_rls_policies.sql の tags テーブルに対するポリシーを検証する
// - select: 全認証ユーザーが閲覧可能（未ログインユーザーは閲覧不可）
// - insert / update / delete: 管理者のみ

describe('tags RLS', () => {
  const createdTagIds: string[] = []

  let selectTargetTagId: string
  let updateTargetTagId: string
  let deleteTargetTagId: string

  async function createFixtureTag(name: string) {
    const { data, error } = await adminClient
      .from('tags')
      .insert({ name, slug: `rls-test-${randomUUID()}` })
      .select('id')
      .single()

    if (error || !data) {
      throw new Error(`fixture tag作成に失敗しました: ${error?.message}`)
    }

    createdTagIds.push(data.id)
    return data.id
  }

  beforeAll(async () => {
    selectTargetTagId = await createFixtureTag('タグ(RLSテスト・SELECT用)')
    updateTargetTagId = await createFixtureTag('タグ(RLSテスト・UPDATE用)')
    deleteTargetTagId = await createFixtureTag('タグ(RLSテスト・DELETE用)')
  })

  afterAll(async () => {
    if (createdTagIds.length === 0) return
    await adminClient.from('tags').delete().in('id', createdTagIds)
  })

  describe('SELECT', () => {
    it('未ログインユーザーはタグを閲覧できない', async () => {
      const { data, error } = await anonClient.from('tags').select('id').eq('id', selectTargetTagId)

      expect(error).toBeNull()
      expect(data).toHaveLength(0)
    })

    it('一般ユーザーはタグを閲覧できる', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client.from('tags').select('id').eq('id', selectTargetTagId)

      expect(error).toBeNull()
      expect(data).toHaveLength(1)
    })
  })

  describe('INSERT', () => {
    it('未ログインユーザーはタグを作成できない', async () => {
      const { error } = await anonClient
        .from('tags')
        .insert({ name: '未ログイン作成テスト', slug: `rls-test-${randomUUID()}` })

      expect(error).not.toBeNull()
      expect(error?.code).toBe('42501')
    })

    it('一般ユーザーはタグを作成できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { error } = await client
        .from('tags')
        .insert({ name: '一般ユーザー作成テスト', slug: `rls-test-${randomUUID()}` })

      expect(error).not.toBeNull()
      expect(error?.code).toBe('42501')
    })

    it('管理者ユーザーはタグを作成できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client
        .from('tags')
        .insert({ name: '管理者作成テスト', slug: `rls-test-${randomUUID()}` })
        .select('id')
        .single()

      expect(error).toBeNull()
      expect(data).not.toBeNull()

      if (data) createdTagIds.push(data.id)
    })
  })

  describe('UPDATE', () => {
    it('一般ユーザーはタグを更新できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('tags')
        .update({ name: '改ざんされたタグ名' })
        .eq('id', updateTargetTagId)
        .select('id')

      expect(error).toBeNull()
      expect(data).toHaveLength(0)

      const { data: current } = await adminClient
        .from('tags')
        .select('name')
        .eq('id', updateTargetTagId)
        .single()
      expect(current?.name).toBe('タグ(RLSテスト・UPDATE用)')
    })

    it('管理者ユーザーはタグを更新できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client
        .from('tags')
        .update({ name: '更新後タグ名' })
        .eq('id', updateTargetTagId)
        .select('name')
        .single()

      expect(error).toBeNull()
      expect(data?.name).toBe('更新後タグ名')
    })
  })

  describe('DELETE', () => {
    it('一般ユーザーはタグを削除できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('tags')
        .delete()
        .eq('id', deleteTargetTagId)
        .select('id')

      expect(error).toBeNull()
      expect(data).toHaveLength(0)

      const { data: current } = await adminClient
        .from('tags')
        .select('id')
        .eq('id', deleteTargetTagId)
        .maybeSingle()
      expect(current).not.toBeNull()
    })

    it('管理者ユーザーはタグを削除できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { error } = await client.from('tags').delete().eq('id', deleteTargetTagId)

      expect(error).toBeNull()

      const { data: current } = await adminClient
        .from('tags')
        .select('id')
        .eq('id', deleteTargetTagId)
        .maybeSingle()
      expect(current).toBeNull()
    })
  })
})

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { randomUUID } from 'node:crypto'
import { adminClient, anonClient, createAuthedClient, TEST_USERS } from './helpers'

// supabase/migrations/003_add_rls_policies.sql の posts テーブルに対するポリシーを検証する
// - select: 公開済みは全認証ユーザー、下書きは管理者のみ（未ログインユーザーは閲覧不可）
// - insert / update / delete: 管理者のみ

describe('posts RLS', () => {
  let authorProfileId: string
  const createdPostIds: string[] = []

  let selectPublishedPostId: string
  let selectDraftPostId: string
  let updateTargetPostId: string
  let deleteTargetPostId: string

  async function createFixturePost(status: 'draft' | 'published', title: string) {
    const { data, error } = await adminClient
      .from('posts')
      .insert({
        author_id: authorProfileId,
        title,
        slug: `rls-test-${randomUUID()}`,
        content: 'RLSテスト用のダミー本文',
        status,
      })
      .select('id')
      .single()

    if (error || !data) {
      throw new Error(`fixture post作成に失敗しました: ${error?.message}`)
    }

    createdPostIds.push(data.id)
    return data.id
  }

  beforeAll(async () => {
    const { data: profile, error } = await adminClient
      .from('profiles')
      .select('id')
      .eq('user_id', TEST_USERS.admin.id)
      .single()

    if (error || !profile) {
      throw new Error(`管理者ユーザーのprofileが見つかりません: ${error?.message}`)
    }
    authorProfileId = profile.id

    selectPublishedPostId = await createFixturePost('published', '公開記事(RLSテスト・SELECT用)')
    selectDraftPostId = await createFixturePost('draft', '下書き記事(RLSテスト・SELECT用)')
    updateTargetPostId = await createFixturePost('published', '公開記事(RLSテスト・UPDATE用)')
    deleteTargetPostId = await createFixturePost('published', '公開記事(RLSテスト・DELETE用)')
  })

  afterAll(async () => {
    if (createdPostIds.length === 0) return
    await adminClient.from('posts').delete().in('id', createdPostIds)
  })

  describe('SELECT', () => {
    it('未ログインユーザーは公開済み記事を閲覧できない', async () => {
      const { data, error } = await anonClient
        .from('posts')
        .select('id')
        .eq('id', selectPublishedPostId)

      expect(error).toBeNull()
      expect(data).toHaveLength(0)
    })

    it('未ログインユーザーは下書き記事を閲覧できない', async () => {
      const { data, error } = await anonClient.from('posts').select('id').eq('id', selectDraftPostId)

      expect(error).toBeNull()
      expect(data).toHaveLength(0)
    })

    it('一般ユーザーは公開済み記事を閲覧できる', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client.from('posts').select('id').eq('id', selectPublishedPostId)

      expect(error).toBeNull()
      expect(data).toHaveLength(1)
    })

    it('一般ユーザーは下書き記事を閲覧できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client.from('posts').select('id').eq('id', selectDraftPostId)

      expect(error).toBeNull()
      expect(data).toHaveLength(0)
    })

    it('管理者ユーザーは下書き記事も閲覧できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client.from('posts').select('id').eq('id', selectDraftPostId)

      expect(error).toBeNull()
      expect(data).toHaveLength(1)
    })
  })

  describe('INSERT', () => {
    it('未ログインユーザーは記事を作成できない', async () => {
      const { error } = await anonClient.from('posts').insert({
        author_id: authorProfileId,
        title: '未ログインユーザーによる作成テスト',
        slug: `rls-test-${randomUUID()}`,
        content: 'content',
        status: 'draft',
      })

      expect(error).not.toBeNull()
      expect(error?.code).toBe('42501')
    })

    it('一般ユーザーは記事を作成できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { error } = await client.from('posts').insert({
        author_id: authorProfileId,
        title: '一般ユーザーによる作成テスト',
        slug: `rls-test-${randomUUID()}`,
        content: 'content',
        status: 'draft',
      })

      expect(error).not.toBeNull()
      expect(error?.code).toBe('42501')
    })

    it('管理者ユーザーは記事を作成できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const slug = `rls-test-${randomUUID()}`
      const { data, error } = await client
        .from('posts')
        .insert({
          author_id: authorProfileId,
          title: '管理者ユーザーによる作成テスト',
          slug,
          content: 'content',
          status: 'draft',
        })
        .select('id')
        .single()

      expect(error).toBeNull()
      expect(data).not.toBeNull()

      if (data) createdPostIds.push(data.id)
    })
  })

  describe('UPDATE', () => {
    it('一般ユーザーは記事を更新できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('posts')
        .update({ title: '改ざんされたタイトル' })
        .eq('id', updateTargetPostId)
        .select('id')

      expect(error).toBeNull()
      expect(data).toHaveLength(0)

      const { data: current } = await adminClient
        .from('posts')
        .select('title')
        .eq('id', updateTargetPostId)
        .single()
      expect(current?.title).toBe('公開記事(RLSテスト・UPDATE用)')
    })

    it('管理者ユーザーは記事を更新できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client
        .from('posts')
        .update({ title: '更新後タイトル' })
        .eq('id', updateTargetPostId)
        .select('title')
        .single()

      expect(error).toBeNull()
      expect(data?.title).toBe('更新後タイトル')
    })
  })

  describe('DELETE', () => {
    it('一般ユーザーは記事を削除できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('posts')
        .delete()
        .eq('id', deleteTargetPostId)
        .select('id')

      expect(error).toBeNull()
      expect(data).toHaveLength(0)

      const { data: current } = await adminClient
        .from('posts')
        .select('id')
        .eq('id', deleteTargetPostId)
        .maybeSingle()
      expect(current).not.toBeNull()
    })

    it('管理者ユーザーは記事を削除できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { error } = await client.from('posts').delete().eq('id', deleteTargetPostId)

      expect(error).toBeNull()

      const { data: current } = await adminClient
        .from('posts')
        .select('id')
        .eq('id', deleteTargetPostId)
        .maybeSingle()
      expect(current).toBeNull()
    })
  })
})

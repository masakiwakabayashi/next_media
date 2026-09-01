import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { randomUUID } from 'node:crypto'
import { adminClient, anonClient, createAuthedClient, TEST_USERS } from './helpers'

// supabase/migrations/003_add_rls_policies.sql の post_tags テーブルに対するポリシーを検証する
// - select: 全認証ユーザーが閲覧可能（未ログインユーザーは閲覧不可）
// - insert / update / delete: 管理者のみ

describe('post_tags RLS', () => {
  let postId: string
  const tagIds: string[] = []
  const createdPairs: Array<{ post_id: string; tag_id: string }> = []

  // 各テスト用の tag（post は 1 件で使い回す）
  let selectTagId: string
  let updateFromTagId: string
  let updateToTagId: string
  let deleteTagId: string
  let insertTagId: string

  async function createFixtureTag() {
    const { data, error } = await adminClient
      .from('tags')
      .insert({ name: `post_tags RLSテスト用タグ`, slug: `rls-test-${randomUUID()}` })
      .select('id')
      .single()
    if (error || !data) throw new Error(`fixture tag作成に失敗しました: ${error?.message}`)
    tagIds.push(data.id)
    return data.id
  }

  async function createFixturePair(tagId: string) {
    const { error } = await adminClient
      .from('post_tags')
      .insert({ post_id: postId, tag_id: tagId })
    if (error) throw new Error(`fixture post_tag作成に失敗しました: ${error.message}`)
    createdPairs.push({ post_id: postId, tag_id: tagId })
  }

  beforeAll(async () => {
    const { data: profile, error: profileError } = await adminClient
      .from('profiles')
      .select('id')
      .eq('user_id', TEST_USERS.admin.id)
      .single()
    if (profileError || !profile) {
      throw new Error(`管理者ユーザーのprofileが見つかりません: ${profileError?.message}`)
    }

    const { data: post, error: postError } = await adminClient
      .from('posts')
      .insert({
        author_id: profile.id,
        title: '記事(post_tags RLSテスト用)',
        slug: `rls-test-${randomUUID()}`,
        content: 'RLSテスト用のダミー本文',
        status: 'published',
      })
      .select('id')
      .single()
    if (postError || !post) {
      throw new Error(`fixture post作成に失敗しました: ${postError?.message}`)
    }
    postId = post.id

    selectTagId = await createFixtureTag()
    updateFromTagId = await createFixtureTag()
    updateToTagId = await createFixtureTag()
    deleteTagId = await createFixtureTag()
    insertTagId = await createFixtureTag()

    await createFixturePair(selectTagId)
    await createFixturePair(updateFromTagId)
    await createFixturePair(deleteTagId)
  })

  afterAll(async () => {
    if (postId) await adminClient.from('post_tags').delete().eq('post_id', postId)
    if (tagIds.length > 0) await adminClient.from('tags').delete().in('id', tagIds)
    if (postId) await adminClient.from('posts').delete().eq('id', postId)
  })

  describe('SELECT', () => {
    it('未ログインユーザーは記事タグの紐付けを閲覧できない', async () => {
      const { data, error } = await anonClient
        .from('post_tags')
        .select('post_id')
        .eq('post_id', postId)
        .eq('tag_id', selectTagId)

      expect(error).toBeNull()
      expect(data).toHaveLength(0)
    })

    it('一般ユーザーは記事タグの紐付けを閲覧できる', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('post_tags')
        .select('post_id')
        .eq('post_id', postId)
        .eq('tag_id', selectTagId)

      expect(error).toBeNull()
      expect(data).toHaveLength(1)
    })
  })

  describe('INSERT', () => {
    it('未ログインユーザーは記事タグを紐付けできない', async () => {
      const { error } = await anonClient
        .from('post_tags')
        .insert({ post_id: postId, tag_id: insertTagId })

      expect(error).not.toBeNull()
      expect(error?.code).toBe('42501')
    })

    it('一般ユーザーは記事タグを紐付けできない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { error } = await client
        .from('post_tags')
        .insert({ post_id: postId, tag_id: insertTagId })

      expect(error).not.toBeNull()
      expect(error?.code).toBe('42501')
    })

    it('管理者ユーザーは記事タグを紐付けできる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client
        .from('post_tags')
        .insert({ post_id: postId, tag_id: insertTagId })
        .select('post_id')
        .single()

      expect(error).toBeNull()
      expect(data).not.toBeNull()

      createdPairs.push({ post_id: postId, tag_id: insertTagId })
    })
  })

  describe('UPDATE', () => {
    it('一般ユーザーは記事タグの紐付けを更新できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('post_tags')
        .update({ tag_id: updateToTagId })
        .eq('post_id', postId)
        .eq('tag_id', updateFromTagId)
        .select('post_id')

      expect(error).toBeNull()
      expect(data).toHaveLength(0)

      const { data: current } = await adminClient
        .from('post_tags')
        .select('tag_id')
        .eq('post_id', postId)
        .eq('tag_id', updateFromTagId)
        .maybeSingle()
      expect(current).not.toBeNull()
    })

    it('管理者ユーザーは記事タグの紐付けを更新できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client
        .from('post_tags')
        .update({ tag_id: updateToTagId })
        .eq('post_id', postId)
        .eq('tag_id', updateFromTagId)
        .select('tag_id')
        .single()

      expect(error).toBeNull()
      expect(data?.tag_id).toBe(updateToTagId)
    })
  })

  describe('DELETE', () => {
    it('一般ユーザーは記事タグの紐付けを削除できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('post_tags')
        .delete()
        .eq('post_id', postId)
        .eq('tag_id', deleteTagId)
        .select('post_id')

      expect(error).toBeNull()
      expect(data).toHaveLength(0)

      const { data: current } = await adminClient
        .from('post_tags')
        .select('post_id')
        .eq('post_id', postId)
        .eq('tag_id', deleteTagId)
        .maybeSingle()
      expect(current).not.toBeNull()
    })

    it('管理者ユーザーは記事タグの紐付けを削除できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { error } = await client
        .from('post_tags')
        .delete()
        .eq('post_id', postId)
        .eq('tag_id', deleteTagId)

      expect(error).toBeNull()

      const { data: current } = await adminClient
        .from('post_tags')
        .select('post_id')
        .eq('post_id', postId)
        .eq('tag_id', deleteTagId)
        .maybeSingle()
      expect(current).toBeNull()
    })
  })
})

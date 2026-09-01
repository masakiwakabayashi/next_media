import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { randomUUID } from 'node:crypto'
import { adminClient, anonClient, createAuthedClient, TEST_USERS } from './helpers'

// supabase/migrations/006_create_collections.sql の collection_posts テーブルに対するポリシーを検証する
// - select: 全認証ユーザーが閲覧可能（未ログインユーザーは閲覧不可）
// - insert / update / delete: 管理者のみ

describe('collection_posts RLS', () => {
  let collectionId: string
  const postIds: string[] = []

  let selectPostId: string
  let updatePostId: string
  let deletePostId: string
  let insertPostId: string

  beforeAll(async () => {
    const { data: profile, error: profileError } = await adminClient
      .from('profiles')
      .select('id')
      .eq('user_id', TEST_USERS.admin.id)
      .single()
    if (profileError || !profile) {
      throw new Error(`管理者ユーザーのprofileが見つかりません: ${profileError?.message}`)
    }

    const { data: collection, error: collectionError } = await adminClient
      .from('collections')
      .insert({
        title: '特集(collection_posts RLSテスト用)',
        slug: `rls-test-${randomUUID()}`,
        status: 'published',
      })
      .select('id')
      .single()
    if (collectionError || !collection) {
      throw new Error(`fixture collection作成に失敗しました: ${collectionError?.message}`)
    }
    collectionId = collection.id

    for (let i = 0; i < 4; i++) {
      const { data: post, error: postError } = await adminClient
        .from('posts')
        .insert({
          author_id: profile.id,
          title: `記事(collection_posts RLSテスト用 ${i})`,
          slug: `rls-test-${randomUUID()}`,
          content: 'RLSテスト用のダミー本文',
          status: 'published',
        })
        .select('id')
        .single()
      if (postError || !post) {
        throw new Error(`fixture post作成に失敗しました: ${postError?.message}`)
      }
      postIds.push(post.id)
    }

    ;[selectPostId, updatePostId, deletePostId, insertPostId] = postIds

    const { error: linkError } = await adminClient.from('collection_posts').insert([
      { collection_id: collectionId, post_id: selectPostId, position: 0 },
      { collection_id: collectionId, post_id: updatePostId, position: 1 },
      { collection_id: collectionId, post_id: deletePostId, position: 2 },
    ])
    if (linkError) {
      throw new Error(`fixture collection_post作成に失敗しました: ${linkError.message}`)
    }
  })

  afterAll(async () => {
    if (collectionId) {
      await adminClient.from('collection_posts').delete().eq('collection_id', collectionId)
      await adminClient.from('collections').delete().eq('id', collectionId)
    }
    if (postIds.length > 0) {
      await adminClient.from('posts').delete().in('id', postIds)
    }
  })

  describe('SELECT', () => {
    it('未ログインユーザーは特集と記事の紐付けを閲覧できない', async () => {
      const { data, error } = await anonClient
        .from('collection_posts')
        .select('post_id')
        .eq('collection_id', collectionId)
        .eq('post_id', selectPostId)

      expect(error).toBeNull()
      expect(data).toHaveLength(0)
    })

    it('一般ユーザーは特集と記事の紐付けを閲覧できる', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('collection_posts')
        .select('post_id')
        .eq('collection_id', collectionId)
        .eq('post_id', selectPostId)

      expect(error).toBeNull()
      expect(data).toHaveLength(1)
    })
  })

  describe('INSERT', () => {
    it('未ログインユーザーは特集に記事を紐付けできない', async () => {
      const { error } = await anonClient
        .from('collection_posts')
        .insert({ collection_id: collectionId, post_id: insertPostId, position: 3 })

      expect(error).not.toBeNull()
      expect(error?.code).toBe('42501')
    })

    it('一般ユーザーは特集に記事を紐付けできない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { error } = await client
        .from('collection_posts')
        .insert({ collection_id: collectionId, post_id: insertPostId, position: 3 })

      expect(error).not.toBeNull()
      expect(error?.code).toBe('42501')
    })

    it('管理者ユーザーは特集に記事を紐付けできる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client
        .from('collection_posts')
        .insert({ collection_id: collectionId, post_id: insertPostId, position: 3 })
        .select('post_id')
        .single()

      expect(error).toBeNull()
      expect(data).not.toBeNull()
    })
  })

  describe('UPDATE', () => {
    it('一般ユーザーは紐付けの表示順を更新できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('collection_posts')
        .update({ position: 99 })
        .eq('collection_id', collectionId)
        .eq('post_id', updatePostId)
        .select('post_id')

      expect(error).toBeNull()
      expect(data).toHaveLength(0)

      const { data: current } = await adminClient
        .from('collection_posts')
        .select('position')
        .eq('collection_id', collectionId)
        .eq('post_id', updatePostId)
        .single()
      expect(current?.position).toBe(1)
    })

    it('管理者ユーザーは紐付けの表示順を更新できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client
        .from('collection_posts')
        .update({ position: 99 })
        .eq('collection_id', collectionId)
        .eq('post_id', updatePostId)
        .select('position')
        .single()

      expect(error).toBeNull()
      expect(data?.position).toBe(99)
    })
  })

  describe('DELETE', () => {
    it('一般ユーザーは紐付けを削除できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('collection_posts')
        .delete()
        .eq('collection_id', collectionId)
        .eq('post_id', deletePostId)
        .select('post_id')

      expect(error).toBeNull()
      expect(data).toHaveLength(0)

      const { data: current } = await adminClient
        .from('collection_posts')
        .select('post_id')
        .eq('collection_id', collectionId)
        .eq('post_id', deletePostId)
        .maybeSingle()
      expect(current).not.toBeNull()
    })

    it('管理者ユーザーは紐付けを削除できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { error } = await client
        .from('collection_posts')
        .delete()
        .eq('collection_id', collectionId)
        .eq('post_id', deletePostId)

      expect(error).toBeNull()

      const { data: current } = await adminClient
        .from('collection_posts')
        .select('post_id')
        .eq('collection_id', collectionId)
        .eq('post_id', deletePostId)
        .maybeSingle()
      expect(current).toBeNull()
    })
  })
})

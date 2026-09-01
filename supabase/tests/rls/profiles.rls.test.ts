import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { randomUUID } from 'node:crypto'
import { adminClient, anonClient, createAuthedClient, TEST_USERS } from './helpers'

// supabase/migrations/003_add_rls_policies.sql の profiles テーブルに対するポリシーを検証する
// - select: 全認証ユーザーが閲覧可能（未ログインユーザーは閲覧不可）
// - insert / delete: 管理者のみ
// - update: 管理者、または自分自身（user_id = auth.uid()）のみ

describe('profiles RLS', () => {
  const createdProfileIds: string[] = []

  let selectTargetProfileId: string
  let updateTargetProfileId: string
  let deleteTargetProfileId: string

  // 一般ユーザー自身のプロフィール（supabase/seeds/00_user_seed.sql で作成される）
  const memberProfileId = TEST_USERS.member.id
  let memberOriginalBio: string | null = null

  async function createFixtureProfile(displayName: string) {
    const { data, error } = await adminClient
      .from('profiles')
      .insert({ display_name: displayName, bio: 'RLSテスト用のダミー自己紹介' })
      .select('id')
      .single()

    if (error || !data) {
      throw new Error(`fixture profile作成に失敗しました: ${error?.message}`)
    }

    createdProfileIds.push(data.id)
    return data.id
  }

  beforeAll(async () => {
    selectTargetProfileId = await createFixtureProfile('プロフィール(RLSテスト・SELECT用)')
    updateTargetProfileId = await createFixtureProfile('プロフィール(RLSテスト・UPDATE用)')
    deleteTargetProfileId = await createFixtureProfile('プロフィール(RLSテスト・DELETE用)')

    const { data, error } = await adminClient
      .from('profiles')
      .select('bio')
      .eq('id', memberProfileId)
      .single()
    if (error || !data) {
      throw new Error(`一般ユーザーのprofileが見つかりません: ${error?.message}`)
    }
    memberOriginalBio = data.bio
  })

  afterAll(async () => {
    // 一般ユーザーのプロフィールを元に戻す
    await adminClient
      .from('profiles')
      .update({ bio: memberOriginalBio })
      .eq('id', memberProfileId)

    if (createdProfileIds.length === 0) return
    await adminClient.from('profiles').delete().in('id', createdProfileIds)
  })

  describe('SELECT', () => {
    it('未ログインユーザーはプロフィールを閲覧できない', async () => {
      const { data, error } = await anonClient
        .from('profiles')
        .select('id')
        .eq('id', selectTargetProfileId)

      expect(error).toBeNull()
      expect(data).toHaveLength(0)
    })

    it('一般ユーザーはプロフィールを閲覧できる', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('profiles')
        .select('id')
        .eq('id', selectTargetProfileId)

      expect(error).toBeNull()
      expect(data).toHaveLength(1)
    })
  })

  describe('INSERT', () => {
    it('未ログインユーザーはプロフィールを作成できない', async () => {
      const { error } = await anonClient
        .from('profiles')
        .insert({ display_name: `未ログイン作成テスト-${randomUUID()}` })

      expect(error).not.toBeNull()
      expect(error?.code).toBe('42501')
    })

    it('一般ユーザーはプロフィールを作成できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { error } = await client
        .from('profiles')
        .insert({ display_name: `一般ユーザー作成テスト-${randomUUID()}` })

      expect(error).not.toBeNull()
      expect(error?.code).toBe('42501')
    })

    it('管理者ユーザーはプロフィールを作成できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client
        .from('profiles')
        .insert({ display_name: `管理者作成テスト-${randomUUID()}` })
        .select('id')
        .single()

      expect(error).toBeNull()
      expect(data).not.toBeNull()

      if (data) createdProfileIds.push(data.id)
    })
  })

  describe('UPDATE', () => {
    it('一般ユーザーは他人のプロフィールを更新できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('profiles')
        .update({ display_name: '改ざんされた表示名' })
        .eq('id', updateTargetProfileId)
        .select('id')

      expect(error).toBeNull()
      expect(data).toHaveLength(0)

      const { data: current } = await adminClient
        .from('profiles')
        .select('display_name')
        .eq('id', updateTargetProfileId)
        .single()
      expect(current?.display_name).toBe('プロフィール(RLSテスト・UPDATE用)')
    })

    it('一般ユーザーは自分自身のプロフィールを更新できる', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const newBio = `自己紹介更新テスト-${randomUUID()}`
      const { data, error } = await client
        .from('profiles')
        .update({ bio: newBio })
        .eq('id', memberProfileId)
        .select('bio')
        .single()

      expect(error).toBeNull()
      expect(data?.bio).toBe(newBio)
    })

    it('管理者ユーザーは他人のプロフィールを更新できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { data, error } = await client
        .from('profiles')
        .update({ display_name: '更新後表示名' })
        .eq('id', updateTargetProfileId)
        .select('display_name')
        .single()

      expect(error).toBeNull()
      expect(data?.display_name).toBe('更新後表示名')
    })
  })

  describe('DELETE', () => {
    it('一般ユーザーは自分自身のプロフィールも削除できない', async () => {
      const client = await createAuthedClient(TEST_USERS.member)
      const { data, error } = await client
        .from('profiles')
        .delete()
        .eq('id', memberProfileId)
        .select('id')

      expect(error).toBeNull()
      expect(data).toHaveLength(0)

      const { data: current } = await adminClient
        .from('profiles')
        .select('id')
        .eq('id', memberProfileId)
        .maybeSingle()
      expect(current).not.toBeNull()
    })

    it('管理者ユーザーはプロフィールを削除できる', async () => {
      const client = await createAuthedClient(TEST_USERS.admin)
      const { error } = await client.from('profiles').delete().eq('id', deleteTargetProfileId)

      expect(error).toBeNull()

      const { data: current } = await adminClient
        .from('profiles')
        .select('id')
        .eq('id', deleteTargetProfileId)
        .maybeSingle()
      expect(current).toBeNull()
    })
  })
})

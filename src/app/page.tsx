"use client"
import { GreetingClient } from '@/components/greeting-client'
import { GreetingServer } from '@/components/greeting-server'
import { BasicButton } from '@/components/ui/Button'
import { BasicTextField } from '@/components/ui/TextField'
import { BlogPostCard } from '@/components/ui/Card'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Client Component からの tRPC 問い合わせ. */}
      <GreetingClient name="Client 1" />
      <GreetingClient name="Client 2" />

      {/* SSR Component からの tRPC 問い合わせ. */}
      {/* <GreetingServer name="Server 1"/> */}
      <BasicButton
        onClick={()=>{}}
      >
        ボタン
      </BasicButton>
      <BasicTextField
        label="名前"
      />
      <br />
      <BlogPostCard
        title="ここにタイトル"
        description="ここにディスクリプション"
        imagePath="image/path"
        url="/home"
      />




    </main>
  )
}

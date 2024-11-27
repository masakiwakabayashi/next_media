"use client"
import { GreetingClient } from '@/components/greeting-client'
import { GreetingServer } from '@/components/greeting-server'
import { BasicButton } from '@/components/ui/Button'
import { BasicTextField } from '@/components/ui/TextField'
import { BlogPostCard } from '@/components/ui/Card'
import Sidebar from '@/components/layout/Sidebar'
import HeaderNavigation from '@/components/layout/Header'
import { Tag } from '@/components/ui/Tag'
import { Box } from '@mui/system'

import { trpc } from '@/trpc/client'



export default function Home() {

  const tags = ['TypeScript', 'React', 'Next.js', 'Go', 'Google Cloud'];

  const posts = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


  const greeting = trpc.hello.useQuery({ text: "アレン" })
  // const posts = trpc.getPosts.useQuery()
  const test = trpc.test.useQuery()

  const posts2 = trpc.getPosts.useQuery().data

  console.log(test.data)

  console.log(posts2)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Client Component からの tRPC 問い合わせ. */}
      {/* <GreetingClient name="Client 1" />
      <GreetingClient name="Client 2" />
      <GreetingClient name="Client 33333" /> */}

      {/* SSR Component からの tRPC 問い合わせ. */}
      {/* <GreetingServer name="Server 1"/> */}
      <br />
      {posts.map((tag, index) => (
        <Box
          key={index}
          my={2}
        >
          <BlogPostCard
            title="ここにタイトル"
            description="ここにディスクリプション"
            imagePath="image/path"
            url="/home"
            tags={tags}
          />
        </Box>
      ))}
      <br />

      {
        posts2 ? (
          <>
            {posts2.map((post: any, index: any) => (
            <Box
              key={index}
              my={2}
            >
              <BlogPostCard
                title={post.title}
                description={post.content}
                imagePath="image/path"
                url="/home"
                tags={tags}
              />
            </Box>
          ))}
          </>
        ) : (
          <></>
        )
      }







    </main>
  )
}









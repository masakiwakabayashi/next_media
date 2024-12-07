'use client'

import { trpc } from '@/trpc/client'

export function GreetingClient({ name }: { name: string }) {
  // tRPC 問い合わせ. Client-Side から fetch を介して HTTP 送信される.
  const greeting = trpc.hello.useQuery({ text: name })
  // const posts = trpc.getPosts.useQuery()
  const test = trpc.test.useQuery()

  // console.log(test)

  // console.log(posts);

  return (
    <div className="bg-red-100 border-2 border-red-500 rounded-md m-2 p-5 space-y-2">
      <div className="text-red-500 font-bold">Client Component</div>
      <div>{JSON.stringify(greeting.data)}</div>
      <div>{JSON.stringify(test.data)}</div>
      {/* <div>
        <h1>投稿一覧</h1>
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              {post.title} - {post.content}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  )
}

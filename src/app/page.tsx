"use client"

import { BlogPostCard } from '@/components/ui/Card'

import { Tag } from '@/components/ui/Tag'
import { Box } from '@mui/system'

import { trpc } from '@/trpc/client'

interface Post {
  title: string;
  content: string;
  imagePath?: string;
  url?: string;
  tags?: string[];
}


export default function Home() {

  const tags = ['TypeScript', 'React', 'Next.js', 'Go', 'Google Cloud'];


  const posts = trpc.getPosts.useQuery().data

  console.log(posts);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">


      {
        posts ? (
          <>
            {posts.map((post: Post, index: number) => (
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

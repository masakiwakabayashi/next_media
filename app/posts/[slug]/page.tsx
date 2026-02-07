import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostDetail from '@/components/PostDetail'
import { supabase } from '@/lib/supabase/client'

type Props = {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('title, content, image_path')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    return null
  }

  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: '記事が見つかりません',
    }
  }

  return {
    title: post.title,
    description: post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 160),
      images: [post.image_path],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <PostDetail slug={slug} />
      </main>
    </div>
  )
}

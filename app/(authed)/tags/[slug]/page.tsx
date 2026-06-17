import TagPostList from '@/features/posts/components/TagPostList'

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className="min-h-screen font-sans">
      <TagPostList tagSlug={slug} />
    </div>
  )
}

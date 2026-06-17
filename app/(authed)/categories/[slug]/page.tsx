import CategoryPostList from '@/features/posts/components/CategoryPostList'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className="min-h-screen font-sans">
      <CategoryPostList categorySlug={slug} />
    </div>
  )
}

import PostList from "@/features/posts/components/PostList";
import SearchForm from "@/features/posts/components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;
  const pageNumber = Math.max(1, Number(page) || 1);

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 font-sans">
      <SearchForm defaultValue={q} />
      <PostList query={q} page={pageNumber} />
    </div>
  );
}

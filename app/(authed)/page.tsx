import PostList from "@/features/posts/components/PostList";
import SearchForm from "@/features/posts/components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 font-sans">
      <SearchForm defaultValue={q} />
      <PostList query={q} />
    </div>
  );
}

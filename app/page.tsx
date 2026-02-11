import Image from "next/image";
import PostList from "@/features/posts/components/PostList";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <PostList />


    </div>
  );
}

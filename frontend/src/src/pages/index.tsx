import Link from "next/link";
import Image from "next/image";

import BaseLayout from "@/components/layout/BaseLayout";

export default function Home() {
  return (
    <>
      <BaseLayout>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ArticleCard
            image=""
            title="Next.jsとTailwindで始めるブログ作成"
            category="プログラミング"
            author="山田 太郎"
            link="/articles/nextjs-tailwind-blog"
          />
          <ArticleCard
            image=""
            title="Tealを活用した美しいデザイン"
            category="デザイン"
            author="鈴木 花子"
            link="/articles/teal-design"
          />
          <ArticleCard
            image=""
            title="Reactで効率的にコンポーネントを作る方法"
            category="開発"
            author="佐藤 一郎"
            link="/articles/react-components"
          />
          <ArticleCard
            image=""
            title="Next.jsとTailwindで始めるブログ作成"
            category="プログラミング"
            author="山田 太郎"
            link="/articles/nextjs-tailwind-blog"
          />
          <ArticleCard
            image=""
            title="Tealを活用した美しいデザイン"
            category="デザイン"
            author="鈴木 花子"
            link="/articles/teal-design"
          />
          <ArticleCard
            image=""
            title="Reactで効率的にコンポーネントを作る方法"
            category="開発"
            author="佐藤 一郎"
            link="/articles/react-components"
          />
        </div>
      </BaseLayout>
    </>
  );
}


const ArticleCard = ({ image, title, category, author, link }) => {
  return (
    <Link href={link} className="block rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <Image
            width={400}
            height={300}
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2 bg-teal-400 text-white text-xs font-bold px-3 py-1 rounded">
            {category}
          </div>
        </div>
        <div className="p-4 bg-white">
          <h2 className="text-lg font-bold text-teal-400">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">執筆者: {author}</p>
        </div>
    </Link>
  );
};

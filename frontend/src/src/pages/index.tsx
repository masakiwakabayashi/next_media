

import BaseLayout from "@/components/layout/BaseLayout";
import ArticleCard from "@/components/template/TopPageTemplate/organisms/ArticleCard";

export default function Home() {
  return (
    <>
      <BaseLayout>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <ArticleCard
            imagePath=""
            title="Next.jsとTailwindで始めるブログ作成"
            category="プログラミング"
            authorName="山田 太郎"
            link="/post/1"
          />
          <ArticleCard
            imagePath=""
            title="Tealを活用した美しいデザイン"
            category="デザイン"
            authorName="鈴木 花子"
            link="/post/1"
          />
          <ArticleCard
            imagePath=""
            title="Reactで効率的にコンポーネントを作る方法"
            category="開発"
            authorName="佐藤 一郎"
            link="/post/1"
          />
          <ArticleCard
            imagePath=""
            title="Next.jsとTailwindで始めるブログ作成"
            category="プログラミング"
            authorName="山田 太郎"
            link="/post/1"
          />
          <ArticleCard
            imagePath=""
            title="Tealを活用した美しいデザイン"
            category="デザイン"
            authorName="鈴木 花子"
            link="/post/1"
          />
          <ArticleCard
            imagePath=""
            title="Reactで効率的にコンポーネントを作る方法"
            category="開発"
            authorName="佐藤 一郎"
            link="/post/1"
          />
          <ArticleCard
            imagePath=""
            title="Next.jsとTailwindで始めるブログ作成"
            category="プログラミング"
            authorName="山田 太郎"
            link="/post/1"
          />
          <ArticleCard
            imagePath=""
            title="Tealを活用した美しいデザイン"
            category="デザイン"
            authorName="鈴木 花子"
            link="/post/1"
          />
        </div>
      </BaseLayout>
    </>
  );
}


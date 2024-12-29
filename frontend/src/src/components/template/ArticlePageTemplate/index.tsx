import BaseLayout from "@/components/layout/BaseLayout";
import { CtaButton } from "@/components/common/atoms/Button";

import Link from "next/link";
import Image from "next/image";

type Article = {
  title: string;
  authorName: string;
  publishedDate: string;
  category: string;
  content: string;
  imagePath: string;
}

type ArticlePageProps = {
  ArticleData: Article;
}

const ArticlePageTemplate = (props: ArticlePageProps) => {
  const { ArticleData } = props;

  return (
    <BaseLayout>
      <div className="container mx-auto p-6">
        {/* 記事のヘッダー */}
        <div className="mb-6">
          <div className="relative w-full h-64">
            <Image
              src={ArticleData.imagePath}
              alt={ArticleData.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-teal-400 mt-6">{ArticleData.title}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <p className="text-sm text-gray-600">著者: {ArticleData.authorName}</p>
            <p className="text-sm text-gray-600">公開日: {ArticleData.publishedDate}</p>
            <Link href={`/categories/${ArticleData.category}`}>
              <span className="text-sm text-teal-500 hover:underline cursor-pointer">
                {ArticleData.category}
              </span>
            </Link>
          </div>
        </div>

        {/* 記事の本文 */}
        <div className="prose prose-teal max-w-none">
          <article>{ArticleData.content}</article>
        </div>

        {/* CTAボタン */}
        <div className="py-5">
          <CtaButton
            onClick={()=>{}}
          >
            ボタン
          </CtaButton>
        </div>
      </div>
    </BaseLayout>
  );
}

export default ArticlePageTemplate;

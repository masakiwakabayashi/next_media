import React from "react";

import { CtaButton } from "@/components/common/atoms/Button";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  // 仮のデータ
  const article = {
    title: "Next.jsとTailwind CSSでブログを作る",
    authorName: "山田 太郎",
    publishedDate: "2024年12月29日",
    category: "プログラミング",
    content: `
      Next.jsとTailwind CSSを使ったブログ構築方法を解説します。
      初心者でも簡単に始められるフレームワークで、効率的に美しいデザインが作れます。
    `,
    imagePath: "/images/article-cover.jpg",
  };

  return (
    <div className="container mx-auto p-6">
      {/* 記事のヘッダー */}
      <div className="mb-6">
        <div className="relative w-full h-64">
          <Image
            src={article.imagePath}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h1 className="text-4xl font-bold text-teal-400 mt-6">{article.title}</h1>
        <div className="flex items-center space-x-4 mt-2">
          <p className="text-sm text-gray-600">著者: {article.authorName}</p>
          <p className="text-sm text-gray-600">公開日: {article.publishedDate}</p>
          <Link href={`/categories/${article.category}`}>
            <span className="text-sm text-teal-500 hover:underline cursor-pointer">
              {article.category}
            </span>
          </Link>
        </div>
      </div>

      {/* 記事の本文 */}
      <div className="prose prose-teal max-w-none">
        <p>{article.content}</p>
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
  );
};

export default ArticlePage;



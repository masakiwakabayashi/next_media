
import { useRouter } from "next/router";

import ArticlePageTemplate from "@/components/template/ArticlePageTemplate";

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  // 仮のデータ
  const ArticleData = {
    title: "Next.jsとTailwind CSSでブログを作る",
    authorName: "山田 太郎",
    publishedDate: "2024年12月29日",
    category: "プログラミング",
    content: `
      Next.jsとTailwind CSSを使ったブログ構築方法を解説します。

      初心者でも簡単に始められるフレームワークで、効率的に美しいデザインが作れます。
      Next.jsはReactをベースにしたフレームワークで、サーバーサイドレンダリング（SSR）や静的サイト生成（SSG）など、
      モダンなウェブ開発に必要な機能を簡単に実現できます。

      Tailwind CSSは、ユーティリティファーストなCSSフレームワークです。
      デザインをゼロから考える必要がなく、既存のクラスを組み合わせるだけで洗練されたUIを作ることが可能です。

      ### 次に進むステップ
      1. Next.jsのプロジェクトを作成する。
      2. Tailwind CSSをインストールして設定する。
      3. カスタムコンポーネントを作成し、ブログのデザインを構築する。

      実際に手を動かしながら進めることで、両フレームワークの強みを最大限に活用できます。

      このブログ記事では、コード例や具体的な設定方法を紹介しながら、
      Next.jsとTailwind CSSの基本的な使い方を学んでいきましょう。
      `,
    imagePath: "",
  };

  const CommentData = [
    {
      text: "とても参考になりました！",
      date: "2024-12-20T10:00:00",
    },
    {
      text: "次回の記事も楽しみにしています。",
      date: "2024-12-21T15:30:00",
    },
  ];

  return (
    <ArticlePageTemplate
      ArticleData={ArticleData}
      CommentData={CommentData}
    />
  );
};

export default ArticlePage;

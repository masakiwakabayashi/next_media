
import { useRouter } from "next/router";

import ArticlePageTemplate from "@/components/template/ArticlePageTemplate";

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  // 仮のデータ
  const ArticleData = {
    title: "肉源 六本木店",
    authorName: "若林 将輝",
    publishedDate: "2025年01月06日",
    category: "焼肉",
    content: `
      ランチで食べられる焼肉と冷麺のセットがおすすめです。日比谷線の六本木駅の出口の近くにあります。
      `,
    imagePath: "/no_image.webp",
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

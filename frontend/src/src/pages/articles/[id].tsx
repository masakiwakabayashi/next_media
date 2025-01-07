
import { useRouter } from "next/router";

import ArticlePageTemplate from "@/components/template/ArticlePageTemplate";

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  const ArticleData = [
    {
      title: "肉源 六本木店",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      category: "焼肉",
      content: `
        ランチで食べられる焼肉と冷麺のセットがおすすめ。
        `,
      imagePath: "/no_image.webp",
    },
    {
      title: "四川食堂KARyu 浅草橋店",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      category: "中華",
      content: `
        辛くない料理もある。美味しい。
        `,
      imagePath: "/no_image.webp",
    },
    {
      title: "ツイテル(Tsui-teru!) 中野",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      category: "熟成肉",
      content: `
        熟成肉のお店。
        `,
      imagePath: "/no_image.webp",
    },
    {
      title: "浅草おにぎり はるちゃん",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      category: "おにぎり",
      content: `
        ツナマヨと鶏そぼろのおにぎりを注文。どちらも美味しかった。
        `,
      imagePath: "/no_image.webp",
    },
    {
      title: "なぜ蕎麦にラー油を入れるのか。 秋葉原店",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      category: "蕎麦",
      content: `
        肉蕎麦が美味しい。
        `,
      imagePath: "/no_image.webp",
    },
    {
      title: "まぜはる 浅草橋",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      category: "まぜそば",
      content: `
        ちょっと辛めだけど美味しい。
        `,
      imagePath: "/no_image.webp",
    },
    {
      title: "カレーは飲み物。 秋葉原店",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      category: "カレー",
      content: `
        カツカレーは結構油っこい感じだけど美味しい。
        `,
      imagePath: "/no_image.webp",
    },
    {
      title: "エスニック料理ギータ-GITA- 入谷",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      category: "カレー",
      content: `
          チーズナンがめちゃくちゃ美味しい。
        `,
      imagePath: "/no_image.webp",
    },
  ];

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
      ArticleData={ArticleData[Number(id) - 1]}
      CommentData={CommentData}
    />
  );
};

export default ArticlePage;

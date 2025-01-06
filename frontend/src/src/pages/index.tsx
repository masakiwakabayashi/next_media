
import TopPageTemplate from "@/components/template/TopPageTemplate";

// サンプルデータ
const ArticleListData = [
  {
    imagePath: "",
    title: "肉源 六本木店",
    category: "焼肉",
    authorName: "若林 将輝",
    publishedDate: "2025年01月06日",
    link: "/articles/1",
  },
  {
    imagePath: "",
    title: "四川食堂KARyu 浅草橋店",
    category: "中華",
    authorName: "若林 将輝",
    publishedDate: "2025年01月06日",
    link: "/articles/2",
  },
  {
    imagePath: "",
    title: "ツイテル(Tsui-teru!) 中野",
    category: "熟成肉",
    authorName: "若林 将輝",
    publishedDate: "2025年01月06日",
    link: "/articles/3",
  },
  {
    imagePath: "",
    title: "浅草おにぎり はるちゃん",
    category: "おにぎり",
    authorName: "若林 将輝",
    publishedDate: "2025年01月06日",
    link: "/articles/4",
  },
  {
    imagePath: "",
    title: "なぜ蕎麦にラー油を入れるのか。 秋葉原店",
    category: "蕎麦",
    authorName: "若林 将輝",
    publishedDate: "2025年01月06日",
    link: "/articles/5",
  },
  {
    imagePath: "",
    title: "まぜはる 浅草橋",
    category: "まぜそば",
    authorName: "若林 将輝",
    publishedDate: "2025年01月06日",
    link: "/articles/6",
  },
  {
    imagePath: "",
    title: "カレーは飲み物。 秋葉原店",
    category: "カレー",
    authorName: "若林 将輝",
    publishedDate: "2025年01月06日",
    link: "/articles/7",
  },
  {
    imagePath: "",
    title: "エスニック料理ギータ-GITA- 入谷",
    category: "カレー",
    authorName: "若林 将輝",
    publishedDate: "2025年01月06日",
    link: "/articles/8",
  },
];

export default function Home() {
  return (
    <TopPageTemplate ArticleListData={ArticleListData}/>
  );
}


import TopPageTemplate from "@/components/template/TopPageTemplate";

// サンプルデータ
const ArticleListData = [
  {
    imagePath: "",
    title: "Next.jsとTailwindで始めるブログ作成",
    category: "プログラミング",
    authorName: "山田 太郎",
    publishedDate: "2024年12月29日",
    link: "/articles/1",
  },
  {
    imagePath: "",
    title: "Tealを活用した美しいデザイン",
    category: "デザイン",
    authorName: "鈴木 花子",
    publishedDate: "2024年12月29日",
    link: "/articles/2",
  },
  {
    imagePath: "",
    title: "Reactで効率的にコンポーネントを作る方法",
    category: "開発",
    authorName: "佐藤 一郎",
    publishedDate: "2024年12月29日",
    link: "/articles/3",
  },
  {
    imagePath: "",
    title: "JavaScriptの最新機能を活用しよう",
    category: "プログラミング",
    authorName: "高橋 健",
    publishedDate: "2024年12月29日",
    link: "/articles/4",
  },
  {
    imagePath: "",
    title: "Figmaを使ったプロトタイプ設計のコツ",
    category: "デザイン",
    authorName: "山本 美咲",
    publishedDate: "2024年12月29日",
    link: "/articles/5",
  },
  {
    imagePath: "",
    title: "AWSを活用したインフラ構築入門",
    category: "クラウド",
    authorName: "木村 大輔",
    publishedDate: "2024年12月29日",
    link: "/articles/6",
  },
  {
    imagePath: "",
    title: "TypeScriptで安全なコードを書く",
    category: "プログラミング",
    authorName: "井上 桃子",
    publishedDate: "2024年12月29日",
    link: "/articles/7",
  },
  {
    imagePath: "",
    title: "Webパフォーマンス向上のためのベストプラクティス",
    category: "開発",
    authorName: "中村 翔",
    publishedDate: "2024年12月29日",
    link: "/articles/8",
  },
];

export default function Home() {
  return (
    <TopPageTemplate ArticleListData={ArticleListData}/>
  );
}

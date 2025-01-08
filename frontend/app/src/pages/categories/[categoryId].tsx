
import { useRouter } from "next/router";
import CategoryPageTemplate from "@/components/template/CategoryPageTemplate";

const ArticleListData = [
  [
    {
      imagePath: "/no_image.webp",
      title: "肉源 六本木店",
      category: "焼肉",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      link: "/articles/1",
    },
  ],
  [
    {
      imagePath: "/no_image.webp",
      title: "四川食堂KARyu 浅草橋店",
      category: "中華",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      link: "/articles/2",
    },
  ],
  [
    {
      imagePath: "/no_image.webp",
      title: "ツイテル(Tsui-teru!) 中野",
      category: "熟成肉",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      link: "/articles/3",
    },
  ],
  [
    {
      imagePath: "/no_image.webp",
      title: "浅草おにぎり はるちゃん",
      category: "おにぎり",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      link: "/articles/4",
    },
  ],
  [
    {
      imagePath: "/no_image.webp",
      title: "まぜはる 浅草橋",
      category: "まぜそば",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      link: "/articles/6",
    },
  ],
  [
    {
      imagePath: "/no_image.webp",
      title: "なぜ蕎麦にラー油を入れるのか。 秋葉原店",
      category: "蕎麦",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      link: "/articles/5",
    },
  ],
  [
    {
      imagePath: "/no_image.webp",
      title: "カレーは飲み物。 秋葉原店",
      category: "カレー",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      link: "/articles/7",
    },
    {
      imagePath: "/no_image.webp",
      title: "エスニック料理ギータ-GITA- 入谷",
      category: "カレー",
      authorName: "若林 将輝",
      publishedDate: "2025年01月06日",
      link: "/articles/8",
    },
  ],
];

const CategoryNames = ["焼肉", "中華", "熟成肉", "おにぎり", "まぜそば", "蕎麦", "カレー"];



const CategoryPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  console.log(categoryId);

  return (
    <CategoryPageTemplate
      ArticleListData={ArticleListData[Number(categoryId) - 1]}
      CategoryName={CategoryNames[Number(categoryId) - 1]}
    />
  );
}

export default CategoryPage;

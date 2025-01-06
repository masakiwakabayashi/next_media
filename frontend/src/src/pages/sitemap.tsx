
import SitemapTemplate from "@/components/template/SitemapTemplate";

const sitemapData = [
  {
    category: "焼肉",
    links: [
      { title: "肉源 六本木店", href: "/articles/1" },
    ],
  },
  {
    category: "中華",
    links: [
      { title: "四川食堂KARyu 浅草橋店", href: "/articles/2" },
    ],
  },
  {
    category: "熟成肉",
    links: [
      { title: "ツイテル(Tsui-teru!) 中野", href: "/articles/3" },
    ],
  },
  {
    category: "おにぎり",
    links: [
      { title: "浅草おにぎり はるちゃん", href: "/articles/4" },
    ],
  },
  {
    category: "蕎麦",
    links: [
      { title: "なぜ蕎麦にラー油を入れるのか。 秋葉原店", href: "/articles/5" },
    ],
  },
  {
    category: "まぜそば",
    links: [
      { title: "まぜはる 浅草橋", href: "/articles/6" },
    ],
  },
  {
    category: "カレー",
    links: [
      { title: "カレーは飲み物。 秋葉原店", href: "/articles/7" },
      { title: "エスニック料理ギータ-GITA- 入谷", href: "/articles/8" },
    ],
  },
];


const SitemapPage = () => {
  return (
    <SitemapTemplate sitemapData={sitemapData} />
  );
};

export default SitemapPage;

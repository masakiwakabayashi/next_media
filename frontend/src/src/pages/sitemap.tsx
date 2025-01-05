
import SitemapTemplate from "@/components/template/SitemapTemplate";

const sitemapData = [
  {
    category: "ホーム",
    links: [{ title: "トップページ", href: "/" }],
  },
  {
    category: "記事",
    links: [
      { title: "記事一覧", href: "/articles" },
      { title: "Next.js入門", href: "/articles/nextjs" },
      { title: "Tailwind CSSの基本", href: "/articles/tailwindcss" },
    ],
  },
  {
    category: "カテゴリー",
    links: [
      { title: "プログラミング", href: "/categories/programming" },
      { title: "デザイン", href: "/categories/design" },
      { title: "マーケティング", href: "/categories/marketing" },
    ],
  },
  {
    category: "その他",
    links: [
      { title: "運営者について", href: "/about" },
      { title: "お問い合わせ", href: "/contact" },
    ],
  },
];


const SitemapPage = () => {
  return (
    <SitemapTemplate sitemapData={sitemapData} />
  );
};

export default SitemapPage;

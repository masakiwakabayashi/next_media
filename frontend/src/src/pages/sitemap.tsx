
import Link from "next/link";

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
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-teal-400 mb-6">サイトマップ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sitemapData.map((section, index) => (
          <div key={index} className="bg-white rounded shadow-md p-4">
            <h2 className="text-lg font-bold text-teal-500 mb-4">
              {section.category}
            </h2>
            <ul className="space-y-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link href={link.href}>
                    <span className="text-teal-400 hover:underline cursor-pointer">
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SitemapPage;


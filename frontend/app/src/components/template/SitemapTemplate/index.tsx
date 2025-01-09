import BaseLayout from "@/components/layout/BaseLayout";

import Link from "next/link";

type Link = {
  title: string;
  href: string;
};

type sitemapData = {
  category: string;
  links: Link[];
}

type SitemapProps = {
  sitemapData: sitemapData[];
}


const SitemapTemplate = (props: SitemapProps) => {
  const { sitemapData } = props;

  return (
    <BaseLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-teal-400 mb-6">サイトマップ</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {
            sitemapData ? (
              sitemapData.map((section, index) => (
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
              ))
            ) : (
              <div>まだ記事がありません</div>
            )
          }
        </div>
      </div>
    </BaseLayout>
  );
}

export default SitemapTemplate;

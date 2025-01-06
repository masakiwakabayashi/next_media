
import React from "react";
import Link from "next/link";
import Image from "next/image";

import ProfileCard from "./ProfileCard";

const articles = [
  "肉源 六本木店",
  "四川食堂KARyu 浅草橋店",
  "ツイテル(Tsui-teru!) 中野",
  "浅草おにぎり はるちゃん",
  "なぜ蕎麦にラー油を入れるのか。 秋葉原店"
];

const categories = ["焼肉", "中華", "熟成肉", "おにぎり", "まぜそば", "蕎麦", "カレー"];


const Sidebar = () => {
  return (
    <aside className="bg-teal-400 text-white w-80 shadow-lg">
      {/* 運営者プロフィール */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">運営者プロフィール</h2>
        <ProfileCard
          image=""
          name="若林 将輝"
          bio="東京の美味しい食べ物を紹介するブログを書いています。"
        />
      </div>

      {/* 人気記事Top5 */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">人気記事Top5</h2>
        <ul className="space-y-2">
          {articles.map((article, index) => (
            <li key={index}>
              <Link href={`/articles/${index + 1}`}>
                <span className="block px-2 py-1 rounded hover:bg-teal-500 cursor-pointer">
                  {index + 1}. {article}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* カテゴリー一覧 */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">カテゴリー一覧</h2>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <Link href={`/categories/${category}`}>
                <span className="block px-2 py-1 rounded hover:bg-teal-500 cursor-pointer">
                  {category}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 正方形のバナー */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">おすすめリンク</h2>
        <div className="relative w-full h-48 bg-white rounded shadow-md overflow-hidden">
          <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/banner.jpg"
              alt="おすすめリンク"
              layout="fill"
              objectFit="cover"
              className="cursor-pointer hover:opacity-80"
            />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

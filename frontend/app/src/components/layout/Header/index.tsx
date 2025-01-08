import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-teal-400 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-3">
        {/* ロゴとタイトル */}
        <Link href="/" className="flex items-center space-x-2">
          {/* <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-teal-400 font-bold">
            B
          </div> */}
          <span className="text-4xl font-bold">Next Media</span>
        </Link>

        {/* ナビゲーションメニュー */}
        <nav className="space-x-4">
          {/* <Link href="/" className="hover:underline">
            ホーム
          </Link> */}
          <Link href="/about" className="hover:underline">
            運営者について
          </Link>
          <Link href="/sitemap" className="hover:underline">
            サイトマップ
          </Link>
          <Link href="/contact" className="hover:underline">
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
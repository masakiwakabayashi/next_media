import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-teal-400 text-white py-6">
      <div className="container mx-auto text-center">
        {/* 著作権表記 */}
        <p className="text-sm mb-4">© 2024 Masaki Wakabayashi All rights reserved.</p>

        {/* ナビゲーションリンク */}
        <nav className="flex justify-center space-x-6 mb-4">
          <Link href="/privacy" className="hover:underline text-sm">
            プライバシーポリシー
          </Link>
          <Link href="/contact" className="hover:underline text-sm">
            お問い合わせ
          </Link>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;
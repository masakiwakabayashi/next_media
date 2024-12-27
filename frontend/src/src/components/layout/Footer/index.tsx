import Link from "next/link";
import Image from "next/image";

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
          <Link href="/terms" className="hover:underline text-sm">
            利用規約
          </Link>
          <Link href="/contact" className="hover:underline text-sm">
            お問い合わせ
          </Link>
        </nav>

        {/* SNSリンク */}
        <div className="flex justify-center space-x-4">
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/twitter.svg"
              alt="Twitter"
              width={24}
              height={24}
              className="hover:opacity-80"
            />
          </Link>
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/facebook.svg"
              alt="Facebook"
              width={24}
              height={24}
              className="hover:opacity-80"
            />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/instagram.svg"
              alt="Instagram"
              width={24}
              height={24}
              className="hover:opacity-80"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
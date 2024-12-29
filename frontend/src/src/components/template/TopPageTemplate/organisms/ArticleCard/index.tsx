import Link from "next/link";
import Image from "next/image";

type ArticleCardProps = {
  imagePath: string;
  title: string;
  category: string;
  authorName: string;
  publishedDate: string;
  link: string;
}

const ArticleCard = ({ imagePath, title, category, authorName, publishedDate, link } : ArticleCardProps) => {
  return (
    <Link href={link} className="block rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <Image
            width={400}
            height={300}
            src={imagePath}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2 bg-teal-400 text-white text-xs font-bold px-3 py-1 rounded">
            {category}
          </div>
        </div>
        <div className="p-4 bg-white">
          <h2 className="text-lg font-bold text-teal-400">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">公開日: {publishedDate} 執筆者: {authorName}</p>
        </div>
    </Link>
  );
};

export default ArticleCard;

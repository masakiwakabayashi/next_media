
import Link from "next/link";
import Image from "next/image";

type Article = {
  title: string;
  authorName: string;
  publishedDate: string;
  category: string;
  content: string;
  imagePath: string;
}

type ArticleAreaProps = {
  ArticleData: Article;
}


const ArticleArea = (props: ArticleAreaProps) => {
  const { ArticleData } = props;

  return (
    <div>
      <div className="mb-6">
        <div className="relative w-full h-64">
          <Image
            src={ArticleData.imagePath}
            alt={ArticleData.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h1 className="text-4xl font-bold text-teal-400 mt-6">{ArticleData.title}</h1>
        <div className="flex items-center space-x-4 mt-2">
          <p className="text-sm text-gray-600">著者: {ArticleData.authorName}</p>
          <p className="text-sm text-gray-600">公開日: {ArticleData.publishedDate}</p>
          <Link href={`/categories/${ArticleData.category}`}>
            <span className="text-sm text-teal-500 hover:underline cursor-pointer">
              {ArticleData.category}
            </span>
          </Link>
        </div>
      </div>
      <div className="prose prose-teal max-w-none">
        <article>{ArticleData.content}</article>
      </div>
    </div>
  );
}

export default ArticleArea;

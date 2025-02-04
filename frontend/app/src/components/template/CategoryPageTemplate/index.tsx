import BaseLayout from "@/components/layout/BaseLayout";
import { ArticleCard } from "@/components/common/molecules/ArticleCard"

type Article = {
  imagePath: string;
  title: string;
  category: string;
  authorName: string;
  publishedDate: string;
  link: string;
};

type CategoryPageProps = {
  ArticleListData: Article[];
  CategoryName: string;
}


const CategoryPageTemplate = (props: CategoryPageProps) => {
  const { ArticleListData, CategoryName } = props;

  return (
    <BaseLayout>
      <h1 className="text-4xl font-bold text-teal-400 mb-6">{CategoryName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {ArticleListData?.length > 0 ? (
          ArticleListData.map((article: Article, index: number) => (
            <ArticleCard
              key={index}
              imagePath={article.imagePath}
              title={article.title}
              category={article.category}
              authorName={article.authorName}
              publishedDate={article.publishedDate}
              link={article.link}
            />
          ))
        ) : (
          <p className="text-gray-500">まだ記事はありません。</p>
        )}
      </div>
    </BaseLayout>
  );
}

export default CategoryPageTemplate;

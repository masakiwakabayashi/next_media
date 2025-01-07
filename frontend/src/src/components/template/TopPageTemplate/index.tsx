
import BaseLayout from "@/components/layout/BaseLayout";
import ArticleCard from "@/components/common/molecules/ArticleCard"

type Article = {
  imagePath: string;
  title: string;
  category: string;
  authorName: string;
  publishedDate: string;
  link: string;
};

type TopPageProps = {
  ArticleListData: Article[];
}


const TopPageTemplate = (props: TopPageProps) => {
  const { ArticleListData } = props;

  return (
    <BaseLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {ArticleListData.map((article: Article, index: number) => (
          <ArticleCard
            key={index}
            imagePath={article.imagePath}
            title={article.title}
            category={article.category}
            authorName={article.authorName}
            publishedDate={article.publishedDate}
            link={article.link}
          />
        ))}
      </div>
    </BaseLayout>
  );
}

export default TopPageTemplate;

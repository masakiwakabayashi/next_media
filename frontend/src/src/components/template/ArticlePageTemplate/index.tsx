import BaseLayout from "@/components/layout/BaseLayout";
import ArticleArea from "./organisms/ArticleArea";
import CommentArea from "./organisms/CommentArea";
import CtaArea from "./organisms/CtaArea";

type BreadcrumbItem = {
  label: string;
  href: string;
}

type Article = {
  title: string;
  authorName: string;
  publishedDate: string;
  category: string;
  content: string;
  imagePath: string;
}

type CommentData = {
  text: string;
  date: string;
}

type ArticlePageProps = {
  ArticleData: Article;
  CommentData: CommentData[];
  BreadcrumbItems: BreadcrumbItem[];
}

const ArticlePageTemplate = (props: ArticlePageProps) => {
  const { ArticleData, CommentData, BreadcrumbItems } = props;

  return (
    <BaseLayout>
      <div className="container mx-auto p-6">
        {/* 記事本体 */}
        <ArticleArea
          ArticleData={ArticleData}
          BreadcrumbItems={BreadcrumbItems}
        />
        {/* コメントエリア */}
        <CommentArea CommentData={CommentData} />
        {/* CTAエリア */}
        <CtaArea />
      </div>
    </BaseLayout>
  );
}

export default ArticlePageTemplate;

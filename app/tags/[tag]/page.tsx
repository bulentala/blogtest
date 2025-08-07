import { getArticlesByTag } from "../../lib/articles";
import ArticleList from "../../components/ArticleList";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function TagPage(props: TagPageProps) {
  const params = await props.params;
  const { tag } = params;
  const articles = await getArticlesByTag(tag);

  return (
    <div className="test">
      <h1 className="mb-4 text-2xl font-bold">
        Articles tagged with &quot;{tag}&quot;
      </h1>
      <ArticleList articles={articles} />
    </div>
  );
}

import ArticleList from "./components/ArticleList";
import TagList from "./components/TagList";
import { getAllTags } from "./lib/tags";
import { getAllArticles } from "./lib/articles";

export default function Page() {
  const tags = getAllTags();
  const articles = getAllArticles();

  return (
    <>
      <ArticleList articles={articles} />
      <TagList tags={tags} />
    </>
  );
}

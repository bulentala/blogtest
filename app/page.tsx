import ArticleList from "./components/ArticleList";
import Logo from "./components/Logo";
import TagList from "./components/TagList";
import { getAllTags } from "./lib/tags";
import { getAllArticles } from "./lib/articles";

export default function Page() {
  const tags = getAllTags();
  const articles = getAllArticles();

  return (
    <div className="test mx-auto grid min-h-screen max-w-2xl grid-rows-[auto_1fr_auto]">
      <div className="test grid grid-cols-[auto_1fr_auto]">
        <Logo />
        <div className="test col-start-3"></div>
      </div>
      <div className="test">
        <ArticleList articles={articles} />
        <TagList tags={tags} />
      </div>
      <div className="test"></div>
    </div>
  );
}

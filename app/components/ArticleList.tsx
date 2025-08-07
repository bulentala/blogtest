import Link from "next/link";
import { Article } from "../lib/articles";

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="test">
      <h1>Blog Posts</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/blog/${article.id}`}>{article.title}</Link>
            <p>Created at: {article.createdAt}</p>
            <p>
              Tags:{" "}
              {article.tags.map((t: string) => (
                <Link key={t} href={`/tags/${t}`}>
                  {t}
                </Link>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

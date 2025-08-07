import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { z } from "zod";
import Link from "next/link";

const FrontmatterSchema = z.object({
  id: z.string(),
  title: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

async function getPostsByTag(tag: string) {
  const contentDirectory = path.join(process.cwd(), "content");
  const filenames = await fs.readdir(contentDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(contentDirectory, filename);
      const fileContents = await fs.readFile(filePath, "utf8");
      const { frontmatter } = await compileMDX({
        source: fileContents,
        options: { parseFrontmatter: true },
      });

      const parsedFrontmatter = FrontmatterSchema.parse(frontmatter);

      if (parsedFrontmatter.tags.includes(tag)) {
        return {
          slug: filename.replace(".mdx", ""),
          ...parsedFrontmatter,
        };
      }

      return null;
    }),
  );

  return posts.filter(Boolean);
}

import { getArticlesByTag } from "../../lib/articles";
import ArticleList from "../../components/ArticleList";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export default async function TagPage(props: TagPageProps) {
  const params = await props.params;
  const { tag } = params;
  const articles = await getArticlesByTag(tag);

  return (
    <div className="test">
      <h1 className="mb-4 text-2xl font-bold">Articles tagged with "{tag}"</h1>
      <ArticleList articles={articles} />
    </div>
  );
}

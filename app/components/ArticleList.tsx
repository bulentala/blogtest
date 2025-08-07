import { promises as fs } from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { z } from 'zod';
import Link from 'next/link';

const FrontmatterSchema = z.object({
  id: z.string(),
  title: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

async function getPosts() {
  const contentDirectory = path.join(process.cwd(), 'content');
  const filenames = await fs.readdir(contentDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(contentDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { frontmatter } = await compileMDX({
        source: fileContents,
        options: { parseFrontmatter: true },
      });

      const parsedFrontmatter = FrontmatterSchema.parse(frontmatter);

      return {
        slug: filename.replace('.mdx', ''),
        ...parsedFrontmatter,
      };
    })
  );

  return posts;
}

export default async function ArticleList() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            <p>Created at: {post.createdAt}</p>
            <p>
              Tags:{" "}
              {post.tags.map((t: string) => (
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
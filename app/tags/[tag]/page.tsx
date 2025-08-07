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

async function getPostsByTag(tag: string) {
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

      if (parsedFrontmatter.tags.includes(tag)) {
        return {
          slug: filename.replace('.mdx', ''),
          ...parsedFrontmatter,
        };
      }

      return null;
    })
  );

  return posts.filter(Boolean);
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);

  return (
    <div className="test mx-auto grid min-h-screen max-w-2xl grid-rows-[auto_1fr_auto]">
      <div className="test grid grid-cols-[auto_1fr_auto]">
        <div className="test col-start-1"></div>
        <div className="test col-start-3"></div>
      </div>
      <div className="test">
        <h1>Posts tagged with "{tag}"</h1>
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
      <div className="test"></div>
    </div>
  );
}

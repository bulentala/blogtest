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

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const contentDirectory = path.join(process.cwd(), 'content');
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { content, frontmatter } = await compileMDX({
    source: fileContents,
    options: { parseFrontmatter: true },
  });

  const parsedFrontmatter = FrontmatterSchema.parse(frontmatter);

  return (
    <div className="test mx-auto grid min-h-screen max-w-2xl grid-rows-[auto_1fr_auto]">
      <div className="test grid grid-cols-[auto_1fr_auto]">
        <div className="test col-start-1"></div>
        <div className="test col-start-3"></div>
      </div>
      <div className="test">
        <h1>{parsedFrontmatter.title}</h1>
        <p>Created at: {parsedFrontmatter.createdAt}</p>
        <p>
          Tags:{" "}
          {parsedFrontmatter.tags.map((t) => (
            <Link key={t} href={`/tags/${t}`}>
              {t}
            </Link>
          ))}
        </p>
        {content}
      </div>
      <div className="test"></div>
    </div>
  );
}

export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), 'content');
  const filenames = await fs.readdir(contentDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Article {
  id: string;
  title: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export function getAllArticles(): Article[] {
  const fileNames = fs.readdirSync(contentDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const filePath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        id: data.id,
        title: data.title,
        tags: data.tags || [],
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });
}

export function getArticlesByTag(tag: string): Article[] {
  const allArticles = getAllArticles();
  return allArticles.filter((article) => article.tags.includes(tag));
}

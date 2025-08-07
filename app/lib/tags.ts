import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllTags() {
  const allTags = new Set<string>();
  const fileNames = fs.readdirSync(contentDirectory);

  fileNames.forEach((fileName) => {
    if (fileName.endsWith('.mdx')) {
      const filePath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag: string) => {
          allTags.add(tag);
        });
      }
    }
  });

  return Array.from(allTags);
}


import Link from 'next/link';

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Tags</h2>
      <ul className="space-y-2">
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/tags/${tag}`} className="text-blue-500 hover:underline">
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;

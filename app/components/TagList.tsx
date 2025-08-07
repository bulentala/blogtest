import Link from "next/link";

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="test bg-gray-100">
      <h2 className="mb-4 text-xl font-bold">Tags</h2>
      <ul className="flex flex-row flex-wrap space-x-2">
        {tags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/tags/${tag}`}
              className="text-blue-500 hover:underline"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;

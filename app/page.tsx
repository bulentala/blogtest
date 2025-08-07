import ArticleList from './components/ArticleList';

export default function Page() {
  return (
    <div className="test mx-auto grid min-h-screen max-w-2xl grid-rows-[auto_1fr_auto]">
      <div className="test grid grid-cols-[auto_1fr_auto]">
        <div className="test col-start-1"></div>
        <div className="test col-start-3"></div>
      </div>
      <div className="test">
        <ArticleList />
      </div>
      <div className="test"></div>
    </div>
  );
}

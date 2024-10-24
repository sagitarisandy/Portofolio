import { useState, useEffect } from "react";
import ArticleItems from "./micro/ArticleItems";

const mediumArticle =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@dinulfatahryan";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(mediumArticle)
      .then((res) => res.json())
      .then((data) => setArticles(data.items));
  }, []);

  return (
    <>
      <h1 className="text-center text-4xl font-extrabold text-slate-800 dark:text-white lg:ml-1">
      A few things I wrote ✏️
      </h1>

      <div className="article__container container grid">
        {articles.map((article, index) => {
          return <ArticleItems key={index} article={article} index={index} />;
        })}
      </div>
    </>
  );
};

export default Articles;
import React, { useContext } from 'react';

import ArticleContext from '../../Context/article-context';
import Article from './Article';
import classes from './MainArticles.module.css';

const MainArticles = () => {
  const ctx = useContext(ArticleContext);
  return (
    <div className={classes['main_articles']}>
      {ctx.articles.slice(0, 4).map((article, index) => (
        <Article
          key={index}
          title={article.title}
          description={article.description}
          url={article.url}
          author={article.author}
          urlToImage={article.urlToImage}
          sourceName={article.sourceName}
        />
      ))}
    </div>
  );
};

export default MainArticles;

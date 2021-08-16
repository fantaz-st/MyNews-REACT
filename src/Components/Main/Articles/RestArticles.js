import React, { useContext } from 'react';
import Article from './Article';
import AllContext from '../../Context/all-context';

import classes from './RestArticles.module.css';

const RestArticles = () => {
  const ctx = useContext(AllContext);

  return (
    <div className={classes['rest_articles']}>
      {ctx.articles.slice(4, ctx.articles.length).map((article, index) => (
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

export default RestArticles;

import React, { useContext } from 'react';
import LatestArticle from './LatestArticle';
import LoadingMoreMessage from './LoadingMoreMessage';
import AllContext from '../../Context/all-context';
import classes from './LatestNews.module.css';

const LatestNews = props => {
  const ctx = useContext(AllContext);
  return (
    <div className={classes['latest_news']} onScroll={props.onHandleScroll}>
      <h2 className={classes.header}>
        <span className={classes.dot}></span>Latest news
      </h2>
      <div className={classes.inner}>
        {ctx.latestNews.map((article, index) => (
          <LatestArticle key={index} title={article.title} url={article.url} publishedAt={article.publishedAt} />
        ))}
        {ctx.loadingLatest && <LoadingMoreMessage />}
      </div>
    </div>
  );
};

export default LatestNews;

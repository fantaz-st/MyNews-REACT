import React from 'react';
import classes from './LatestArticle.module.css';

const LatestArticle = props => {
  const getTimefromDate = data => {
    const date = new Date(data);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <>
      <div className={classes.latest_article}>
        <p className={classes['published_time']}>{getTimefromDate(props.publishedAt)}</p>
        <a href={props.url} className={classes.title}>
          {props.title}
        </a>
      </div>
      <div className={classes.separator}></div>
    </>
  );
};

export default LatestArticle;

import React, { useContext } from 'react';
import classes from './Article.module.css';
import ArticleContext from '../../Context/article-context';

import defaultImagePlaceholder from './../../../assets/placeholder.jpg';

const Article = props => {
  const ctx = useContext(ArticleContext);

  const handleAddToFavorite = e => {
    ctx.favoriteHandler(props);
  };

  return (
    <div className={classes.article}>
      <i className={`far fa-heart ${classes.favorite}`} onClick={handleAddToFavorite}></i>
      <a href={props.url} className={classes['article-a']}>
        <img
          alt={props.description}
          className={classes['banner-small']}
          src={props.urlToImage === null ? defaultImagePlaceholder : props.urlToImage}
        />
        <div className={classes.inner}>
          <p className={classes.title}>{props.title}</p>
          <p className={classes.author}>{props.author === null ? props.sourceName : props.author}</p>
        </div>
      </a>
    </div>
  );
};

export default Article;

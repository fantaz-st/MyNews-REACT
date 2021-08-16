import React, { useContext } from 'react';
import classes from './Article.module.css';
import AllContext from '../../Context/all-context';

import defaultImagePlaceholder from './../../../assets/placeholder.jpg';

const Article = props => {
  const ctx = useContext(AllContext);

  const handleAddToFavorite = e => {
    const parent = e.target.parentElement;
    const children = parent.children;

    const articleObj = {
      url: children[1].href,
      urlToImage: children[1].children[0].src,
      description: children[1].children[0].alt,
      title: children[1].children[1].children[0].textContent,
      author: children[1].children[1].children[1].textContent,
    };

    ctx.favoriteHandler(articleObj);
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

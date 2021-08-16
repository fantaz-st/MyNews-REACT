import React from 'react';
import Categories from './Categories';
import Articles from './Articles/Articles';
import RestArticles from './Articles/RestArticles';

import classes from './Main.module.css';

const Main = () => {
  return (
    <div className={classes.main}>
      <Categories />
      <div className={classes['article-inner']}>
        <Articles />
        <RestArticles />
      </div>
    </div>
  );
};

export default Main;

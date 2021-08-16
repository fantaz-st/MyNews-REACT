import React from 'react';
import classes from './MobileNavigationButtons.module.css';

const MobileNavigationButtons = props => {
  return (
    <div className={classes['nav-btns']}>
      <button
        className={props.visibleArticles === 'featured' ? `${classes['nav-menu-btn']} ${classes.active}` : `${classes['nav-menu-btn']}`}
        data-name="featured"
        onClick={props.onFeaturedCLick}
      >
        Featured
      </button>
      <button
        className={props.visibleArticles === 'latest' ? `${classes['nav-menu-btn']} ${classes.active}` : `${classes['nav-menu-btn']}`}
        data-name="latest"
        onClick={props.onLatestClick}
      >
        Latest
      </button>
    </div>
  );
};

export default MobileNavigationButtons;

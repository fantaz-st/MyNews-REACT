import React from 'react';
import classes from './LoadingMoreMessage.module.css';
const LoadingMoreMessage = () => {
  return (
    <div className={classes['loading-more-articles']}>
      <div className={classes['loader-message']}>Fetching more articles...</div>
    </div>
  );
};

export default LoadingMoreMessage;

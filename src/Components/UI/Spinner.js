import React from 'react';
import classes from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={classes.loading}>
      <div className={classes.spinner}></div>
      <div className={classes['loader-message']}>Fetching articles...</div>
    </div>
  );
};

export default Spinner;

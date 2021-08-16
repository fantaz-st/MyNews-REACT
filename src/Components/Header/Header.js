import React from 'react';
import classes from './Header.module.css';

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.banner}>
        <div className={classes.text}>
          <a href="index.html" className={classes.title}>
            Make MyNews your homepage
          </a>
          <a href="index.html" className={classes['sub-title']}>
            Every day discover what's trending on the internet!
          </a>
        </div>
        <div className={classes.buttons}>
          <button className={classes['button-get']}>GET</button>
          <button className={classes['button-no-thanks']}>No, thanks</button>
        </div>
      </div>
    </div>
  );
};

export default Header;

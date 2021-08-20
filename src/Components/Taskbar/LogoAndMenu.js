import React, { useState, useContext } from 'react';
import classes from './LogoAndMenu.module.css';
import magnifierIcon from './../../assets/magnifier.svg';
import ArticleContext from '../Context/article-context';

const LogoAndMenu = () => {
  const ctx = useContext(ArticleContext);

  const [searchTerm, setSeatchTerm] = useState('');

  const submitSearchTermHandler = e => {
    e.preventDefault();
    if (searchTerm === '') return;
    ctx.searchHandler(searchTerm);
  };

  const inputHandler = e => {
    setSeatchTerm(e.target.value);
  };
  const handleHamburgerMenuClick = () => {
    ctx.menuVisibility();
  };

  return (
    <div className={classes.taskbar}>
      <div className={classes.upper}>
        <div className={classes.logo}>
          <a href="index.html" className={classes.text}>
            <span>My</span>News
          </a>
        </div>
        <input
          type="checkbox"
          id="menu_checkbox"
          className={classes['menu_checkbox']}
          onClick={handleHamburgerMenuClick}
          checked={ctx.menuIsVisible}
        />
        <label htmlFor="menu_checkbox" className={classes['hamburger-label']}>
          <div className={classes.slice}></div>
          <div className={classes.slice}></div>
          <div className={classes.slice}></div>
        </label>
      </div>
      <form className={classes['search_bar']} onSubmit={submitSearchTermHandler}>
        <img className={classes.magnifier} src={magnifierIcon} alt="Magnifier icon for search" />
        <input onChange={inputHandler} type="text" name="search" id="search" className={classes['search__field']} placeholder="Search news" />
        <button className={classes['btn-search']} onClick={submitSearchTermHandler}>
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default LogoAndMenu;

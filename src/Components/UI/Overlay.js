import React, { useContext, useState } from 'react';
import classes from './Overlay.module.css';
import ArticleContext from '../Context/article-context';
import magnifierIcon from './../../assets/magnifier.svg';

const categoryList = [
  { name: 'home', icon: 'fas fa-home', value: 'general' },
  { name: 'business', icon: 'fas fa-briefcase', value: 'business' },
  { name: 'health', icon: 'fas fa-plus-square', value: 'health' },
  { name: 'science', icon: 'fas fa-vial', value: 'science' },
  { name: 'sports', icon: 'fas fa-futbol', value: 'sports' },
  { name: 'technology', icon: 'fas fa-tv', value: 'technology' },
];

const Overlay = () => {
  const ctx = useContext(ArticleContext);

  const [searchTerm, setSeatchTerm] = useState('');

  const submitSearchTermHandler = e => {
    console.log('submitted');
    e.preventDefault();
    if (searchTerm === '') return;
    ctx.searchHandler(searchTerm);
    ctx.menuVisibility();
  };

  const inputHandler = e => {
    setSeatchTerm(e.target.value);
  };

  const onCategoryChange = e => {
    ctx.changeCategory(e.currentTarget.dataset.value);
    ctx.menuVisibility();
  };

  const onFavoriteClick = () => {
    ctx.loadFavorites();
    ctx.menuVisibility();
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.inner}>
        <div className={classes.logo}>
          <p className={classes.text}>
            <span>My</span>News
          </p>
        </div>
        <form className={classes['mobile-search_bar']} onSubmit={submitSearchTermHandler}>
          <img className={classes.magnifier} src={magnifierIcon} alt="Mobile magnifier icon" />
          <input onChange={inputHandler} type="text" name="search" id="search" className={classes['search__field']} placeholder="Search news" />
          <button className={`${classes.btn} ${classes['btn-search']}`}>SEARCH</button>
        </form>
        <div className={`${classes['category_btns']} ${classes['mobile-category_btns']}`}>
          {categoryList.map(category => (
            <button
              onClick={onCategoryChange}
              key={category.name}
              data-value={category.value}
              className={ctx.category === category.value ? `${classes.active} ${classes['btn-category']}` : `${classes['btn-category']}`}
            >
              <i className={category.icon}></i>
              <p>{category.name}</p>
            </button>
          ))}

          {ctx.favoriteArticles.length > 0 && (
            <button
              onClick={onFavoriteClick}
              key="fav"
              data-value="favorites"
              className={ctx.category === 'favorites' ? `${classes.active} ${classes['btn-category']}` : `${classes['btn-category']}`}
            >
              <i className="fas fa-heart"></i>
              <p>Favorites</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overlay;

import React, { useContext } from 'react';
import classes from './Categories.module.css';

import ArticleContext from '../Context/article-context';

const categoryList = [
  { name: 'home', icon: 'fas fa-home', value: 'general' },
  { name: 'business', icon: 'fas fa-briefcase', value: 'business' },
  { name: 'health', icon: 'fas fa-plus-square', value: 'health' },
  { name: 'science', icon: 'fas fa-vial', value: 'science' },
  { name: 'sports', icon: 'fas fa-futbol', value: 'sports' },
  { name: 'technology', icon: 'fas fa-tv', value: 'technology' },
];

const Categories = () => {
  const ctx = useContext(ArticleContext);

  const onCategoryChange = e => {
    ctx.changeCategory(e.currentTarget.dataset.value);
  };

  const onFavoriteClick = () => {
    ctx.loadFavorites();
  };

  return (
    <div className={`${classes['category_btns']} ${classes['desktop-category_btns']}`}>
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
  );
};

export default Categories;

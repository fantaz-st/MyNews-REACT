import React from 'react';

const AllContext = React.createContext({
  category: 'general',
  articles: [],
  latestNews: [],
  changeCategory: category => {},
  searchHandler: searchTerm => {},
  favoriteHandler: articleObj => {},
  favoriteArticles: [],
  loadFavorites: favorites => {},
  reachedEnd: value => {},
  loadingLatest: false,
  menuVisibility: () => {},
  menuIsVisible: false,
});

export default AllContext;

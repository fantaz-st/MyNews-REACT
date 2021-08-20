import React, { useCallback, useEffect, useReducer, useState } from 'react';
import reducer from '../Main/Helpers/reducer';
import initialState from '../Main/Helpers/initialState';
import createArticleObject from '../Main/Helpers/createArticleObject';

// const APIKEY = 'aa45a5638d5d4834af98010c52e2cd14';
const APIKEY = `baa3a94494a84b94a710ba35d1534363`;

const ArticleContext = React.createContext({
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
  getArticles: () => {},
});

export const ArticleContextProvider = props => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSearch = searchTerm => {
    dispatch({
      type: 'SEARCH',
      payload: {
        value: searchTerm,
        url: `https://newsapi.org/v2/everything?q=${searchTerm}&from=2021-08-08&sortBy=popularity&apiKey=${APIKEY}`,
      },
    });
  };

  const onAddFavorite = articleObj => {
    dispatch({
      type: 'ADD_TO_FAVORITES',
      value: articleObj,
    });
  };

  const onChangeCategory = category => {
    dispatch({
      type: 'CHANGE_CATEGORY',
      payload: {
        value: category,
        url: `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${state.pageSize}&page=${state.page}&apiKey=${APIKEY}`,
      },
    });
  };

  const onReachedEnd = async () => {
    try {
      if (state.totalResults > state.loadedArticles) {
        console.log(state.totalResults, state.loadedArticles);
        dispatch({ type: 'LOADING_LATEST' });
        const nextPage = state.page + 1;
        const loadedArticles = state.loadedArticles + 20;

        const response = await fetch(`https://newsapi.org/v2/top-headlines?category=general&pageSize=20&page=${nextPage}&apiKey=${APIKEY}`);
        const data = await response.json();

        const latestNews = data.articles.map(article => createArticleObject(article));
        dispatch({
          type: 'ADD_MORE_ARTICLES',
          payload: {
            articles: latestNews,
            loadedArticles: loadedArticles,
            page: nextPage,
          },
        });
      } else {
        console.log('no more articles');
        return;
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const onLoadFavorites = () => {
    dispatch({
      type: 'LOAD_FAVORITES',
    });
  };

  const onChangeMenuVisibility = () => {
    setMenuVisibility(prevState => !prevState);
  };

  //load favorites on INIT
  useEffect(() => {
    const storage = localStorage.getItem('favorites');
    if (storage) {
      dispatch({
        type: 'LOAD_FROM_LS',
        value: JSON.parse(storage),
      });
    }
  }, []);

  //persist favorites in local storage when favorite is added to state.favorites

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  //main async await article getting function

  const getArticles = useCallback(async () => {
    dispatch({
      type: 'LOADING',
    });

    try {
      const response = await fetch(state.url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      //createArticleObject func is in folder helpers
      const allArticles = data.articles.map(article => createArticleObject(article));

      dispatch({ type: 'ADD_ARTICLES', payload: { value: allArticles, totalResults: data.totalResults } });
    } catch (err) {
      console.error(err.message);
    }
  }, [state.url]);

  //useEffect to launch getting articles

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  return (
    <ArticleContext.Provider
      value={{
        category: state.category,
        articles: state.articles,
        latestNews: state.latestNews,
        changeCategory: onChangeCategory,
        searchHandler: onSearch,
        favoriteHandler: onAddFavorite,
        favoriteArticles: state.favorites,
        loadFavorites: onLoadFavorites,
        reachedEnd: onReachedEnd,
        menuVisibility: onChangeMenuVisibility,
        menuIsVisible: menuVisibility,
        loadingLatest: state.loadingLatest,
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext;

import React, { useCallback, useEffect, useReducer, useState } from 'react';

import AllContext from './Components/Context/all-context';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import LogoAndMenu from './Components/Taskbar/LogoAndMenu';
import Spinner from './Components/UI/Spinner';

import './App.css';
import Overlay from './Components/UI/Overlay';

// const APIKEY = 'aa45a5638d5d4834af98010c52e2cd14';
const APIKEY = `baa3a94494a84b94a710ba35d1534363`;

const initialState = {
  articles: [],
  latestNews: [],
  category: 'general',
  isLoading: false,
  searchTerm: '',
  searching: false,
  pageSize: 20,
  totalResults: '',
  loadedArticles: 0,
  page: 1,
  loadMore: false,
  url: `https://newsapi.org/v2/top-headlines?category=general&pageSize=20&page=1&apiKey=${APIKEY}`,
  favorites: [],
  loadingLatest: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ARTICLES':
      return {
        ...state,
        articles: action.payload.value,
        latestNews: action.payload.value,
        totalResults: action.payload.totalResults,
        loadedArticles: action.payload.value.length,
        isLoading: false,
        searching: false,
      };
    case 'ADD_MORE_ARTICLES':
      return {
        ...state,
        latestNews: [...state.latestNews, ...action.payload.articles],
        loadedArticles: action.payload.loadedArticles,
        page: action.payload.page,
        loadingLatest: false,
      };

    case 'LOADING':
      return { ...state, isLoading: true };

    case 'LOADING_LATEST':
      return { ...state, loadingLatest: true };

    case 'CHANGE_CATEGORY':
      return { ...state, category: action.payload.value, url: action.payload.url };

    case 'SEARCH':
      return { ...state, searchTerm: action.payload.value, url: action.payload.url, searching: true };

    case 'ADD_TO_FAVORITES':
      return { ...state, favorites: [...state.favorites, action.value] };

    case 'LOAD_FROM_LS' /* local storage */:
      return { ...state, favorites: action.value };

    case 'LOAD_FAVORITES':
      return { ...state, articles: state.favorites, category: 'favorites' };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [menuVisibility, setMenuVisibility] = useState(false);

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
        const latestNews = [];

        for (const key in data.articles) {
          latestNews.push({
            author: data.articles[key].author,
            content: data.articles[key].content,
            description: data.articles[key].description,
            sourceName: data.articles[key].source.name,
            url: data.articles[key].url,
            urlToImage: data.articles[key].urlToImage,
            title: data.articles[key].title,
            publishedAt: data.articles[key].publishedAt,
          });
        }
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
      const allArticles = [];

      for (const key in data.articles) {
        allArticles.push({
          author: data.articles[key].author,
          content: data.articles[key].content,
          description: data.articles[key].description,
          sourceName: data.articles[key].source.name,
          url: data.articles[key].url,
          urlToImage: data.articles[key].urlToImage,
          title: data.articles[key].title,
          publishedAt: data.articles[key].publishedAt,
          menuVisibility: false,
        });
      }
      dispatch({ type: 'ADD_ARTICLES', payload: { value: allArticles, totalResults: data.totalResults } });
    } catch (err) {
      console.error(err.message);
    }
  }, [state.url]);

  //useEffect to launch getting articles

  useEffect(() => {
    getArticles();
  }, [getArticles]);

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

  //conditionaly managing main content

  let mainContent = <p>Found no articles 😥</p>;

  if (state.articles.length > 0) mainContent = <Main />;

  if (state.isLoading) mainContent = <Spinner />;

  return (
    <AllContext.Provider
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
      {menuVisibility && <Overlay />}
      <Header />
      <LogoAndMenu />
      {mainContent}
    </AllContext.Provider>
  );
}

export default App;

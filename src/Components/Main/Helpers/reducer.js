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

export default reducer;

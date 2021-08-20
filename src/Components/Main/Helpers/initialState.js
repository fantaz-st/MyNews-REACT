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

export default initialState;

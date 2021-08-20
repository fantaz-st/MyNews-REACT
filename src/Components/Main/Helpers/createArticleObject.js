const createArticleObject = article => {
  return {
    author: article.author,
    content: article.content,
    description: article.description,
    sourceName: article.source.name,
    url: article.url,
    urlToImage: article.urlToImage,
    title: article.title,
    publishedAt: article.publishedAt,
  };
};

export default createArticleObject;

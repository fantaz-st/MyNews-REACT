import React, { useContext } from 'react';

import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import LogoAndMenu from './Components/Taskbar/LogoAndMenu';
import Spinner from './Components/UI/Spinner';
import Overlay from './Components/UI/Overlay';

import './App.css';
import ArticleContext from './Components/Context/article-context';

function App() {
  const ctx = useContext(ArticleContext);

  let mainContent = <p>Found no articles 😥</p>;

  if (ctx.articles.length > 0) mainContent = <Main />;

  if (ctx.isLoading) mainContent = <Spinner />;

  return (
    <>
      {ctx.menuIsVisible && <Overlay />}
      <Header />
      <LogoAndMenu />
      {mainContent}
    </>
  );
}

export default App;

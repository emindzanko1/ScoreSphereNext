import Link from 'next/link';
import { Fragment, useState } from 'react';
import SearchBar from './SearchBar';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {

  const [showSearchBar, setShowSearchBar] = useState(false);

  function toggleSearchBar() {
    setShowSearchBar(!showSearchBar);
  }

  const closeSearchBar = () => {
    setShowSearchBar(false);
  };

  return (
    <header className={classes.header}>
      <h1 className={classes.title}>
        <Link href='/'>ScoreSphere</Link>
      </h1>
      <nav className={classes.nav}>
        {!showSearchBar && (
          <ul className={classes.navLinks}>
            <li>
              <Link href='/search' onClick={toggleSearchBar}>
                Search
              </Link>
            </li>
            <li>
              <Link href='/'>All Leagues</Link>
            </li>
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          </ul>
        )}
        {showSearchBar && <SearchBar onCloseSearch={closeSearchBar} />}
      </nav>
    </header>
  );
};

export default MainNavigation;


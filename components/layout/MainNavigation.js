import Link from 'next/link';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import { Fragment } from 'react';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.title}>
        <Link href='/'>ScoreSphere</Link>
      </h1>
      <nav className={classes.nav}>
        <ul className={classes.navLinks}>
          <li>
            <Link href='/search'>Search</Link>
          </li>
          <li>
            <Link href='/'>All Leagues</Link>
          </li>
          <li>
            <Link href='/auth'>Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

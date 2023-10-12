//localhost:3000/tournament

import React, { Fragment, useState, useRef } from 'react';
import Link from 'next/link';
import Table from '@/components/leagues/Table';
import LeagueTable from '@/components/leagues/LeagueTable';
import { leagues } from '@/pages';
import { clubs } from '@/pages';
import { useRouter } from 'next/router';
import classes from './Tournament.module.css';

const Tournament = () => {
  const [activeTable, setActiveTable] = useState('table');

  const router = useRouter();
  const { leaguetitle, leaguename, leagueid } = router.query;

  const league = leagues.find(league => league.name === leaguename);

  let leagueClubs;

  if(league) {
    leagueClubs = clubs.find(club => club.area.id === league.area.id);
  }

  const handleFixturesClick = () => {
    setActiveTable('table');
  };

  const handleTableClick = () => {
    setActiveTable('leagueTable');
  };

  if(!league) {
    return <h1>Pogresan naziv lige</h1>
  }
  return (
    <Fragment>
      <div className={classes.leagueTitle}>
        <h2>Welcome to {leaguetitle}!</h2>
        <div className={classes.leagueContainer}>
          <div className={classes.buttonContainer}>
            <button onClick={handleFixturesClick} className={activeTable === 'table' ? classes.active : ''}>
              Fixture
            </button>
            <button onClick={handleTableClick} className={activeTable === 'leagueTable' ? classes.active : ''}>
              Table
            </button>
          </div>
          {activeTable === 'table' ? (
            <Table
              key={league.id}
              id={league.id}
              name={league.name}
              title={league.area.name}
              code={league.code}
              clubs={leagueClubs}
              image={league.area.flag}
            />
          ) : (
            <LeagueTable
              key={league.area.id}
              id={league.area.id}
              league={league}
              teams={leagueClubs}
              image={league.area.flag}
            />
          )}
          <Link href='/'>
            <div className={classes.buttonContainer}>
              <button>Homepage</button>
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Tournament;

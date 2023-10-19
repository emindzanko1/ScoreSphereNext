//localhost:3000/tournament

import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Table from '@/components/leagues/Table';
import LeagueTable from '@/components/leagues/LeagueTable';
import { useRouter } from 'next/router';
import classes from './Tournament.module.css';
import TopScorersTable from '@/components/leagues/TopScorersTable';

const Tournament = () => {
  const [activeTable, setActiveTable] = useState('table');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [league, setLeague] = useState();
  const [clubs, setClubs] = useState();

  const router = useRouter();
  const { leaguetitle, leagueid } = router.query;

  const formatName = cname => {
    const words = cname.split('-');
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
  };

  useEffect(() => {
    const fetchLeague = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/league/${leagueid}`);
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setLeague(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
    fetchLeague();
  }, []);

  const fixturesClickHandler = () => {
    setActiveTable('table');
  };

  const tableClickHandler = () => {
    setActiveTable('leagueTable');
  };

  const scorersClickHandler = () => {
    setActiveTable('leagueScorers');
  };

  return (
    <Fragment>
      {league ? (
        <div className={classes.leagueTitle}>
          <h2>Welcome to {formatName(leaguetitle)}!</h2>
          <div className={classes.leagueContainer}>
            <div className={classes.buttonContainer}>
              <button onClick={fixturesClickHandler} className={activeTable === 'table' ? classes.active : ''}>
                Fixture
              </button>
              <button onClick={tableClickHandler} className={activeTable === 'leagueTable' ? classes.active : ''}>
                Table
              </button>
              <button onClick={scorersClickHandler} className={activeTable === 'leagueScorers' ? classes.active : ''}>
                Top Scorers
              </button>
            </div>
            {activeTable === 'table' ? (
              <Table
                key={league.id}
                id={league.id}
                name={league.name}
                title={league.area.name}
                code={league.code}
                image={league.area.flag}
              />
            ) : activeTable === 'leagueTable' ? (
              <LeagueTable
                key={league.id}
                id={league.id}
                name={league.name}
                title={league.area.name}
                code={league.code}
                image={league.area.flag}
              />
            ) : (
              <TopScorersTable
                key={league.id}
                id={league.id}
                name={league.name}
                title={league.area.name}
                code={league.code}
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
      ) : (
        <h1 className={classes.h1}>Maximum limit of API calls is reached!</h1>
      )}
    </Fragment>
  );
};

export default Tournament;

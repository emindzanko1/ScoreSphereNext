import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Table from '@/components/leagues/Table';
import LeagueTable from '@/components/leagues/LeagueTable';
import classes from './ClubDetails.module.css';

const ClubDetails = props => {
  const [activeTable, setActiveTable] = useState('table');
  const [selectedClub, setSelectedClub] = useState(null);

  const { club } = props;

  console.log(props);

  let name, league;

  if (club) {
    club.area.name === 'Germany' ? (league = club.runningCompetitions[1]) : (league = club.runningCompetitions[0]);
    club.area.name === 'Germany'
      ? (name = club.runningCompetitions[1].name)
      : (name = club.runningCompetitions[0].name);
  }

  const handleFixturesClick = () => {
    setActiveTable('table');
    // setSelectedClub(null);
  };

  const handleTableClick = () => {
    setActiveTable('leagueTable');
    setSelectedClub(club);
  };

  return (
    <div className={classes.container}>
      {club ? (
        <>
          <h1 className={classes.title}>{name}</h1>
          <div className={classes.clubImageContainer}>
            <img src={club.crest} alt={club.name} className={classes.clubImage} />
          </div>
          <h2 className={classes.clubName}>{club.name}</h2>
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
              title={club.area.name}
              code={league.code}
              selectedClub={selectedClub}
              image={club.area.flag}
            />
          ) : (
            <LeagueTable
              key={league.id}
              id={league.id}
              name={league.name}
              title={club.area.name}
              code={league.code}
              selectedClub={selectedClub}
              image={club.area.flag}
            />
          )}
          <Link href='/'>
            <div className={classes.buttonContainer}>
              <button>Homepage</button>
            </div>
          </Link>
        </>
      ) : (
        <h1 className={classes.h1}>Maximum limit of API calls is reached!</h1>
      )}
    </div>
  );
};

export default ClubDetails;

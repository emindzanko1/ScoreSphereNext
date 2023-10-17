//localhost:3000
import React, { Fragment, useState, useEffect } from 'react';
import LeaguesList from '../components/leagues/LeaguesList';
import LeaguesTables from '@/components/leagues/LeaguesTables';

const HomePage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [leagues, setLeagues] = useState([]);
  
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/leagues');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setLeagues(data.competitions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
    fetchLeagues();
  }, []);

  let filteredLeagues;

  if(leagues) {
    filteredLeagues = leagues.filter(
      league =>
        !(
          league.area.name === 'Europe' ||
          league.area.name === 'Brazil' ||
          league.area.name === 'World' ||
          league.name === 'Championship' ||
          league.area.name === 'South America' ||
          league.name === 'Eredivisie' ||
          league.name === 'Ligue 1' ||
          league.name === 'Primeira Liga'
        )
    );
  }

  return (
    <Fragment>
      <LeaguesList leagues={filteredLeagues} />
      <LeaguesTables leagues={filteredLeagues} />
    </Fragment>
  );
};

export default HomePage;

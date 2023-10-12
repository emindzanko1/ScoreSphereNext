//localhost:3000
import React, { Fragment, useState, useEffect } from 'react';
import LeaguesList from '../components/leagues/LeaguesList';
import LeaguesTables from '@/components/leagues/LeaguesTables';

const HomePage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [leagues, setLeagues] = useState([]);
  const [clubs, setClubs] = useState([]);
  
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

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true);

        const responsePL = await fetch('http://localhost:5000/PL/clubs');
        const responseBL1 = await fetch('http://localhost:5000/BL1/clubs');
        const responseSA = await fetch('http://localhost:5000/SA/clubs');
        const responsePD = await fetch('http://localhost:5000/PD/clubs');

        if (!responsePL.ok || !responseBL1.ok || !responseSA.ok || !responsePD.ok) {
          throw new Error('API request failed');
        }
  
        const dataPL = await responsePL.json();
        const dataBL1 = await responseBL1.json();
        const dataSA = await responseSA.json();
        const dataPD = await responsePD.json();

        const combinedClubs = [...dataPL.teams, ...dataBL1.teams, ...dataSA.teams, ...dataPD.teams ];

        setClubs(combinedClubs);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
    fetchClubs();
  }, []);


  return (
    <Fragment>
      <LeaguesList leagues={filteredLeagues} />
      <LeaguesTables leagues={filteredLeagues} clubs={clubs} />
    </Fragment>
  );
};

export default HomePage;

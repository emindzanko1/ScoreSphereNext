//localhost:3000
import React, { Fragment, useState, useEffect } from 'react';
import LeaguesList from '../components/leagues/LeaguesList';
import LeaguesTables from '@/components/leagues/LeaguesTables';

export const leagues = [
  {
    id: '1',
    name: 'premier-league',
    area: {
      id: 'pl1',
      name: 'england',
      flag: 'https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg',
    },
    code: 'pl',
    emblem: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
  },
  {
    id: '2',
    name: 'bundesliga',
    area: {
      id: 'bl1',
      name: 'germany',
      flag: 'https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg',
    },
    code: 'bl1',
    emblem: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
  },
  {
    id: '3',
    name: 'seria-a',
    area: {
      id: 'sa1',
      name: 'italy',
      flag: 'https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg',
    },
    code: 'sa',
    emblem: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
  },
  {
    id: '4',
    name: 'primera-divison',
    area: {
      id: 'pd1',
      name: 'spain',
      flag: 'https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg',
    },
    code: 'pd',
    emblem: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
  },
];

export const clubs = [
  {
    id: '1',
    name: 'Arsenal FC',
    shortName: 'Arsenal',
    crest: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    area: {
      id: 'pl1',
    },
  },
  {
    id: '2',
    name: 'Manchester City FC',
    shortName: 'Man City',
    crest: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    area: {
      id: 'pl1',
    },
  },
  {
    id: '3',
    name: 'Bayern Munchen FC',
    shortName: 'Bayern Munchen',
    crest: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    area: {
      id: 'bl1',
    },
  },
  {
    id: '4',
    name: 'Koln',
    shortName: 'Koln',
    crest: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    area: {
      id: 'bl1',
    },
  },
  {
    id: '5',
    name: 'Lazio FC',
    shortName: 'Lazio',
    crest: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    area: {
      id: 'sa1',
    },
  },
  {
    id: '6',
    name: 'Napoli FC',
    shortName: 'Napoli',
    crest: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    area: {
      id: 'sa1',
    },
  },
  {
    id: '7',
    name: 'Real FC',
    shortName: 'Real',
    crest: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    area: {
      id: 'pd1',
    },
  },
  {
    id: '8',
    name: 'Barcelona FC',
    shortName: 'Barcelona',
    crest: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    area: {
      id: 'pd1',
    },
  },
];

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

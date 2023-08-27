//localhost:3000
import { Fragment } from 'react';
import LeaguesList from '../components/leagues/LeaguesList';
import LeaguesTables from '@/components/leagues/LeaguesTables';

const leagues = [
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
    id: '1',
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
    id: '1',
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

const clubs = [
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
  return (
    <Fragment>
      <LeaguesList leagues={leagues} />
      <LeaguesTables leagues={leagues} clubs={clubs} />
    </Fragment>
  );
};

export default HomePage;

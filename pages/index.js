//localhost:3000
import LeaguesList from '../components/leagues/LeaguesList';

const leagues = [{
    id: '1',
    name: 'premier-league',
    area: {
        name: 'england'
    },
    code: 'pl',
    emblem: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg'
},{
    id: '2',
    name: 'bundesliga',
    area: {
        name: 'germany'
    },
    code: 'bl1',
    emblem: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg'
},{
    id: '1',
    name: 'seria-a',
    area: {
        name: 'italy'
    },
    code: 'sa',
    emblem: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg'
},{
    id: '1',
    name: 'primera-divison',
    area: {
        name: 'spain'
    },
    code: 'pd',
    emblem: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg'
}];
const HomePage = () => {
  return (
      <LeaguesList leagues={leagues} />
  );
};

export default HomePage;

import classes from './LeaguesTables.module.css';
import Table from './Table'; 

const LeaguesTables = props => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();

  const leagues = props.leagues;
  const clubs = props.clubs;

  const errorHandler = () => {
    setError(null);
  };

  if (!props.leagues) {
    return <p>No tables available.</p>;
  }

  return (
    <ul className={classes.leaguesContainer}>
      {leagues.map(league => {
        const leagueClubs = clubs.filter(club => club.area.id === league.area.id);
        return (
          <Table
            key={league.id}
            id={league.id}
            name={league.name}
            title={league.area.name}
            code={league.code}
            clubs={leagueClubs}
            image={league.area.flag}
          />
        );
      })}
    </ul>
  );
};

export default LeaguesTables;

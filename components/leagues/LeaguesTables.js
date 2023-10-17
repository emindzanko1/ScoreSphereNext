import classes from './LeaguesTables.module.css';
import Table from './Table'; 

const LeaguesTables = props => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();

  const leagues = props.leagues;

  const errorHandler = () => {
    setError(null);
  };

  if (!leagues)   {
    return <h1 className={classes.heading}>No tables available.</h1>;
  }

  return (
    <ul className={classes.leaguesContainer}>
      {leagues.map(league => {
        return (
          <Table
            key={league.id}
            id={league.id}
            name={league.name}
            title={league.area.name}
            code={league.code}
            image={league.area.flag}
          />
        );
      })}
    </ul>
  );
};

export default LeaguesTables;

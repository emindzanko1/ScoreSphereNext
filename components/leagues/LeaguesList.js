// import LeagueItem from './LeagueItem';
import classes from './LeaguesList.module.css';
import LeagueItem from './LeagueItem';

const LeaguesList = props => {

  const leagues = props.leagues;

  if (!leagues || leagues.length === 0) {
    return <h1 className={classes.heading}>No leagues available.</h1>;
  }

  return (
    <ul className={classes.leagueList}>
      {leagues.map(league => (
        <LeagueItem
          key={league.id}
          id={league.id}
          /*name={league.slug}
          title={league.name}*/
          name={league.name}
          title={league.area.name}
          code={league.code}
          //image={league.logo}
          image={league.emblem}
        />
      ))}
    </ul>
  );
};

export default LeaguesList;

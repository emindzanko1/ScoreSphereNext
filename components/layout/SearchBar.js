import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import classes from './SearchBar.module.css';

const SearchBar = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [leagues, setLeagues] = useState([]);
  const [clubs, setClubs] = useState([]);

  const handleSearchInputChange = event => {
    const searchText = event.target.value;
    setSearchText(searchText);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

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

  if (leagues) {
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

        const combinedClubs = [...dataPL.teams, ...dataBL1.teams, ...dataSA.teams, ...dataPD.teams];

        setClubs(combinedClubs);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
    fetchClubs();
  }, []);

  const formatTeamName = teamName => {
    return teamName.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <form className={classes.searchForm}>
      <input type='text' value={searchText} onChange={handleSearchInputChange} />
      <div className={classes.suggestionsList}>
        {filteredLeagues || clubs ? (
          <>
            {filteredLeagues &&
              filteredLeagues.map(league => (
                <Link
                  className={classes.list}
                  key={league.id}
                  href={`/tournament/${formatTeamName(league.area.name)}/${formatTeamName(league.name)}/${formatTeamName(league.code)}`}
                >
                  <img src={league.emblem} alt={league.name} />
                  {league.name}
                </Link>
              ))}

            {clubs &&
              clubs.map(club => (
                <Link
                  className={classes.list}
                  key={club.id}
                  href={`/team/${formatTeamName(club.shortName)}/${formatTeamName(club.runningCompetitions[0].code)}`}
                >
                  <img src={club.crest} alt={club.name} />
                  {club.name}
                </Link>
              ))}
          </>
        ) : (
          <div className={classes.noMatches}>No matches found.</div>
        )}
      </div>
      {searchText && (
        <button type='button' onClick={handleClearSearch}>
          X
        </button>
      )}
      <button type='button' onClick={props.onCloseSearch}>
        Close
      </button>
    </form>
  );
};

export default SearchBar;

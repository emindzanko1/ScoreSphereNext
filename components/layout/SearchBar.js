import { Fragment, useState, useEffect } from 'react';
import classes from './SearchBar.module.css';

const SearchBar = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchInputChange = event => {
    const searchText = event.target.value;
    setSearchText(searchText);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

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

  if (filteredLeagues) {
    console.log(filteredLeagues);
  }

  return (
    <form className={classes.searchForm}>
      <input type='text' value={searchText} onChange={handleSearchInputChange} />
      <div className={classes.suggestionsList}>
        {filteredLeagues ? (
          filteredLeagues.map(league => (
            <div className={classes.list} key={league.id}>
              <img src={league.emblem} alt={league.name} />
              {league.name}
            </div>
          ))
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

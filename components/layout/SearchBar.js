import { Fragment, useState } from 'react';
import classes from './SearchBar.module.css';

const SearchBar = props => {
  const [searchText, setSearchText] = useState('');

  const handleSearchInputChange = event => {
    const searchText = event.target.value;
    setSearchText(searchText);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  console.log(searchText);

  return (
    <form className={classes.searchForm}>
      <input type='text' value={searchText} onChange={handleSearchInputChange} />
      {searchText && (
        <button type='button' onClick={handleClearSearch}>
          X
        </button>
      )}
      <button type='button' onClick={props.onCloseSearch}>
        Close
      </button>
    </form>
    // <form className='search-form'>
    //   <input type='text' placeholder='Search' value={searchText} onChange={handleSearchInputChange} ref={inputRef} />
    //   <div className='suggestions-list'>
    //     {filteredValues.length > 0 ? (
    //       filteredValues.map((filteredValue, index) => (
    //         <div className='list' onClick={() => handleSuggestedTeamClick(filteredValue)} key={index}>
    //           <img src={getFlagForName(filteredValue)} alt={`${filteredValue} flag`} /> {filteredValue}
    //         </div>
    //       ))
    //     ) : (
    //       <div className='no-matches'>No matches found.</div>
    //     )}
    //   </div>
    //   {searchText ? (
    //     <button type='button' onClick={handleClearSearch}>
    //       X
    //     </button>
    //   ) : (
    //     <button type='button' onClick={props.onCloseSearch}>
    //       Close
    //     </button>
    //   )}
    // </form>
  );
};

export default SearchBar;

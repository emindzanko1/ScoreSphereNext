import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ClubDetails from '../../../../components/clubs/ClubDetails';
// import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Clubs = () => {
  const router = useRouter();
  const clubName = router.query.club;
  const leagueId = router.query.code;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/${leagueId}/clubs`);

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        const teams = data.teams;
        console.log(teams);
        const clubsWithLowercaseShortNames = teams.map(club => ({
          ...club,
          shortName: club.shortName.toLowerCase().replace(/\s+/g, '-'),
        }));

        setClubs(clubsWithLowercaseShortNames);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
    fetchClubs();
  }, []);

  const myClub = clubs.find(club => club.shortName === clubName);
  
  console.log(myClub);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {!clubs && <h1>Loading....</h1>}
      {clubs && <ClubDetails club={myClub} />}
    </Fragment>
  );
};

export default Clubs;

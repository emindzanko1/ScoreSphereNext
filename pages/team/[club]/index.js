import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ClubsList from '../../../components/clubs/ClubsList';
// import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Clubs = () => {
  const router = useRouter();
  const clubName = router.query.club;

  return <h1>Emin</h1>

  // return (
  //   <Fragment>
  //     {!clubs && <h1>Loading....</h1>}
  //     {clubs && <ClubsList clubs={parsedClubs}/>}
  //   </Fragment>
  // );
};

export default Clubs;

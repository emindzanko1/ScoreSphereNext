//localhost:3000/tournament

import { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Tournament = () => {
  const router = useRouter();
  const { leaguetitle, leaguename, leagueid } = router.query;
  return (
    <Fragment>
      <h1>Dobro dosao u Tournament!</h1>
      <h2>Dynamic League Page</h2>
      <p>League Title: {leaguetitle}</p>
      <p>League Name: {leaguename}</p>
      <p>League ID: {leagueid}</p>
      <button>
        <Link href='/'>Klikni ovdje da se vratis na pocetnu!</Link>
      </button>
    </Fragment>
  );
};

export default Tournament;

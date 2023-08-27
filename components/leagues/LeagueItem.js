import Link from 'next/link';
import classes from './LeagueItem.module.css';

const LeagueItem = props => {
  const { name, title, code, image } = props;
  const formattedName = name.toLowerCase().replace(/\s+/g, '-');
  const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
  const formattedCode = code.toLowerCase().replace(/\s+/g, '-');

  return (
    <li className={classes.leagueItem}>
      <Link
        href={`/tournament/[leaguetitle]/[leaguename]/[leagueid]`}
        as={`/tournament/${formattedTitle}/${formattedName}/${formattedCode}`}
        passHref
        className={classes.leagueItemLink}
        style={{ textDecoration: 'none' }}
      >
        <div className={classes.leagueItemContent}>
          <div className={classes.leagueItemImage}>
            <img src={image} alt={name} className={classes.leagueItemImageImg} />
          </div>
          <div className={classes.leagueItemInfo}>
            <h2 className={classes.leagueItemTitle}>{props.title}</h2>
            <h3 className={classes.leagueItemName}>{props.name}</h3>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default LeagueItem;

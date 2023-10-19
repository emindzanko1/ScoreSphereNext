import React, { useState, useRef, Fragment, useEffect } from 'react';
// import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Link from 'next/link';

import classes from './LeagueTable.module.css';

const LeagueTable = props => {
  const { name, title, code, selectedClub, image } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [table, setTable] = useState([]);

  const formattedName = name.toLowerCase().replace(/\s+/g, '-');
  const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
  const formattedCode = code.toLowerCase().replace(/\s+/g, '-');

  useEffect(() => {
    const fetchTable = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/league/${formattedCode}/standings`);
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setTable(data.standings[0].table);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTable();
  }, []);

  const rowTimeoutRef = useRef(null);

  const onMouseRowEnterHandler = index => {
    clearTimeout(rowTimeoutRef.current);
    rowTimeoutRef.current = setTimeout(() => {
      setHoveredRow(index);
    }, 1000);
  };

  const onMouseRowLeaveHandler = () => {
    clearTimeout(rowTimeoutRef.current);
    setHoveredRow(null);
  };

  const formatTeamName = teamName => {
    return teamName.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <Fragment>
      <div className={classes.leagueTable}>
        <Link
          href={`/tournament/${formattedName}/${formattedTitle}/${formattedCode}`}
          className={classes.titleLink}
          style={{ textDecoration: 'none' }}
        >
          <h2 className={classes.title}>
            {title}
            <img src={image} alt={image} />
          </h2>
        </Link>
        <table className={classes.table}>
          <thead className={classes.th}>
            <tr>
              <th className={classes.th}>#</th>
              <th className={classes.th}>Team</th>
              <th className={classes.th}>P</th>
              <th className={classes.th}>W</th>
              <th className={classes.th}>D</th>
              <th className={classes.th}>L</th>
              <th className={classes.th}>Goals</th>
              <th className={classes.th}>PTS</th>
            </tr>
          </thead>
          <tbody>
            {table.map((entry, index) => (
              <tr key={index} onMouseEnter={() => onMouseRowEnterHandler(index)} onMouseLeave={onMouseRowLeaveHandler}>
                <td className={classes.td}>
                  <span className={classes.position}> {entry.position}</span>
                </td>
                <td
                  className={`${classes.leagueTeamCell} ${
                    selectedClub && entry.team.id === selectedClub.id ? classes.selected : ''
                  }`}
                >
                  <div className={classes.leagueTeamContainer}>
                    <img src={entry.team.crest} alt={entry.team.crest} />
                    <Link
                      href={`/team/${formatTeamName(entry.team.name)}/${formattedCode}`}
                      className={classes.leagueTeamName}
                    >
                      {entry.team.name}
                    </Link>
                    {hoveredRow === index && <span className={classes.tooltip}>Click for team details!</span>}
                  </div>
                </td>
                <td className={classes.td}>{entry.playedGames}</td>
                <td className={classes.td}>{entry.won}</td>
                <td className={classes.td}>{entry.draw}</td>
                <td className={classes.td}>{entry.lost}</td>
                <td className={classes.td}>
                  {entry.goalsFor}:{entry.goalsAgainst}
                </td>
                <td className={classes.td}>{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default LeagueTable;

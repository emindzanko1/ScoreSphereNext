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

  const teamNameClickHandler = (teamName, event) => {
    event.stopPropagation();
    const formattedTeamName = teamName.toLowerCase().replace(/\s+/g, '-');
    <Link href={`/team/${formattedTeamName}`} />;
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
              <th>#</th>
              <th>Team</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>Goals</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            {table.map((entry, index) => (
              <tr
                key={index}
                onMouseEnter={() => onMouseRowEnterHandler(index)}
                onMouseLeave={onMouseRowLeaveHandler}
                onClick={e => teamNameClickHandler(entry.team.name, e)}
              >
                <td>
                  <span className={classes.position}> {entry.position}</span>
                </td>
                <td
                  className={`league-team-cell ${selectedClub && entry.team.id === selectedClub.id ? 'selected' : ''}`}
                >
                  <div className={classes.leagueTeamContainer}>
                    <img src={entry.team.crest} alt={entry.team.crest} />
                    <span className={classes.leagueTeamName}>{entry.team.name}</span>
                    {hoveredRow === index && <span className={classes.tooltip}>Click for team details!</span>}
                  </div>
                </td>
                <td>{entry.playedGames}</td>
                <td>{entry.won}</td>
                <td>{entry.draw}</td>
                <td>{entry.lost}</td>
                <td>
                  {entry.goalsFor}:{entry.goalsAgainst}
                </td>
                <td>{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default LeagueTable;

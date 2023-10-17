import React, { useState, useRef, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Clubs from '@/pages/team/[club]';
import styles from './Table.module.css';

const Table = props => {
  const [isLoading, setIsLoading] = useState(false);

  const [table, setTable] = useState([]);

  const { name, title, code } = props;

  let formattedName, formattedTitle, formattedCode;

  if (name && title && code) {
    formattedName = name.toLowerCase().replace(/\s+/g, '-');
    formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
    formattedCode = code.toLowerCase().replace(/\s+/g, '-');
  }

  useEffect(() => {
    const fetchTable = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/league/${formattedCode}/matches`);
        // const response = await fetch('http://localhost:5000/league/PL/matches');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setTable(data.matches);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTable();
  }, []);

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const rowTimeoutRef = useRef(null);
  const teamTimeoutRef = useRef(null);

  const rowClickHandler = match => {
    setSelectedMatch(match);
  };

  const rowRef = useRef(null);

  const onMouseRowEnterHandler = index => {
    clearTimeout(rowTimeoutRef.current);
    rowTimeoutRef.current = setTimeout(() => {
      setHoveredRow(index);
      setHoveredTeam(null);
    }, 1000);
  };

  const onMouseRowLeaveHandler = () => {
    clearTimeout(rowTimeoutRef.current);
    setHoveredRow(null);
  };

  const [hoveredTeam, setHoveredTeam] = useState(null);

  const onMouseTeamEnterHandler = team => {
    clearTimeout(rowTimeoutRef.current);
    teamTimeoutRef.current = setTimeout(() => {
      setHoveredTeam(team);
      setHoveredRow(null);
    }, 500);
  };

  const onMouseTeamLeaveHandler = () => {
    clearTimeout(teamTimeoutRef.current);
    setHoveredTeam(null);
    if (rowRef.current) {
      rowRef.current.dispatchEvent(new MouseEvent('mouseenter'));
    }
  };

  const formatTeamName = teamName => {
   return teamName.toLowerCase().replace(/\s+/g, '-');
  };


  const formatMatchDate = utcDate => {
    const date = new Date(utcDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}. ${hours}:${minutes}`;
  };

  const formatMatchTime = match => {
    if (match.status === 'IN_PLAY') {
      const startTime = new Date(match.utcDate);
      const currentTime = new Date();
      const timeDifference = currentTime - startTime;
      const elapsedMinutes = Math.floor(timeDifference / 60000);
      return `${elapsedMinutes > 90 ? '90+' : elapsedMinutes}'`;
    } else if (match.status === 'FINISHED') {
      return 'Finished';
    } else {
      const date = new Date(match.utcDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}.${month}. ${hours}:${minutes}`;
    }
  };

  return (
    <Fragment>
      <div key={props.id} className={styles.table}>
        <h2 className={styles.title}>
          {title}
          <img src={props.image} alt={props.image} className={styles.titleImg} />
        </h2>
        <table className={styles.tbl}>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {table &&
              table.map((match, index) => (
                <tr
                  key={match.id}
                  ref={rowRef}
                  onClick={() => rowClickHandler(match)}
                  className={`${styles.clickableRow} ${hoveredRow === index ? styles.hovered : ''}`}
                  onMouseEnter={() => onMouseRowEnterHandler(index)}
                  onMouseLeave={onMouseRowLeaveHandler}
                >
                  <td className={styles.dateTimeCell}>{formatMatchTime(match)}</td>
                  <td className={styles.teamCell}>
                    <div
                      className={styles.teamContainer}
                      onMouseEnter={() => onMouseTeamEnterHandler(match.homeTeam)}
                      onMouseLeave={onMouseTeamLeaveHandler}
                      // onClick={e => teamNameClickHandler(match.homeTeam.shortName, e)}
                    >
                      <img src={match.homeTeam.crest} alt={match.homeTeam.crest} className={styles.teamContainerImg} />
                      <Link className={styles.teamName} href={`/team/${formatTeamName(match.homeTeam.shortName)}`}>{match.homeTeam.shortName}</Link>
                      {hoveredTeam === match.homeTeam ? (
                        <span className={styles.tooltip}>Click for team details!</span>
                      ) : (
                        hoveredRow === index && <span className={styles.tooltip}>Click for match details!</span>
                      )}
                    </div>
                  </td>
                  <td className={styles.teamCell}>
                    <div
                      className={styles.teamContainer}
                      onMouseEnter={() => onMouseTeamEnterHandler(match.awayTeam)}
                      onMouseLeave={onMouseTeamLeaveHandler}
                      // onClick={e => teamNameClickHandler(match.awayTeam.shortName, e)}
                    >
                      <img src={match.awayTeam.crest} alt={match.awayTeam.crest} className={styles.teamContainerImg} />
                      <Link className={styles.teamName}  href={`/team/${formatTeamName(match.awayTeam.shortName)}`}>{match.awayTeam.shortName}</Link>
                      {hoveredTeam === match.awayTeam && (
                        <span className={styles.tooltip}>Click for team details!</span>
                      )}
                    </div>
                  </td>
                  <td className={styles.results}>{`${match.score.fullTime.home ?? '-'}:${
                    match.score.fullTime.away ?? '-'
                  }`}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Table;

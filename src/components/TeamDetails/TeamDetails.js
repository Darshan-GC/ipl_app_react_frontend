import '../TeamDetails/TeamDetails.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TeamDetails = () => {
  const [teamData, setTeamData] = useState();
  const [loader, setLoader] = useState(1);
  const [loader1, setLoader1] = useState(1);
  const [playersData, setPlayersData] = useState([]);

  const playerReader = (e) => {
    sessionStorage.setItem('Player', e.target.id);
  };
  useEffect(() => {
    var DataStorage =
      sessionStorage.getItem('ID') === null ? '' : sessionStorage.getItem('ID');
    axios
      .get(`https://ipl2021-server.herokuapp.com/teams/${DataStorage}`)
      .then(function (response) {
        if (response.data.length > 0) {
          setTeamData(response.data);
          setLoader(0);
        }
      });
    axios
      .get(`https://ipl2021-server.herokuapp.com/teamPlayers/${DataStorage}`)
      .then(function (response) {
        if (response.data.length > 0) {
          setPlayersData(response.data);
          setLoader1(0);
        }
      });
  }, []);
  return (
    <section id="team_Details">
      {loader ? (
        <div id="loader1">
          {' '}
          <i class="fas fa-cog fa-spin"></i>
        </div>
      ) : (
        <div id="info_wrap">
          <img src={teamData[0].image} alt="logo" width="200px" />
          <div id="info">
            <p>
              <span>{teamData[0].name}</span>
            </p>
            <p>
              <span>Total {teamData[0].playerCount} players</span>
            </p>
            <p>
              <span>Top Batsman:</span> {teamData[0].topBatsman}
            </p>
            <p>
              <span>Top Bowler:</span> {teamData[0].topBowler}
            </p>
          </div>
        </div>
      )}
      <h1 id="heading">PLAYERS</h1>
      <div id="teamDetails_wrap">
        {loader1 ? (
          <h1 id="loading_Players_Data">Loading Players Data...</h1>
        ) : (
          playersData.map((item, index) => {
            return (
              <div
                className="player_card"
                key={index}
                id={item.playerName}
                onClick={(e) => playerReader(e)}
              >
                <Link
                  to="/playerDetails"
                  style={{ textDecoration: 'none', color: '#194491' }}
                >
                  <img
                    src={item.image}
                    alt="playerPic"
                    width="100%"
                    id={item.playerName}
                  />
                  <div className="player_info" id={item.playerName}>
                    <h4 id={item.playerName}>{item.playerName}</h4>
                    <p id={item.playerName}>
                      <span id={item.playerName}>Team: </span>
                      {item.team}
                    </p>
                    <p id={item.playerName}>
                      <span id={item.playerName}>Price: </span>
                      {item.price}
                    </p>
                    <p id={item.playerName}>
                      <span id={item.playerName}>Status: </span>
                      {item.status}
                    </p>
                    <p id={item.playerName}>
                      <span id={item.playerName}>Role: </span>
                      {item.Role}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default TeamDetails;

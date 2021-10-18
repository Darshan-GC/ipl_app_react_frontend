import '../PlayerDetails/playerDetails.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
const PlayerDetails = () => {
  const [playerInfo, setPlayerInfo] = useState('');
  const [loader2, setLoader2] = useState(1);
  useEffect(() => {
    var DataStorage =
      sessionStorage.getItem('Player') === null
        ? ''
        : sessionStorage.getItem('Player');

    axios
      .get(`https://ipl2021-server.herokuapp.com/player/${DataStorage}`)
      .then(function (response) {
        if (response.data.length > 0) {
          setPlayerInfo(response.data);
          setLoader2(0);
        }
      });
  }, []);
  return (
    <div id="playerDetails_wrap">
      {loader2 ? (
        <div id="loader1">
          {' '}
          <i class="fas fa-cog fa-spin"></i>
        </div>
      ) : (
        <div id="player_wrap">
          <img src={playerInfo[0].image} alt="logo" width="200px" />
          <div id="player_info">
            <h2>{playerInfo[0].playerName}</h2>
            <p>
              <span>Team: </span> {playerInfo[0].team}
            </p>
            <p>
              <span>Playing for: </span> {playerInfo[0].playingFor}
            </p>
            <p>
              <span>Price: </span> {playerInfo[0].price}
            </p>
            <p>
              <span>Status: </span> {playerInfo[0].status}
            </p>
            <p>
              <span>Role: </span> {playerInfo[0].Role}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerDetails;

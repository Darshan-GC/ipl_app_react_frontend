import '../HomePage/home.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import React from 'react';

const HomePage = (props) => {
  const [teamData, setTeamData] = useState([]);
  const [loader, setLoader] = useState(1);
  const [Sloader, setSLoader] = useState(1);
  const [searchData, setSearchData] = useState('');
  const [searchD, setSearchD] = useState('');

  const playerReader = (e) => {
    sessionStorage.setItem('Player', e.target.id);
  };

  const search = (e) => {
    // setSearchData(e.target.value.toUpperCase());
    sessionStorage.setItem('Search', e.target.value.toUpperCase());
    setSearchD(e.target.value.toUpperCase());
  };
  const teamDetails = (e) => {
    sessionStorage.setItem('ID', e.target.id);
  };

  const sendData = () => {
    var DataStorage =
      sessionStorage.getItem('Search') === null
        ? ''
        : sessionStorage.getItem('Search');
    axios
      .get(`https://ipl2021-server.herokuapp.com/teamPlayers/${DataStorage}`)
      .then(function (response) {
        if (response.data.length > 0) {
          setSearchData(response.data);
          setSLoader(0);
        }
      });
  };
  useEffect(() => {
    axios
      .get(`https://ipl2021-server.herokuapp.com/teams`)
      .then(function (response) {
        if (response.data.length > 0) {
          setTeamData(response.data);
          setLoader(0);
        }
      });
  }, []);
  return (
    <section id="body_section">
      <div id="search">
        <input
          type="text"
          placeholder="Search"
          autoFocus
          value={searchD}
          onChange={(e) => search(e)}
        />
        <button onClick={sendData}>
          <i class="fas fa-search"></i>
        </button>
      </div>
      {Sloader ? (
        ''
      ) : (
        <section id="search_data_wrap">
          <h1 id="heading1">PLAYERS</h1>
          {searchData.map((item, index) => {
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
          })}
        </section>
      )}
      <section id="teams_card_wrap">
        {loader ? (
          <div id="loader">
            {' '}
            <i class="fas fa-cog fa-spin"></i>
          </div>
        ) : (
          teamData.map((item, index) => {
            return (
              <div
                className="card"
                id={item.code}
                key={index}
                onClick={(e) => teamDetails(e)}
              >
                <Link to="/teamDetails">
                  <img
                    src={item.image}
                    alt="logo"
                    width="100%"
                    id={item.code}
                  />
                  <p id={item.code}>{item.name}</p>
                </Link>
              </div>
            );
          })
        )}
      </section>
    </section>
  );
};

export default HomePage;

import logo from '../../Utiles/ipllogo.jpg';
import '../Topbar/topbar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const Topbar = () => {
  const [load, setLoad] = useState(0);

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [playerCountry, setPlayerCountry] = useState('');
  const [iplTeam, setIplTeam] = useState('');
  const [price, setPrice] = useState('₹');
  const [status, setStatus] = useState('');
  const [Role, setRole] = useState('');
  const [image, setImage] = useState('');

  const addUser = () => {
    setLoad(!load);
  };

  const sendPlayer = (e) => {
    e.preventDefault();
    var data = {
      userData: {
        code: code,
      },
      playerData: {
        playerName: name,
        team: playerCountry,
        playingFor: iplTeam,
        price: price,
        status: status,
        Role: Role,
        image: image,
      },
    };

    console.log(data);

    axios.post(`https://ipl2021-server.herokuapp.com/addPlayer`, data);
    // .then(alert('Player Added'));

    setCode('');
    setName('');
    setImage('');
    setIplTeam('');
    setPlayerCountry('');
    setPrice('₹');
    setRole('');
    setStatus('');
  };
  return (
    <div id="topbar">
      <div id="logo">
        <img src={logo} alt="logo" id="logo" />
        <h1>IPL 2021</h1>
      </div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <p>HOME</p>
      </Link>
      <button onClick={addUser}>Add Players</button>
      {load ? (
        <div id="user">
          <form id="form">
            <div>
              <input
                type="password"
                placeholder="Unique Code"
                required
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </div>
            <h3>Player Details</h3>
            <div>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Player Country"
                required
                value={playerCountry}
                onChange={(event) => setPlayerCountry(event.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="IPL Team"
                required
                value={iplTeam}
                onChange={(event) =>
                  setIplTeam(event.target.value.toUpperCase())
                }
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Price"
                required
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Status"
                required
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Role"
                required
                value={Role}
                onChange={(event) => setRole(event.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Image Link"
                required
                value={image}
                onChange={(event) => setImage(event.target.value)}
              />
            </div>
            <button
              type="submit"
              onClick={
                !name ||
                !code ||
                !playerCountry ||
                !iplTeam ||
                !price ||
                !status ||
                !Role ||
                !image
                  ? (event) => event.preventDefault()
                  : (event) => sendPlayer(event)
              }
            >
              Add Player
            </button>
          </form>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Topbar;

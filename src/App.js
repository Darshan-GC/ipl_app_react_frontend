import './App.css';
import Topbar from './components/Topbar/topbar';
import HomePage from './components/HomePage/home';
import TeamDetails from './components/TeamDetails/TeamDetails';
import PlayerDetails from './components/PlayerDetails/playerDetails';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Topbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/teamDetails" component={TeamDetails} />
          <Route path="/playerDetails" component={PlayerDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

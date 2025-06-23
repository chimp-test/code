import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import GamePage from './game';
import HomePage from './home';
import CongratsPage from './congrats';
import DifficultyPage from './difficultyPage';

import GameContext from './GameContext';


function Header() {
  const location = useLocation();
  const { round, timeLeft, chancesLeft } = React.useContext(GameContext);

  const hideInfo = location.pathname === '/congrats' || location.pathname === '/' || location.pathname === '/difficultyPage';

  return (
    <nav className="navbar custom-navbar" style={{ backgroundColor: '#29303f', padding: '10px', display: 'flex', 
    justifyContent: 'center', alignItems: 'center', position: 'relative', height: '60px' }}>
      <p style={{ color: 'white', margin: 0, position: 'absolute', left: '10px' }}>Chimp Test</p>
      {!hideInfo && (
        <div style={{ color: 'white', textAlign: 'center' }}>
          Round: {round} | Time left: {timeLeft}s | Lifes: {chancesLeft}
        </div>
      )}
    </nav>
  );
}


function App() {
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [chancesLeft, setChancesLeft] = useState(0);

  return (
    <GameContext.Provider value={{ round, setRound, timeLeft, setTimeLeft, chancesLeft, setChancesLeft }}>
      <Router>
        <div className="App">
          <Header />
          <div className="content-wrap main1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/congrats" element={<CongratsPage />} />
              <Route path="/difficultyPage" element={<DifficultyPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </GameContext.Provider>
  );
}

export default App;

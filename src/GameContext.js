import { createContext } from 'react';

const GameContext = createContext({
  round: 1,
  setRound: () => {},
  timeLeft: 0,
  setTimeLeft: () => {},
  chancesLeft: 0,
  setChancesLeft: () => {},
});

export default GameContext;

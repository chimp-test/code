import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import { useNavigate, useLocation  } from 'react-router-dom';


import GameContext from './GameContext'; 

const GRID_COL = 12;
const GRID_ROW = 6;
const SHOWCASE_DURATION_MS = 2000;
const INITIAL_VISIBLE = 3;

function GamePage() {
  const [visibleCells, setVisibleCells] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [isShowcaseOver, setIsShowcaseOver] = useState(false);
  const [difficulty, setDifficulty] = useState(INITIAL_VISIBLE);
  const navigate = useNavigate();
const { setRound, setTimeLeft, chancesLeft, setChancesLeft } = useContext(GameContext);

const location = useLocation();
const {
  showcaseTime = 2000, // default 2 sec if no state passed
  chances: maxChances = 1,
  symbolMode = 'numbers' // fallback to numbers if not provided
} = location.state || {};

const SHOWCASE_DURATION_MS = showcaseTime;

  // Initialize grid for current difficulty
  const generateGrid = (numVisible) => {
  const cells = new Set();
  while (cells.size < numVisible) {
    const randRow = Math.floor(Math.random() * GRID_ROW);
    const randCol = Math.floor(Math.random() * GRID_COL);
    cells.add(`${randRow},${randCol}`);
  }

  const visible = Array.from(cells).map((str, index) => {
    const [row, col] = str.split(',').map(Number);
    const number = index + 1;
    let label = number;
    if (symbolMode === 'letters') {
      label = String.fromCharCode(65 + index); // A, B, C, ...
    }
    return { row, col, number, label, visible: true };
  });

  setVisibleCells(visible);
  setNextNumber(1);
  setIsShowcaseOver(false);

  const timer = setTimeout(() => {
    setIsShowcaseOver(true);
    setTimeLeft(0);
  }, SHOWCASE_DURATION_MS);

  return () => clearTimeout(timer);
};


  // Initialize when page loads or difficulty changes
  useEffect(() => {
    setRound(difficulty);
    const cleanup = generateGrid(difficulty);
    return cleanup;
  }, [difficulty]);

  useEffect(() => {
    setChancesLeft(maxChances); // maxChances comes from difficulty settings (location.state)
  }, [maxChances, setChancesLeft]);

  useEffect(() => {
  if (isShowcaseOver) return;



  const totalTime = SHOWCASE_DURATION_MS;
  const startTime = Date.now();

  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max((totalTime - elapsed) / 1000, 0);
    setTimeLeft(remaining.toFixed(1)); 

    if (remaining <= 0) {
      clearInterval(interval);
    }
  }, 10); 

  return () => clearInterval(interval);
}, [difficulty, isShowcaseOver]);


  const handleClick = (row, col) => {
  if (!isShowcaseOver) return;

  const cell = visibleCells.find(
    (cell) => cell.row === row && cell.col === col
  );

  if (!cell || !cell.visible) return;

  // Compare with nextNumber (game logic uses number)
  if (cell.number === nextNumber) {
    // Correct click: hide this cell
    const updatedCells = visibleCells.map((c) =>
      c.row === row && c.col === col ? { ...c, visible: false } : c
    );
    setVisibleCells(updatedCells);

    const newNext = nextNumber + 1;
    setNextNumber(newNext);

    // Check if round completed
    if (newNext > difficulty) {
      setTimeout(() => {
        setDifficulty((prev) => prev + 1);
      }, 300); // short delay before next round
    }
  } else {
    // Wrong click
    if (chancesLeft <= 1) {
      // No lives left, go to congrats page with round info
      navigate('/congrats', { state: { round: difficulty } });
    } else {
      // Lives left: lose one, reset grid for same difficulty
      setChancesLeft(chancesLeft - 1);
      generateGrid(difficulty); // regenerate grid for same round
    }
  }
};



  const isVisible = (r, c) =>
    visibleCells.find((cell) => cell.row === r && cell.col === c && cell.visible);

  const getCellNumber = (r, c) => {
  const cell = visibleCells.find((cell) => cell.row === r && cell.col === c);
  if (!cell || !cell.visible) return null;
  return isShowcaseOver ? '' : cell.label;
};


  return (
    <div className="grid-container">
      <div className="grid">
        {Array.from({ length: GRID_ROW }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {Array.from({ length: GRID_COL }).map((_, colIndex) => {
              const visibleCell = isVisible(rowIndex, colIndex);
              const number = getCellNumber(rowIndex, colIndex);

              return (
                <div
                  key={colIndex}
                  className={`grid-cell ${
                    visibleCell ? 'chimp-box' + (!isShowcaseOver ? ' disabled' : '') : 'hidden-cell'
                  }`}
                  onClick={() => handleClick(rowIndex, colIndex)}
                >
                  {visibleCell ? number : ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamePage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const difficultySettings = {
  easy: { showcaseTime: 2500, chances: 3 },
  medium: { showcaseTime: 2000, chances: 2 },
  hard: { showcaseTime: 1000, chances: 1 },
};

export default function DifficultyPage() {
  const navigate = useNavigate();
  const [symbolMode, setSymbolMode] = useState('numbers'); 
  const [difficulty, setDifficulty] = useState('easy');     

  const handlePlay = () => {
    const settings = difficultySettings[difficulty];
    navigate('/game', {
      state: {
        ...settings,
        symbolMode,
      },
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#12121a',
        color: 'white',
        padding: '4rem 1rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>Settings</h1>
      
      <h2 style={{ marginBottom: '1.5rem'}}>Select Difficulty</h2>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '3rem' }}>
        {['easy', 'medium', 'hard'].map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            style={{
              backgroundColor: difficulty === level ? '#4caf50' : '#2196f3',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 4,
              cursor: 'pointer',
              minWidth: '100px',
            }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      <h3>Symbol Type</h3>
      <select
        value={symbolMode}
        onChange={(e) => setSymbolMode(e.target.value)}
        style={{ fontSize: '16px', padding: '8px 12px', borderRadius: 4 }}
      >
        <option value="numbers">Numbers (1, 2, 3...)</option>
        <option value="letters">Letters (A, B, C...)</option>
      </select>

      <button
        onClick={handlePlay}
        style={{
          marginTop: '3rem',
          backgroundColor: '#f57c00',
          color: 'white',
          border: 'none',
          padding: '12px 30px',
          fontSize: '18px',
          borderRadius: 6,
          cursor: 'pointer',
        }}
      >
        Play
      </button>
    </div>
  );
}

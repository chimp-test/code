import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function CongratsPage() {
  const location = useLocation();
  const round = location.state?.round ?? 1;

  return (
    <div className="homepage">
      <h1 className="congrats-title">🎉 Congrats! 🎉</h1>
      <p className="congrats-subtitle">You reached round <span className="round-number">{round}</span></p>

      <div className="congrats-buttons">
        <Link to="/difficultyPage" className="start-button">
        Play Again
      </Link>
            </div>
    </div>
  );
}

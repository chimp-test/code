import React from "react";
import { Link } from 'react-router-dom';
import './App.css';

function HomePage() {
  return (
    <div
      className="container homepage"
    >
      <h1 className="title" style={{paddingBottom:80, paddingTop:0}}>Are You Smarter Than a Chimp?</h1>

      <p className="description">
        In a surprising cognitive challenge, chimpanzees consistently outperform humans.
        Some chimps could remember up to <strong>9 digits</strong> with over <strong>90% accuracy</strong>.
        Think you can beat them?
      </p>

      <Link to="/difficultyPage" className="start-button">
        Start the Test
      </Link>
    </div>
  );
}

export default HomePage;

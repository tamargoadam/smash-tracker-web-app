import React from 'react';
import shine from './assets/shine.png';
import falco from './assets/falco.png'
import fox from './assets/fox.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
          <div className="col">
            <img src={falco} className="Character-image" />
          </div>
          <div className="col">
            <img src={shine} className="App-logo" alt="logo" />
          </div>
          <div className="col">
            <img src={fox} className="Character-image" />
          </div>
        </div>
        <p>
          Welcome to Smash Tracker!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Login here to track your play
        </a>
      </header>
    </div>
  );
}

export default App;

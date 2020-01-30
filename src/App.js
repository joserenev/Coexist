import React from 'react';
import logo from './logo.svg';
import './App.css';

import {withAuthenticator} from 'aws-amplify-react'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Welcome to Coexist!
        </h2>
        <h4>
        Development in progress
        </h4>
      </header>
    </div>
  );
}

export default App;

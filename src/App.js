import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Spotify Clone</h1>
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;

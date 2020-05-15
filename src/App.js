import React from 'react';
import './App.css';
import 'typeface-roboto'
import Routes from './routes'
import Toolbar from './Toolbar.js'
import MainPage from './Paginas/Principal.js'

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Routes />
    </div>

  );
}

export default App;


// React.fragment
//usar draw para telas laterais
//react router dom
//export no index.js
//rocketseat tutoriais
//inputArea

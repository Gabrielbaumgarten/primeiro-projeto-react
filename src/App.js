import React from 'react';
import './App.css';
import 'typeface-roboto'
import Routes from './routes'
import Toolbar from './Toolbar.js'

/* 
  Função que representa a página,
  Aqui o ReactJs chamará todos os componentes para renderiza-los na tela.

  Cada página é um arquivo JS externo que é chamado pela tag Routes
*/
function App() {
  return (
    <div className="App">
      <Toolbar />
      <Routes />
    </div>

  );
}

export default App;

//react router dom
//export no index.js
//rocketseat tutoriais
//inputArea

import React from 'react';
import { useState } from 'react';
import './App.css';
import 'typeface-roboto'
import Routes from './routes'
import Toolbar from './Toolbar.js'
import Lina from './assets/VideoLina.mp4'
import GIFLina from './assets/GIFLinaFundoBranco.gif'

/* 
  Função que representa a página,
  Aqui o ReactJs chamará todos os componentes para renderiza-los na tela.

  Cada página é um arquivo JS externo que é chamado pela tag Routes
*/
function App() {
  const [playVideo,setPlay] = React.useState(false);

  React.useEffect(() => {
          const time = setTimeout(() => {setPlay(false)}, 6025);
          return () => clearTimeout(time);
      });
    

  if(playVideo){
    return(
      <div>
        {/* <video width="100%" height="100%" autoPlay='true'>
          <source src={Lina} type="video/mp4"/>
        </video> */}
        <img src={GIFLina} alt="" className='Animacao' />
        <Toolbar />
        <Routes />
      </div>
    );
  }
  else{
  return (
    <div className="App">
    {/* <img src={GIFLina} alt=""  /> */}
      <Toolbar />
      <Routes />
    </div>

  );
  }
}

export default App;

// TODO: Estudar isso
// Pedir ajuda para ajustar os panes quando eles ultrapassarem a div
// Verificar a necessidade do adicionar mais arquivos no dividir
// Ver qual versão do dividir eles preferem
// deixar as páginas responsívas para celular
// continuar a repadronização dos das páginas
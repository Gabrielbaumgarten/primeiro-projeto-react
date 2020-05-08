import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'typeface-roboto'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AllInclusiveSharpIcon from '@material-ui/icons/AllInclusiveSharp';
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'


function Logo(props) {
  return(
      <img src="ilovepdf.svg" className="Logo" />
  )
}

function App() {
  return (
    <div className="App">
      <div className='Toolbar'>
          <Logo />
          <Typography variant="button" align="center" className="MenuText">
            JUNTAR PDF
          </Typography>
          <Typography variant="button" align="center" className="MenuText">
            DIVIDIR PDF
          </Typography>
          <Typography variant="button" align="center" className="MenuText">
            COMPRIMIR PDF
          </Typography>
          <Typography variant="button" align="center" className="MenuText">
            CONVERTER PDF
          </Typography>
          <Typography variant="button" align="center" className="MenuText">
            TODAS AS FERRAMENTAS PDF
          </Typography>
          <MenuIcon className="MenuIcon" style={{fontSize:30}}/>
      </div>


    </div>

  );
}

export default App;

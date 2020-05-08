import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'typeface-roboto'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'


function Logo(props) {
  return(
      <img src="ilovepdf.svg" className="Logo" />
  )
}

function BotaoMenu(props) {
  return(
    <Button>
      <Typography variant="button" align="center" className="MenuText">
        {props.conteudo}
      </Typography>
    </Button>
  )
}

function App() {
  return (
    <div className="App">
      <div className='Toolbar'>
          <Logo />
          <BotaoMenu conteudo='JUNTAR PDF' />
          <BotaoMenu conteudo='DIVIDIR PDF' />
          <BotaoMenu conteudo='COMPRIMIR PDF' />
          <BotaoMenu conteudo='CONVERTER PDF' />
          <BotaoMenu conteudo='TODAS AS FERRAMENTAS PDF' />
          <MenuIcon className="MenuIcon" style={{fontSize:30}}/>
      </div>
      <div>
        <Typography variant='h3' align='center' className="Titulo">
          Ferramenta online para amantes de PDF
        </Typography>
        <Typography variant='h5'align='center' className='Subtitulo'>
        Ferramenta online e completamente gratuita para juntar PDF,
         dividir PDF, comprimir PDF,<br /> converter documentos Office para PDF,
          conversão de PDF para JPG, e JPG para PDF.<br/> Não requer instalação.
        </Typography>
        <Container className="ContainerPrincipal">
          <div>
            <BotaoMenu conteudo="JUNTAR PDF" />
          </div>
          <div>
            2
          </div>
          <div>
            3
          </div>
        </Container>
      </div>

    </div>

  );
}

export default App;

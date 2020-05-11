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
import CallMergeRoundedIcon from '@material-ui/icons/CallMergeRounded';
import CallSplitRoundedIcon from '@material-ui/icons/CallSplitRounded';
import CompareArrowsRoundedIcon from '@material-ui/icons/CompareArrowsRounded';


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

function BotaoMenuPrincipal(props) {
  return(
    <Button>
      <div className='BotaoMenuPrincipal'>
        <SelectIcon icon={props.icon} />
        <br/>
        <br/>
        <br/>
        <Typography variant="subtitle2" align='left'>
          {props.conteudo}
          </Typography>
          <br/>
          <Typography variant="body2" align='left' className='DescricaoMenuPrincipal'>
            {props.descricao}
            </Typography>
      </div>
    </Button>
  )
}

function SelectIcon(props) {
  var icon
  switch (props.icon) {
    case "JUNTAR":
      icon = <CallMergeRoundedIcon fontSize='large' className="IconMenuPrincipal"/>
      break;
    case "DIVIDIR":
      icon = <CallSplitRoundedIcon fontSize='large' className="IconMenuPrincipal"/>
      break;
    case "COMPRIMIR":
      icon = <CompareArrowsRoundedIcon fontSize='large' className="IconMenuPrincipalComprimir"/>
      break;
    default:  icon= null;
  }
  return icon;
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
            <BotaoMenuPrincipal conteudo="JUNTAR PDF"
            descricao="Mesclar e juntar PDFs e colocá-los em qualquer ordem que desejar. É tudo muito fácil e rápido"
            icon='JUNTAR' />
            <BotaoMenuPrincipal conteudo="DIVIDIR PDF"
            descricao="Selecione um intervalo de páginas, separe uma página, ou converta cada página do documento em um arquivo PDF independente."
            icon='DIVIDIR'  />
            <BotaoMenuPrincipal conteudo="COMPRIMIR PDF"
            descricao="Diminua o tamanho do seu arquivo PDF, mantendo a melhor qualidade possível. Otimize seus arquivos PDF."
            icon='COMPRIMIR'  />
        </Container>
      </div>

    </div>

  );
}

export default App;

// AspectRatio/CompareArrows
// CallMerge/NoteAdd
// CallSplit

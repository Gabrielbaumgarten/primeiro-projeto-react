import React from 'react';
import './App.css';
import 'typeface-roboto'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import Container from '@material-ui/core/Container'
import CallMergeRoundedIcon from '@material-ui/icons/CallMergeRounded';
import CallSplitRoundedIcon from '@material-ui/icons/CallSplitRounded';
import CompareArrowsRoundedIcon from '@material-ui/icons/CompareArrowsRounded';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FindInPageRoundedIcon from '@material-ui/icons/FindInPageRounded';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
import PictureAsPdfRoundedIcon from '@material-ui/icons/PictureAsPdfRounded';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';


function Logo(props) {
  return(
      <img src="ilovepdf.svg" className="Logo" />
  )
}

class BotaoAllMenuToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      conteudo: props.conteudo,
      submenuOpen: false,
    }
  }

  mouseOut() {
    this.setState({
      conteudo: "hello",
      submenuOpen: false,
    });
  }

  mouseOver() {
    this.setState({
      conteudo: "world",
      submenuOpen: true,
    });
  }

  render(){
      return(
        // <div className="MenuText">
        <Button onMouseOut={() => this.mouseOut()} onMouseOver={() => this.mouseOver()} onClick={function() { alert('click'); }}>
          <Typography variant="button" align="center" className="MenuText">
          {this.state.conteudo}
          </Typography>
          <ArrowDropDownIcon className='IconDropdown'/>
        </Button>
        // 1
        // </div>
      )
    }
}



function BotaoMenuToolbar(props) {
  return(
    <Button onClick={function() { alert('click'); }}>
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
      icon = <CallMergeRoundedIcon fontSize='large' className="IconMenuPrincipalRotate90"/>
      break;
    case "DIVIDIR":
      icon = <CallSplitRoundedIcon fontSize='large' className="IconMenuPrincipalRotate90"/>
      break;
    case "COMPRIMIR":
      icon = <CompareArrowsRoundedIcon fontSize='large' className="IconMenuPrincipal"/>
      break;
    case "OCR":
      icon = <FindInPageRoundedIcon fontSize="large" className='IconMenuPrincipal'/>
      break;
    case "PDJtoJPG":
      icon = (
        <React.Fragment>
        <PictureAsPdfRoundedIcon fontSize="large" className='IconMenuPrincipalConverter'/>
        <ArrowRightAltRoundedIcon fontSize="large" className='IconMenuPrincipalConverter'/>
        <PhotoLibraryRoundedIcon fontSize="large" className='IconMenuPrincipalConverter'/>
        </React.Fragment>
      )
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
          <BotaoMenuToolbar conteudo='JUNTAR PDF' />
          <BotaoMenuToolbar conteudo='DIVIDIR PDF' />
          <BotaoMenuToolbar conteudo='COMPRIMIR PDF' />
          <BotaoMenuToolbar conteudo='CONVERTER PDF' />
          <BotaoAllMenuToolbar conteudo='TODAS AS FERRAMENTAS PDF' />
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
            <BotaoMenuPrincipal conteudo="PDF PARA JPG"
            descricao="Extraia todas as imagens contidas em um arquivo PDF ou converta cada página em um arquivo JPG."
            icon='PDJtoJPG'  />
            <BotaoMenuPrincipal conteudo="PESQUISAR NO PDF"
            descricao="Torne o PDF um arquivo pesquisável para encontrar mais facilmente as palavras chaves."
            icon='OCR'  />
        </Container>
      </div>
    </div>

  );
}

export default App;


// React.fragment
// pdf para jpg/ pesquisar no pdf
//usar draw para telas laterais
//react router dom
//export no index.js
//rocketseat tutoriais

// BurstMode/Image/KeyboardTab/PictureAsPdf/TrendingFlat

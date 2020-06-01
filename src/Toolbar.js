import React from 'react';
import './App.css';
import './Toolbar.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


function Logo(props) {
  return(
    <a href='/'>
      <img src="ilovepdf.svg" className="Logo" />
    </a>
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
    <Button href={props.url}>
    <Typography variant="button" align="center" className="MenuText">
    {props.conteudo}
    </Typography>
    </Button>
  )
}


const Toolbar = () => (
      <div className='Toolbar'>
          <Logo />
          <BotaoMenuToolbar conteudo='JUNTAR PDF' url='/JuntarPDF' />
          <BotaoMenuToolbar conteudo='DIVIDIR PDF' url='/DividirPDF' />
          <BotaoMenuToolbar conteudo='COMPRIMIR PDF' url='/ComprimirPDF' />
          <BotaoMenuToolbar conteudo='CONVERTER PDF' url='' />
          <BotaoAllMenuToolbar conteudo='TODAS AS FERRAMENTAS PDF' />
          <MenuIcon className="MenuIcon" style={{fontSize:30}}/>
      </div>
);

export default Toolbar;

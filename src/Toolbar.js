import React from 'react';
import './App.css';
import './Toolbar.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ILovePdf from './assets/ilovepdf.svg'
import GIFLina from './assets/GIFLina(2).gif'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  Menu: {
    width: '100%',
    marginTop: '9.6vh',
    boxShadow: '0px 0px 3px 0px #9E9E9E',
  }
}));

function Logo(props) {
  return(
    <a href='/'>
      {/* <img src={ILovePdf} className="Logo" /> */}
      <img src={GIFLina} className="Logo" />
    </a>
  )
}

class BotaoAllMenuToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      conteudo: props.conteudo,
      submenuOpen: false,
      anchorEl: null,
    }
    this.mouseOut = this.mouseOut.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick (event) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };

  mouseOut() {
    this.setState({
    });
  }

  mouseOver(event) {
    this.setState({
      submenuOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  render(){
    return(
        <React.Fragment>
          <Button onMouseOut={this.mouseOut} onMouseOver={this.mouseOver} onClick={this.handleClick}>
            <Typography variant="button" align="center" className="MenuText">
              {this.state.conteudo}
            </Typography>
            <ArrowDropDownIcon className='IconDropdown'/>
          </Button>
          <Menu anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} variant='menu'
             onClose={this.handleClose} >
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
            <MenuItem onClick={this.handleClose}>My account</MenuItem>
            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          </Menu>
      </React.Fragment>
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

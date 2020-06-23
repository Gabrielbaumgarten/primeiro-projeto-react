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
import { useState } from 'react';
import Hidden from '@material-ui/core/Hidden'

import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import CallMergeRoundedIcon from '@material-ui/icons/CallMergeRounded';
import CallSplitRoundedIcon from '@material-ui/icons/CallSplitRounded';
import CompareArrowsRoundedIcon from '@material-ui/icons/CompareArrowsRounded';
import FindInPageRoundedIcon from '@material-ui/icons/FindInPageRounded';
import PictureAsPdfRoundedIcon from '@material-ui/icons/PictureAsPdfRounded';

const useStyles = makeStyles(theme => ({
  Menu: {
    maxWidth: '100%',
    marginTop: '9.5vh',
    boxShadow: '0px 0px 3px 0px #9E9E9E',
    borderTop: '3px solid #ce140e',
    borderBottomLeftRadius: '10px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '10px',
    borderTopRightRadius: '0px',
    position: 'initial',
    columns: 2,
  },
  MenuResposivo: {
    maxWidth: '100%',
    marginTop: '9.5vh',
    boxShadow: '0px 0px 3px 0px #9E9E9E',
    borderTop: '3px solid #ce140e',
    borderBottomLeftRadius: '10px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '10px',
    borderTopRightRadius: '0px',
    position: 'initial',
  },
}));

function Logo(props) {
  return(
    <a href='/'>
      {/* <img src={ILovePdf} className="Logo" /> */}
      <img src={GIFLina} className="Logo" />
    </a>
  )
}

const BotaoAllMenuToolbar = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);


  function handleClick (event) {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  };

  function mouseOver(event) {
    setAnchorEl(event.currentTarget);
  }

  const classes = useStyles();
  
  return(
      <React.Fragment>
        <Button onMouseOver={mouseOver} onClick={handleClick}>
          <Typography variant="button" align="center" className="MenuText">
            {props.conteudo}
          </Typography>
          <ArrowDropDownIcon className='IconDropdown'/>
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} 
            onClose={handleClose} classes={{ paper: classes.Menu }} >
          <ItensMenu icon='JUNTAR' url='/JuntarPDF' label='Juntar PDF' />
          <ItensMenu icon='DIVIDIR' url='/DividirPDF' label='Dividir PDF' />
          <ItensMenu icon='COMPRIMIR' url='/ComprimirPDF' label='Comprimir PDF' />
          <ItensMenu icon='PDJtoJPG' url='/PDFtoJPG' label='Converter PDF para JPG' />
          <ItensMenu icon='OCR' url='/PesquisarPDF' label='Pesquisar no PDF' />
        </Menu>
    </React.Fragment>
    );
    
}

const BotaoConverterToolbar = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);


  function handleClick (event) {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  };

  function mouseOver(event) {
    setAnchorEl(event.currentTarget);
  }

  const classes = useStyles();
  
  return(
      <React.Fragment>
        <Button onMouseOver={mouseOver} onClick={handleClick}>
          <Typography variant="button" align="center" className="MenuText">
            {props.conteudo}
          </Typography>
          <ArrowDropDownIcon className='IconDropdown'/>
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} 
            onClose={handleClose} classes={{ paper: classes.Menu }} >
          <ItensMenu icon='PDJtoJPG' url='/PDFtoJPG' label='Converter PDF para JPG' />
        </Menu>
    </React.Fragment>
    );
    
}
const BotaoMenuResposivo = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);


  function handleClick (event) {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  };

  function mouseOver(event) {
    setAnchorEl(event.currentTarget);
  }

  const classes = useStyles();
  
  return(
      <React.Fragment>
        <MenuRoundedIcon fontSize='Large' className='MenuIcon' onClick={handleClick} />
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} 
            onClose={handleClose} classes={{ paper: classes.MenuResposivo }} >
          <ItensMenu icon='JUNTAR' url='/JuntarPDF' label='Juntar PDF' />
          <ItensMenu icon='DIVIDIR' url='/DividirPDF' label='Dividir PDF' />
          <ItensMenu icon='COMPRIMIR' url='/ComprimirPDF' label='Comprimir PDF' />
          <ItensMenu icon='PDJtoJPG' url='/PDFtoJPG' label='Converter PDF para JPG' />
          <ItensMenu icon='OCR' url='/PesquisarPDF' label='Pesquisar no PDF' />
        </Menu>
    </React.Fragment>
    );
    
}

function ItensMenu(props){
  return(
    <MenuItem component='button' className='AjusteMenu' href={props.url}>
    <SelectIcon icon={props.icon} />
    {props.label}
    </MenuItem>
  );
}

function SelectIcon(props) {
  var icon
  switch (props.icon) {
    case "JUNTAR":
      icon = <CallMergeRoundedIcon  className="IconToolBarRotate90"/>
      break;
    case "DIVIDIR":
      icon = <CallSplitRoundedIcon  className="IconToolBarRotate90"/>
      break;
    case "COMPRIMIR":
      icon = <CompareArrowsRoundedIcon className="IconsToolBar"/>
      break;
    case "OCR":
      icon = <FindInPageRoundedIcon className='IconsToolBar'/>
      break;
    case "PDJtoJPG":
      icon = (
        <React.Fragment>
        <PictureAsPdfRoundedIcon className='IconsToolBarConverte'/>
        </React.Fragment>
      )
      break;
    default:  icon= null;
  }
  return icon;
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
          <Hidden smDown>
          <BotaoMenuToolbar conteudo='JUNTAR PDF' url='/JuntarPDF' />
          <BotaoMenuToolbar conteudo='DIVIDIR PDF' url='/DividirPDF' />
          <BotaoMenuToolbar conteudo='COMPRIMIR PDF' url='/ComprimirPDF' />
          <BotaoConverterToolbar conteudo='CONVERTER PDF' />
          <BotaoAllMenuToolbar conteudo='TODAS AS FERRAMENTAS PDF' />
          </Hidden>
          <Hidden mdUp>
            <BotaoMenuResposivo/>
          </Hidden>
      </div>
);

export default Toolbar;

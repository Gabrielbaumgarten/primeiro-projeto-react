import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"
import Drawer from '@material-ui/core/Drawer';
import { makeStyles} from "@material-ui/core/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Divider from "@material-ui/core/Divider";
import { Box } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slider from '@material-ui/core/Slider'
import Input from '@material-ui/core/Input';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField'

// icons
import CallSplitRoundedIcon from '@material-ui/icons/CallSplitRounded';
/* 
  Sobeescrevendo o style do drawer paper
  Por algum motivo de hierarquia o drawer não se altera utilizando css 
*/
const useStyles = makeStyles(theme => ({
    drawerPaper: {
      width: '35vw',
      marginTop: '9.6vh',
      height: '90.4vh',
      boxShadow: '0px 0px 3px 0px #9E9E9E',
    },
    abas : {
        fontSize: '0.72rem',
        height: 60,
    },
    selected: {
      backgroundColor: '#FA403A !important',
      color: '#FFFF !important',
    },
    nonSelected:{
      backgroundColor: '#FFF' ,
      color: '#555E69' ,
    },
  }));
  
  const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#FA403A',
        },
        secondary: {
          main: '#555E69',
        },
      },
    });
  
  /* 
    Função que retorna o painel lateral após selecionar alguns arquivos
  */
  function PainelLateral(props) {
    const classes = useStyles();
    const tamArquivo = props.data.files[0].size/1000;
  
  
    function OptionsToggleButton(props){
      if(props.option === 'all'){
        return(
          <React.Fragment>
            <Box className='TextDrawer'>
              <p>Todas as páginas selecionadas 
              desse PDF serão convertidas em <b>(Total de paginas)</b> PDFs individuais.</p>
            </Box>
          </React.Fragment>
        );
      }else{
        return(
          <React.Fragment>
            <form action="">
              <Typography variant='subtitle1' className="TextAba">Páginas para extrair:</Typography>
              <TextField label="Páginas" placeholder='exemplo: 1,5-8' type='number'
              className='TextField' margin="normal" variant="outlined"/>
            </form>
          </React.Fragment>
        );
      }
    }
  
    return(
      <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
        <h2 className='TitleDrawer'>Dividir PDF</h2>
        <Divider/>
        <ThemeProvider theme={theme}>
            <Tabs
            value={props.data.modo}
            onChange={props.mudarModo}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="secondary"
            >
            <Tab label="Dividir por intervalo" classes={{ root: classes.abas }} />
            <Tab label="Dividir por tamanho" classes={{ root: classes.abas }} />
            <Tab label="Extrair páginas" classes={{ root: classes.abas }} />
          </Tabs>
  
          <TabPanel value={props.data.modo} index={0}>
            <Typography variant='h6' className="TextAba"> Modo por intervalo</Typography>
            <Box className='TextDrawer'>
              <p>Na divisão por intervalo, o seu PDF será divido de acordo<br/>
              com o intevalo de páginas que você desejar.</p>
            </Box>
            <Typography variant='subtitle1' className="TextAba"> Defina o intervalo:</Typography>
            <div className='Intervalo'>
              <Input value={props.inicio} margin="none" onChange={props.handleInicioIntervalo}
              color="primary" startAdornment='De:' variant="outlined" 
              inputProps={{ step: 1, min: 0, max: 100, type: 'number', 'aria-labelledby': 'input-slider', }}
              className='IntervaloInput'/>
              <Input value={props.fim} margin="none" onChange={props.handleFimIntervalo}
              color="primary" startAdornment='Até:' variant="outlined"
              inputProps={{ step: 1, min: 0, max: 100, type: 'number', 'aria-labelledby': 'input-slider', }}
              className='IntervaloInput'/>
              </div>
          </TabPanel>
          <TabPanel value={props.data.modo} index={1}>
          <Typography variant='h6' className="TextAba"> Modo por tamanho</Typography>
            <Box className='TextDrawer'>
              <p>Na divisão por tamanho, o seu PDF será divido em vários<br/> arquivos PDF
              com o tamanho máximo que você desejar.</p>
            </Box>
            <Typography variant='subtitle1' className="TextAba"> Defina o tamanho máximo:</Typography>
            <Slider value={props.data.size} onChange={props.definirTamanho} max={tamArquivo}
            aria-labelledby="input-slider" valueLabelDisplay="auto" className='SliderDividirPDF'/>
            <Input value={props.data.size} margin="none" onChange={props.definirTamanhoInput}
            color="primary" endAdornment='KB' variant="outlined" className="InputSlider"
            inputProps={{ step: 10, min: 0, max: tamArquivo,
              type: 'number', 'aria-labelledby': 'input-slider', }} />
            <Box className='TextDrawer'>
              <Typography variant='button'>
                Serão divididos em {Math.ceil(tamArquivo/props.data.size)} arquivos PDF.
              </Typography>
            </Box> 
          </TabPanel>
          <TabPanel value={props.data.modo} index={2}>
          <Typography variant='h6' className="TextAba"> Modo de Extração</Typography>
            <ToggleButtonGroup value={props.data.tipoExtracao} exclusive onChange={props.mudarExtracao} className='ToggleButton' >
              <ToggleButton value="all" classes={{ root: classes.nonSelected, selected: classes.selected }}>
                <Typography>Extrair todas as páginas</Typography>
              </ToggleButton>
              <ToggleButton value="select" classes={{ root: classes.nonSelected, selected: classes.selected }}>
                <Typography>Selecionar as páginas</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
              <OptionsToggleButton option={props.data.tipoExtracao} />
          </TabPanel>
  
        </ThemeProvider>
        <Button  variant='contained' className='ButtonDrawerDividirPDF' onClick={() => {props.executar(!props.exibir)}}>
          Dividir PDF
          <CallSplitRoundedIcon fontSize='large' className="IconJuntar"/>
        </Button>
      </Drawer>
    );
    
  }
  
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  export default PainelLateral;
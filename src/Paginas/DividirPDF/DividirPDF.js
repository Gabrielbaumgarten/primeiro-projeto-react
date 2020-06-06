import React from 'react';
import './DividirPDF.css';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"
import Drawer from '@material-ui/core/Drawer';
import { makeStyles} from "@material-ui/core/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Divider from "@material-ui/core/Divider";
import { Box } from '@material-ui/core';
import TextoPrincipal from '../../Components/TextoPrincipal.js'
import BarraProgresso from '../../Components/BarraProgresso.js'
import PaineisDeArquivosDividir from '../../Components/PaineisDeArquivosDivididos/index.js'
import InputFileArea from '../../Components/InputFileArea.js'
import TelaConclusao from '../../Components/TelaConclusao.js'
import BotaoFluanteAdd from '../../Components/BotaoFlutuanteAdd.js'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slider from '@material-ui/core/Slider'
import Input from '@material-ui/core/Input';

// icons
import CallMergeRoundedIcon from '@material-ui/icons/CallMergeRounded';

/* 
  Sobeescrevendo o style do drawer paper
  Por algum motivo de hierarquia o drawer não se altera utilizando css 
*/
const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: '35w',
    marginTop: '9.6vh',
    height: '90.4vh',
    boxShadow: '0px 0px 3px 0px #9E9E9E',
  },
  abas : {
      fontSize: '0.72rem',
      height: 60,
  }
}));

const theme = createMuiTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#FA403A',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#555E69',
      },
    },
  });

/* 
  Função que retorna o painel lateral após selecionar alguns arquivos
*/
function PainelLateral(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [slideValue, setSlideValue] = React.useState(30);
  // const [inicio, setInicio] = React.useState(1);
  // const [fim, setFim] = React.useState(2);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSliderChange = (event, newValue) => {
    setSlideValue(newValue);
  };

  const handleInputChange = (event) => {
    setSlideValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  // const handleInicioIntervalo = (event) => {
  //   setInicio((event.target.value === '' ? '' : Number(event.target.value)));
  // }

  // const handleFimIntervalo = (event) => {
  //   setFim((event.target.value === '' ? '' : Number(event.target.value)));
  // }

  // TODO: Verificar a necessidade desse null
  if(props.arquivos == null){
    return(

      // Utilizando classes podemos utlizar o userStyle para sobreescrever styles já presentes do componente 
      <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
        <h2 className='TitleDrawer'>Dividir PDF</h2>
        <Divider/>
        <Box className='TextDrawer'>
          <p>Por favor, selecione mais arquivos PDF clicando novamente em 'Selecionar Arquivos PDF'.
              Selecione vários arquivos, mantendo apertado 'Ctrl'</p>
        </Box>
        <Button className='ButtonDrawerDisabledDividirPDF' variant='contained' disabled>
          Juntar PDF
          <CallMergeRoundedIcon fontSize='large' className="IconJuntar"/>
        </Button>
      </Drawer>
    );
  }
  else {
    return(
      <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
        <h2 className='TitleDrawer'>Dividir PDF</h2>
        <Divider/>
        <ThemeProvider theme={theme}>
            <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="secondary"
            >
            <Tab label="Dividir por intervalo" classes={{ root: classes.abas }} />
            <Tab label="Dividir por tamanho" classes={{ root: classes.abas }} />
            <Tab label="Extrair páginas" classes={{ root: classes.abas }} />
          </Tabs>

          <TabPanel value={value} index={0}>
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
          <TabPanel value={value} index={1}>
          <Typography variant='h6' className="TextAba"> Modo por tamanho</Typography>
            <Box className='TextDrawer'>
              <p>Na divisão por tamanho, o seu PDF será divido em vários<br/> arquivos PDF
              com o tamanho máximo que você desejar.</p>
            </Box>
            <Typography variant='subtitle1' className="TextAba"> Defina o tamanho máximo:</Typography>
            <Slider value={slideValue} onChange={handleSliderChange} aria-labelledby="input-slider"
              valueLabelDisplay="auto" className='SliderDividirPDF'/>
            <Input value={slideValue} margin="none" onChange={handleInputChange}
            onBlur={handleBlur} color="primary" endAdornment='MB' variant="outlined"
            inputProps={{ step: 10, min: 0, max: 100, type: 'number', 'aria-labelledby': 'input-slider', }}
            className="InputSlider" />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Page Three
          </TabPanel>

        </ThemeProvider>
        <Button  variant='contained' className='ButtonDrawerDividirPDF' onClick={() => {props.executar(!props.exibir)}}>
          Dividir PDF
          <CallMergeRoundedIcon fontSize='large' className="IconJuntar"/>
        </Button>
      </Drawer>
    );
  }
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
/* 
  Classe que será exportada,
  Aqui contém todos os componentes que serão renderizados na página
*/
class DividirPDFPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isUpload: false,
      isButtonMergeClick: false,
      isUploadCompleted: false, 
      fileInputDividirPDF: React.createRef(),
      data: {files: null, path: null, pdf64: [], startPage:1, endPage:5},
    };
    this.addFilesInputDividirPDF = React.createRef();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDivide = this.handleDivide.bind(this);
    this.handleUploadCompleted = this.handleUploadCompleted.bind(this);

    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleStartPage = this.handleStartPage.bind(this);
    this.handleEndPage = this.handleEndPage.bind(this);
  }

// TODO: Ajustar essa função de adicionar arquivos, verificar como o linaPDF fará isso
  handleAdd() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.addFilesInputDividirPDF.current.files);
      // TODO:Corrigir para mais de um elemento, está pegando o valor de apenas 1
      data.path = [this.addFilesInputDividirPDF.current.value];
    } else {
      const { data } = this.state;
      data.files = data.files.concat(Array.from(this.addFilesInputDividirPDF.current.files));
      // TODO: Ajustar os path em todas as páginas
      // data.path = data.path.concat([this.addFilesInputDividirPDF.current.value]);
      this.forceUpdate();
    }
  }

  handleDelete(index){
    const { data } = this.state;
    if((data.files.length - 1) != index){
     data.files[index] = data.files[data.files.length - 1];
    }
    // TODO:Ajustar isso ao corrigir o problema do path
    // delete data.path[index];  
    data.files.pop();
    this.forceUpdate()
  }
  
  handleOnChange() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.state.fileInputDividirPDF.current.files);
      // TODO:Corrigir para mais de um elemento, está pegando o valor de apenas 1
      data.path = [this.state.fileInputDividirPDF.current.value];
    }
    this.state.data.files.forEach(this.handleChangeFile);
  }

  handleDivide(){
    this.setState({
      isButtonMergeClick: true,
    })
  }
  
  handleUploadCompleted(){
    this.setState({
      isUploadCompleted: true,
    })
  }
  
  onDrop = acceptedFiles => {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = acceptedFiles;
      // TODO: Verificar como passar o path que está dentro de cada arquivo para fora
      // data.path = [this.state.fileInputDividirPDF.current.value];
    }
    this.state.data.files.forEach(this.handleChangeFile);
    this.setState({
      fileInputDividirPDF: acceptedFiles,
    });
  };


  handleFile = (e) => {
    const content = e.target.result;
    this.state.data.pdf64.push(content.split(',')[1]);

    if(this.state.data.pdf64.length === this.state.data.files.length){
        this.setState({
        isUpload: true,
      });
    }
  }

  handleChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onload = this.handleFile;
    fileData.readAsDataURL(file);
    this.forceUpdate();
  }

  handleStartPage(event) {
    const { data } = this.state;
    data.startPage = (event.target.value === '' ? '' : Number(event.target.value));
    this.forceUpdate();
  }

  handleEndPage(event) {
    const { data } = this.state;
    data.endPage = (event.target.value === '' ? '' : Number(event.target.value));
    this.forceUpdate();
  }


  render() {
    if(this.state.isUploadCompleted){
      return (
          <TelaConclusao title='Os PDFs foram divididos' modo='dividido' />
      );
    } else if(this.state.isButtonMergeClick) {
      return(
        <div className='Centralizar'>
          <BarraProgresso executar={this.handleUploadCompleted.bind(this)} exibir={this.state.isUploadCompleted} />
       </div>
      );
    } else if(this.state.isUpload) {
      return(
        <React.Fragment>
          <PaineisDeArquivosDividir arquivos={this.state.data.files} removerArquivo={this.handleDelete.bind(this)}
           pdf64={this.state.data.pdf64} inicio={this.state.data.startPage} fim={this.state.data.endPage} />
          <div className='AlinhamentoDividirPDF'>
            <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputDividirPDF} adicionarArquivos={this.handleAdd.bind(this)} />
          </div>
          <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonMergeClick} executar={this.handleDivide.bind(this)}
           inicio={this.state.data.startPage} fim={this.state.data.endPage} handleInicioIntervalo={this.handleStartPage.bind(this)}
           handleFimIntervalo={this.handleEndPage.bind(this)} />
        </React.Fragment>
      );
    } else { 
      return (
        <div>
          <TextoPrincipal title='Dividir arquivo PDF' 
              subTitle1=' Selecione um intervalo de páginas, separe uma página,divida em um tamanho específico,'
              subTitle2='ou converta cada página do documento em arquivo PDF independente.' />
           <div className='Centralizar'>
              <div>
                <InputFileArea onDrop={this.onDrop.bind(this)} />
              </div>
              <Button variant='contained'>
                <label for="files">
                  Selecionar arquivos PDF
                </label>
                <input id="files" type="file" accept='application/pdf' ref={this.state.fileInputDividirPDF} onChange={this.handleOnChange} className='Upload' multiple/>
              </Button>
          </div> 
        </div>
      );
    }
  }

}

export default DividirPDFPage;



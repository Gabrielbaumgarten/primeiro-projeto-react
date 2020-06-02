import React from 'react';
import './Css/DividirPDF.css';
import Button from "@material-ui/core/Button"
import Drawer from '@material-ui/core/Drawer';
import { makeStyles} from "@material-ui/core/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Divider from "@material-ui/core/Divider";
import { Box } from '@material-ui/core';
import TextoPrincipal from '../Components/TextoPrincipal.js'
import BarraProgresso from '../Components/BarraProgresso.js'
import PaineisDeArquivos from '../Components/PaineisDeArquivo.js'
import InputFileArea from '../Components/InputFileArea.js'
import TelaConclusao from '../Components/TelaConclusao.js'
import BotaoFluanteAdd from '../Components/BotaoFlutuanteAdd.js'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PDFViewer from 'pdf-viewer-reactjs'

// icons
import CallMergeRoundedIcon from '@material-ui/icons/CallMergeRounded';

/* 
  Sobeescrevendo o style do drawer paper
  Por algum motivo de hierarquia o drawer não se altera utilizando css 
*/
const drawerWidth = 480;
const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: drawerWidth,
    marginTop: 62,
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        </ThemeProvider>
        <Button  variant='contained' className='ButtonDrawerDividirPDF' onClick={() => {props.executar(!props.exibir)}}>
          Dividir PDF
          <CallMergeRoundedIcon fontSize='large' className="IconJuntar"/>
        </Button>
      </Drawer>
    );
  }
}


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
      data: {files: null, path: null},
    };
    this.test = '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u78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4yLjEtYzA0MyA1Mi4zNzI3MjgsIDIwMDkvMDEvMTgtMTU6MDg6MDQgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+YXBwbGljYXRpb24vcGRmPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxkYzpjcmVhdG9yPgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaT5jZGFpbHk8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L2RjOmNyZWF0b3I+CiAgICAgICAgIDxkYzp0aXRsZT4KICAgICAgICAgICAgPHJkZjpBbHQ+CiAgICAgICAgICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+VGhpcyBpcyBhIHRlc3QgUERGIGZpbGU8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QWx0PgogICAgICAgICA8L2RjOnRpdGxlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMDAtMDYtMjlUMTA6MjE6MDgrMTE6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPk1pY3Jvc29mdCBXb3JkIDguMDwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxMy0xMC0yOFQxNToyNDoxMy0wNDowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTMtMTAtMjhUMTU6MjQ6MTMtMDQ6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iPgogICAgICAgICA8cGRmOlByb2R1Y2VyPkFjcm9iYXQgRGlzdGlsbGVyIDQuMCBmb3IgV2luZG93czwvcGRmOlByb2R1Y2VyPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD51dWlkOjA4MDVlMjIxLTgwYTgtNDU5ZS1hNTIyLTYzNWVkNWMxZTJlNjwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+dXVpZDo2MmQ2YWU2ZC00M2M0LTQ3MmQtOWIyOC03YzRhZGQ4ZjllNDY8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4NCmVuZHN0cmVhbQ1lbmRvYmoNMiAwIG9iag08PC9GaWx0ZXIvRmxhdGVEZWNvZGUvRmlyc3QgNC9MZW5ndGggNDgvTiAxL1R5cGUvT2JqU3RtPj5zdHJlYW0NCmjeMlUwULCx0XfOL80rUTDU985MKY62BIoFxeqHVBak6gckpqcW29kBBBgA1ncLgA0KZW5kc3RyZWFtDWVuZG9iag0zIDAgb2JqDTw8L0ZpbHRlci9GbGF0ZURlY29kZS9GaXJzdCA0L0xlbmd0aCAxNjcvTiAxL1R5cGUvT2JqU3RtPj5zdHJlYW0NCmjePMvBCsIwEEXRX5mdDaKdxCpVSqFY3AkuBNexSelA6EAyRfx7A4qPu3znAAhNU3aLTByLwVkKb1Weo7dCPPdWfNGfDOYdzFGj0VivtV4hrn6vrK40RE48Cjw4Oqi3qMoruz/WuwxrvTeV3m2w+uJbZLcMPhZdxk8r0FMSCsFHqLYII0d40Oz4lVR5Jwm+uE+UIGdBfBK49RcYKXjVth8BBgBnZztkDQplbmRzdHJlYW0NZW5kb2JqDTQgMCBvYmoNPDwvRGVjb2RlUGFybXM8PC9Db2x1bW5zIDMvUHJlZGljdG9yIDEyPj4vRmlsdGVyL0ZsYXRlRGVjb2RlL0lEWzw0REM5MUExODc1QTZENzA3QUVDMjAzQkIwMjFDOTNBMD48RjZDOTJCMzY4QThBMTM0MDg0NTdBMUQzOTVBMzdFQjk+XS9JbmZvIDYgMCBSL0xlbmd0aCAzNy9Sb290IDggMCBSL1NpemUgNy9UeXBlL1hSZWYvV1sxIDIgMF0+PnN0cmVhbQ0KaN5iYmBgYGLkPcLEwD+ViYGhh4mBkYWJ8bEkkM0IEGAAKlkDFA0KZW5kc3RyZWFtDWVuZG9iag1zdGFydHhyZWYNCjExNg0KJSVFT0YNCg==';
    this.addFilesInputDividirPDF = React.createRef();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDivide = this.handleDivide.bind(this);
    this.handleUploadCompleted = this.handleUploadCompleted.bind(this);

    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleFile = this.handleFile.bind(this);
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
    this.setState({
      isUpload: true,
    });
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
    this.setState({
      fileInputDividirPDF: acceptedFiles,
      isUpload: true,
    });
  };


  handleFile = (e) => {
    const content = e.target.result;
    this.test = content.split(',')[1];
    // console.log('file content',  content);
    this.forceUpdate();
    // You can set content in state and show it in render.
  }
  
  handleChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onload = this.handleFile;
    fileData.readAsDataURL(file);
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
          <PaineisDeArquivos arquivos={this.state.data.files} removerArquivo={this.handleDelete.bind(this)} />
          <div className='AlinhamentoJuntarPDF'>
            <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputDividirPDF} adicionarArquivos={this.handleAdd.bind(this)} />
          </div>
          <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonMergeClick} executar={this.handleDivide.bind(this)} />
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
                <input type="file" accept="application/pdf" onChange={e => 
              this.handleChangeFile(e.target.files[0])} /> 
              <PDFViewer document={{ base64: this.test }} scale={0.25} hideNavbar/>
          </div> 
        </div>
      );
    }
  }

}

export default DividirPDFPage;



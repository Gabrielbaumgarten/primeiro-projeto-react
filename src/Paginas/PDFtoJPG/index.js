import React from 'react';
import './style.css';
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
import PaineisDeArquivos from '../../Components/PaineisDeArquivo.js'
import InputFileArea from '../../Components/InputFileArea.js'
import TelaConclusao from '../../Components/TelaConclusao.js'
import BotaoFluanteAdd from '../../Components/BotaoFlutuanteAdd.js'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Zoom from '@material-ui/core/Zoom';
import CircularProgress from '@material-ui/core/CircularProgress'
import ErrorPage from '../../Components/TelaDeErro'

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

// Icons
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
import PictureAsPdfRoundedIcon from '@material-ui/icons/PictureAsPdfRounded';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import ImageIcon from '@material-ui/icons/Image';

const drawerWidth = 410;
const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: '30vw',
    marginTop: '9.6vh',
    height: '90.4vh',
    boxShadow: '0px 0px 3px 0px #9E9E9E',
  },
  selected: {
    backgroundColor: '#FA403A !important',
    color: '#FFFF !important',
    display: 'block',
  },
  nonSelected:{
    backgroundColor: '#FFF' ,
    color: '#555E69' ,
    display: 'block',
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

function PainelLateral(props) {
    const classes = useStyles();
    
    // TODO: Verificar a possibilidade de comprimir mais de um arquivo
    // if(props.arquivos == null || props.modoExtracao === 'PageToJPG'){
      return(  
        // Utilizando classes podemos utlizar o userStyle para sobreescrever styles já presentes do componente 
        <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
          <h2 className='TitleDrawer'>Opções de PDF para JPG</h2>
          <Divider/>


          <ThemeProvider theme={theme}>

          <ToggleButtonGroup value={props.modoExtracao} onChange={props.selecionarExtracao}
                            orientation="vertical" exclusive>
            
            <ToggleButton value='PageToJPG' classes={{ root: classes.nonSelected, selected: classes.selected }}>
              <MenuBookRoundedIcon fontSize="large" className='IconDrawer'/>
              <Typography variant='h6' align='left'>
                 Página para PDF
              </Typography>
              <Typography variant='body2' align='left'>
              Todas as páginas desse PDF serão convertidas em arquivos JPG.
              </Typography>
            </ToggleButton>

            <ToggleButton value='OnlyImage' classes={{ root: classes.nonSelected, selected: classes.selected }}>
              <ImageIcon fontSize="large" className='IconDrawer'/>  
              <Typography variant='h6' align='left'>
                  Extrair imagens
              </Typography>
              <Typography variant='body2' align='left'>
                  Todas as imagens incoporadas no PDF serão extraídas como imagens JPG.
              </Typography>
            </ToggleButton>

          </ToggleButtonGroup>
          </ThemeProvider>

          <Button className='ButtonDrawerPDFtoJPG' variant='contained'  onClick={() => {props.executar(!props.exibir)}} >
            Converter em JPG
            <div className='IconPDFtoJPG'>
                <PictureAsPdfRoundedIcon fontSize="large" />
                <ArrowRightAltRoundedIcon fontSize="large" />
                <PhotoLibraryRoundedIcon fontSize="large" />
            </div>
          </Button>
        </Drawer>
      );
  }

class PDFtoJPGPage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          // mudar para false
          isUpload: false,
          isButtonCompressClick: false,
          isUploadCompleted: false, 
          fileInputPesquisarPDF: React.createRef(),
          ready: false, 
          data: {files: null, pdf64: [], order: [], modoExtracao: null},
          resposta: null,
          respostaNome: '',
          uploadProgress: 0,
          error: false,
      };
      this.addFilesInputPDFtoJPG = React.createRef();
      this.handleOnChange = this.handleOnChange.bind(this);
      this.handleExtract = this.handleExtract.bind(this);
      this.onClickCompress = this.onClickCompress.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleChangeFile = this.handleChangeFile.bind(this);
      this.handleFile = this.handleFile.bind(this)
      this.handleResposta = this.handleResposta.bind(this)
      this.uploadProgress = this.uploadProgress.bind(this)
      this.handleOrder = this.handleOrder.bind(this)
      this.handleError = this.handleError.bind(this)
  }

  handleError(){
    this.setState({
      error: true
    })
  }

  handleOrder(order){
    const { data } = this.state
    data.order = order
  }
  
  handleAdd() {
    if(this.state.data.files === null){
      const { data } = this.state;
      const array = Array.from(this.addFilesInputPDFtoJPG.current.files)
      array.forEach(this.handleChangeFile);
      data.files = array;
      data.order.push('0')
    } else {
      const { data } = this.state;
      const array = Array.from(this.addFilesInputPDFtoJPG.current.files)
      array.forEach(this.handleChangeFile);
      data.files = data.files.concat(array);
      data.order.push(data.files.length)
    }
    this.setState({
      isUpload: false,
      ready: true,
    });
  }

  handleDelete(index){
    const { data } = this.state;
    if((data.files.length - 1) != index){
      data.files[index] = data.files[data.files.length - 1];
    }
    data.files.pop();
    this.forceUpdate()
  }
    
  
  handleExtract(event, modo){
    const { data } = this.state;
    data.modoExtracao = modo
    this.setState({})
  }
  
  handleOnChange() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.state.fileInputPesquisarPDF.current.files);
      var i;
      for(i= 0; i< data.files.length; i++){
        data.order.push(i.toString())
      }
    }
    this.state.data.files.forEach(this.handleChangeFile);
  } 
    
  onClickCompress(){
    this.setState({
      isButtonCompressClick: true,
    })
  }

  handleResposta(resp){
    var nome ='LinaPDF_' + 'Comprimir'
    this.state.data.order.forEach(aux => {
      nome += '_' + this.state.data.files[aux].name.split('.pdf')[0]
    })

    if(this.state.onlyOne){
      nome += '.pdf'
    } else {
      nome += '.zip'
    }

    this.setState({
      respostaNome: nome,
      resposta: window.URL.createObjectURL(resp),
    })
  }

  uploadProgress(progress){
    this.setState({
      uploadProgress: progress,
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
      var i;
      for(i= 0; i< acceptedFiles.length; i++){
        data.order.push(i.toString())
      }
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
  this.setState({})
}


  render() {
    if(this.state.error){
      return(
        <ErrorPage />
      )
    }
    else if(this.state.isUploadCompleted) {
      return (
          <TelaConclusao title='Os PDFs se tornaram pesquisáveis' modo='pesquisáveis' />
      );
    } else if(this.state.isButtonCompressClick){
      return (
        <div className='Centralizar'>
          <BarraProgresso executar={this.handleUploadCompleted.bind(this)} exibir={this.state.isUploadCompleted} />
        </div>
      );
    } else if(this.state.isUpload){
          return(
            <React.Fragment>
              <PaineisDeArquivos arquivos={this.state.data.files}  removerArquivo={this.handleDelete.bind(this)} pdf64={this.state.data.pdf64}/>
              <div className='AlinhamentoPDFtoJPG'>
                <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputPDFtoJPG} adicionarArquivos={this.handleAdd.bind(this)} />
              </div>
              <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonCompressClick} executar={this.onClickCompress.bind(this)} 
                modoExtracao={this.state.data.modoExtracao} selecionarExtracao={this.handleExtract.bind(this)}/>
            </React.Fragment>
          );
      }else if (this.state.ready){
        return(
          <React.Fragment>
            <CircularProgress className='CircularProgress' />
            <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonCompressClick} executar={this.onClickCompress.bind(this)} 
                modoExtracao={this.state.modoExtracao} selecionarExtracao={this.handleExtract.bind(this)}/>
            </React.Fragment>
        );
      } else{
          return(
              <div>
              <TextoPrincipal title='PDF para JPG' 
                  subTitle1='Extraia todas as imagens contidas em um arquivo PDF ou converta cada'
                  subTitle2='página em um arquivo JPG.' />
              <div className='Centralizar'>
                  <div>
                      <InputFileArea onDrop={this.onDrop.bind(this)} />
                  </div>
                  <Button variant='contained'>
                      <label for="files">
                      Selecionar arquivos PDF
                      </label>
                      <input id="files" type="file" accept='application/pdf' ref={this.state.fileInputPesquisarPDF} onChange={this.handleOnChange} className='Upload' multiple/>
                  </Button>
              </div> 
          </div>
          );
      }
    }
  }
  
  export default PDFtoJPGPage;
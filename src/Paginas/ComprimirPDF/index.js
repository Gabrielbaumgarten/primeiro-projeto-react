import React from 'react';
import './style.css';
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"
import Drawer from '@material-ui/core/Drawer';
import { makeStyles} from "@material-ui/core/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Divider from "@material-ui/core/Divider";
import TextoPrincipal from '../../Components/TextoPrincipal.js'
import BarraProgresso from '../../Components/BarraProgresso.js'
import PaineisDeArquivos from '../../Components/PaineisDeArquivo.js'
import InputFileArea from '../../Components/InputFileArea.js'
import TelaConclusao from '../../Components/TelaConclusao.js'
import BotaoFluanteAdd from '../../Components/BotaoFlutuanteAdd.js'
import CircularProgress from '@material-ui/core/CircularProgress'
import ErrorPage from '../../Components/TelaDeErro'

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

//Icons
import CompareArrowsRoundedIcon from '@material-ui/icons/CompareArrowsRounded';

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
    
      return(
        // Utilizando classes podemos utlizar o userStyle para sobreescrever styles já presentes do componente 
        <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
          <h2 className='TitleDrawer'>Nível de Compressão</h2>
          <Divider/>

          <ThemeProvider theme={theme}>

          <ToggleButtonGroup value={props.nivelCompressao} onChange={props.selecionarCompressao}
                            orientation="vertical" exclusive>
            <ToggleButton value='alta' classes={{ root: classes.nonSelected, selected: classes.selected }}>
              <Typography variant='h6' align='left'>
                Extrema Compressão
              </Typography>
              <Typography variant='body2' align='left'>
                  Menos qualidade, alta compressão.
              </Typography>
            </ToggleButton>
            <ToggleButton value='normal' classes={{ root: classes.nonSelected, selected: classes.selected }}>
              <Typography variant='h6' align='left'>
                Compressão Recomendada
              </Typography>
              <Typography variant='body2' align='left'>
                Boa qualidade, boa compressão.
              </Typography>
            </ToggleButton>
            <ToggleButton value='baixa' classes={{ root: classes.nonSelected, selected: classes.selected }}>
              <Typography variant='h6' align='left'>
                Baixa Compressão
              </Typography>
              <Typography variant='body2' align='left'>
                Alta qualidade, baixa compressão.
              </Typography>
            </ToggleButton>

          </ToggleButtonGroup>

          <Button className='ButtonDrawerComprimirPDF' variant='contained'  onClick={() => {props.executar(!props.exibir)}}>
            Comprimir PDF
            <CompareArrowsRoundedIcon fontSize='large' className="IconComprimir"/>
          </Button>
          </ThemeProvider>
        </Drawer>
      );
  }

class ComprimirPDFPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        isUpload: false,
        isButtonCompressClick: false,
        isUploadCompleted: false, 
        fileInputComprimirPDF: React.createRef(),
        ready: false, 
        data: {files: null, pdf64: [], order: [], nivelCompressao: null,},
        resposta: null,
        respostaNome: '',
        uploadProgress: 0,
        error: false,
    };
    this.addFilesInputComprimirPDF = React.createRef();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleCompress = this.handleCompress.bind(this);
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

  /*Setter de variáveis */
  handleError(){
    this.setState({
      error: true
    })
  }

  uploadProgress(progress){
    this.setState({
      uploadProgress: progress,
    })
  }

  handleCompress(event, nivel){
    const { data } = this.state
    data.nivelCompressao = nivel
    this.setState({})
  }

  handleUploadCompleted(){
    this.setState({
      isUploadCompleted: true,
    })
  }

  /*Manipuladores dos arquivos */
  handleAdd() {
    if(this.state.data.files === null){
      const { data } = this.state;
      const array = Array.from(this.addFilesInputComprimirPDF.current.files)
      array.forEach(this.handleChangeFile);
      data.files = array;
      data.order.push('0')
    } else {
      const { data } = this.state;
      const array = Array.from(this.addFilesInputComprimirPDF.current.files)
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
    this.setState({});
  }

  onClickCompress(){
    // postJuntarPDF(this.state.data.files, 'juntar', this.handleResposta.bind(this),
    //                this.uploadProgress.bind(this), this.state.data.order, this.handleError.bind(this))
    
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

  handleOrder(order){
    const { data } = this.state
    data.order = order
  }

  /* Tratadores ao receber os arquivos */
  handleOnChange() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.state.fileInputComprimirPDF.current.files);
    
      var i;
      for(i= 0; i< data.files.length; i++){
        data.order.push(i.toString())
      }
    }
    this.state.data.files.forEach(this.handleChangeFile);
  } 

  onDrop = acceptedFiles => {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = acceptedFiles;
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
    this.setState({});
  }

  /* Renderização da página  */
  render() {
    if(this.state.error){
      return(
        <ErrorPage />
      )
    }
    else if(this.state.isUploadCompleted) {
      return (
          <TelaConclusao title='Os PDFs foram comprimidos' modo='comprimido'
           arquivo={this.state.resposta} nome={this.state.respostaNome} porcentagem={this.state.uploadProgress} />
      );
    } else if(this.state.isButtonCompressClick){
      return (
        <div className='Centralizar'>
          <BarraProgresso executar={this.handleUploadCompleted.bind(this)} exibir={this.state.isUploadCompleted} 
           ordemDosArquivos={this.handleOrder.bind(this)}/>
       </div>
      );
   } else if(this.state.isUpload){    
          return(
            <React.Fragment>
              <PaineisDeArquivos arquivos={this.state.data.files} removerArquivo={this.handleDelete.bind(this)} pdf64={this.state.data.pdf64}/>
              <div className='AlinhamentoComprimirPDF'>
                <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputComprimirPDF} adicionarArquivos={this.handleAdd.bind(this)} />
              </div>
              <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonCompressClick} executar={this.onClickCompress.bind(this)} 
              nivelCompressao={this.state.data.nivelCompressao} selecionarCompressao={this.handleCompress.bind(this)} />
            </React.Fragment>
          );
      }else if (this.state.ready){
        return(
          <React.Fragment>
            <CircularProgress className='CircularProgress' />
            <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonCompressClick} executar={this.onClickCompress.bind(this)} 
              nivelCompressao={this.state.nivelCompressao} selecionarCompressao={this.handleCompress.bind(this)} />
            </React.Fragment>
        );
      } else{
          return(
              <div>
              <TextoPrincipal title='Comprimir arquivo PDF' 
                  subTitle1='Diminua o tamanho do seu arquivo PDF, mantendo a melhor qualidade possível.'
                  subTitle2='Otimize seus arquivos PDF.' />
              <div className='Centralizar'>
                  <div>
                      <InputFileArea onDrop={this.onDrop.bind(this)} />
                  </div>
                  <Button variant='contained'>
                      <label for="files">
                      Selecionar arquivos PDF
                      </label>
                      <input id="files" type="file" accept='application/pdf' ref={this.state.fileInputComprimirPDF} onChange={this.handleOnChange} className='Upload' multiple/>
                  </Button>
              </div> 
          </div>
          );
      }
    }
}

export default ComprimirPDFPage;
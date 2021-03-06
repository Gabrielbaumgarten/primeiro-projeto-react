import React from 'react';
import './style.css';
import Button from "@material-ui/core/Button"
import Drawer from '@material-ui/core/Drawer';
import { makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { Box } from '@material-ui/core';
import TextoPrincipal from '../../Components/TextoPrincipal.js'
import BarraProgresso from '../../Components/BarraProgresso.js'
import PaineisDeArquivos from '../../Components/PaineisDeArquivo.js'
import InputFileArea from '../../Components/InputFileArea.js'
import TelaConclusao from '../../Components/TelaConclusao.js'
import BotaoFluanteAdd from '../../Components/BotaoFlutuanteAdd.js'
import CircularProgress from '@material-ui/core/CircularProgress'
import { postJuntarPDF } from '../../Components/HTTPmethods'
import Typography from '@material-ui/core/Typography'
import ErrorPage from '../../Components/TelaDeErro'

// icons
import CallMergeRoundedIcon from '@material-ui/icons/CallMergeRounded';

/* 
Sobeescrevendo o style do drawer paper
Por algum motivo de hierarquia o drawer não se altera utilizando css 
*/
const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: '20vw',
    marginTop: '9.6vh',
    height: '90.4vh',
    boxShadow: '0px 0px 3px 0px #9E9E9E',
  }
}));


/* 
  Função que retorna o painel lateral após selecionar alguns arquivos
*/
function PainelLateral(props) {
  const classes = useStyles();
  var tamanho = 0
  props.arquivos.forEach(arquivo =>{
    tamanho += arquivo.size
  }) 

  tamanho = Math.floor(tamanho/1000)

  if(props.arquivos.length < 2){
    return(
      // Utilizando classes podemos utlizar o userStyle para sobreescrever styles já presentes do componente 
      <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
        <h2 className='TitleDrawer'>Juntar PDF</h2>
        <Divider/>
        <Box className='TextDrawer'>
          <p>Por favor, selecione mais arquivos PDF clicando novamente em 'Selecionar Arquivos PDF'.
              Selecione vários arquivos, mantendo apertado 'Ctrl'</p>
        </Box>
        <Button className='ButtonDrawerDisabledJuntarPDF' variant='contained' disabled>
          Juntar PDF
          <CallMergeRoundedIcon fontSize='large' className="IconJuntar"/>
        </Button>
      </Drawer>
    );
  }
  else {
    return(
      <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
        <h2 className='TitleDrawer'>Juntar PDF</h2>
        <Divider/>
        <Box className='TextDrawer'>
          <p>Para alterar a ordem dos seus PDFs, arraste e solte os arquivos como entender.</p>
        </Box>
        <Typography variant='subtitle1' className=""> Tamanho do arquivo final: <b>{tamanho}</b> KB</Typography>
        <Button  variant='contained' className='ButtonDrawerJuntarPDF' onClick={() => {props.executar(!props.exibir)}}>
          Juntar PDF
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
class JuntarPDFPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isUpload: false,
      isButtonMergeClick: false,
      isUploadCompleted: false,
      ready: false, 
      fileInputJuntarPDF: React.createRef(),
      // adicionar order
      data: {files: null, pdf64: [], order: []},
      // adicionar
      resposta: null,
      respostaNome: '',
      uploadProgress: 0,
      error: false,
    };
    this.addFilesInputJuntarPDF = React.createRef();
    this.handleOnChange = this.processOnChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMerge = this.handleMerge.bind(this);
    this.handleUploadCompleted = this.setUploadCompleted.bind(this);
    this.processChangeFile = this.processChangeFile.bind(this);
    this.processFiles = this.processFiles.bind(this)
    // adicionar
    this.handleResposta = this.handleResposta.bind(this)
    this.setUploadProgress = this.setUploadProgress.bind(this)
    this.handleOrder = this.handleOrder.bind(this)
    this.setError = this.setError.bind(this)
  }

  /*Setter de variáveis */
  // adicionar
  setError(){
    this.setState({
      error: true
    })
  }

  // adicionar
  setUploadProgress(progress){
    this.setState({
      uploadProgress: progress,
    })
  }

  setUploadCompleted(){
    this.setState({
      isUploadCompleted: true,
    })
  }

  /*Manipuladores dos arquivos */
  handleAdd() {
    if(this.state.data.files === null){
      const { data } = this.state;
      const array = Array.from(this.addFilesInputJuntarPDF.current.files)
      array.forEach(this.processChangeFile);
      data.files = array;
      
  // adicionar
      data.order.push('0')
    } else {
      const { data } = this.state;
      const array = Array.from(this.addFilesInputJuntarPDF.current.files)
      array.forEach(this.processChangeFile);
      data.files = data.files.concat(array);
      
  // adicionar
      data.order.push(data.files.length)
    }
    this.setState({
      isUpload: false,
      ready: true,
    });
  }

  handleDelete(index){
    const { data } = this.state;
    if((data.files.length - 1) !== index){
     data.files[index] = data.files[data.files.length - 1];
    }
    // Deletar
    data.files.pop();
    this.setState({});
  }

  handleMerge(){
  // adicionar
    postJuntarPDF(this.state.data.files, 'juntar', this.handleResposta.bind(this),
                   this.setUploadProgress.bind(this), this.state.data.order, this.setError.bind(this))
    this.setState({
      isButtonMergeClick: true,
    })
  }

  // adicionar
  handleResposta(resp){
    var nome ='LinaPDF_' + 'Juntar'
    this.state.data.order.forEach(aux => {
      nome += '_' + this.state.data.files[aux].name.split('.pdf')[0]
    })
    nome += '.pdf'
    this.setState({
      respostaNome: nome,
      resposta: window.URL.createObjectURL(resp),
    })
  }

  // adicionar
  handleOrder(order){
    const { data } = this.state
    data.order = order
  }
  

  /* Tratadores ao receber os arquivos */
  processOnChange() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.state.fileInputJuntarPDF.current.files);
      // adicionar
      var i;
      for(i= 0; i< data.files.length; i++){
        data.order.push(i.toString())
      }
    }
    this.state.data.files.forEach(this.processChangeFile);
  }

  onDrop = acceptedFiles => {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = acceptedFiles;
      
  // adicionar
      var i;
      for(i= 0; i< acceptedFiles.length; i++){
        data.order.push(i.toString())
      }
    }
    this.state.data.files.forEach(this.processChangeFile);
    this.setState({
      fileInputDividirPDF: acceptedFiles,
    });
  };

  processFiles = (e) => {
    const content = e.target.result;
    this.state.data.pdf64.push(content.split(',')[1]);

    if(this.state.data.pdf64.length === this.state.data.files.length){
        this.setState({
        isUpload: true,
      });
    }
  }

   processChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onload = this.processFiles;
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
    else if(this.state.isUploadCompleted){
      return (
        // adicionar campos apos modo
          <TelaConclusao title='Os PDFs foram combinados' modo='combinado' arquivo={this.state.resposta} nome={this.state.respostaNome} />
      );
    } else if(this.state.isButtonMergeClick) {
      return(
        <div className='Centralizar'>
          {/* adicionar campos apos exibir */}
          <BarraProgresso executar={this.setUploadCompleted.bind(this)} exibir={this.state.isUploadCompleted} porcentagem={this.state.uploadProgress} />
       </div>
      );
    } else if(this.state.isUpload) {
      return(
        <React.Fragment>
          <div className='Conteudo'>
            {/* adicionar ordem dos arquivos */}
            <PaineisDeArquivos arquivos={this.state.data.files} removerArquivo={this.handleDelete.bind(this)} pdf64={this.state.data.pdf64} ordemDosArquivos={this.handleOrder.bind(this)} />
            <div className='AlinhamentoJuntarPDF'>
              <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputJuntarPDF} adicionarArquivos={this.handleAdd.bind(this)} />
            </div>
          </div>
            <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonMergeClick} executar={this.handleMerge.bind(this)} />
        </React.Fragment>
      );
    } else if (this.state.ready){
      return(
        <React.Fragment>
          <CircularProgress className='CircularProgress' />
          <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonMergeClick} executar={this.handleMerge.bind(this)} />
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <TextoPrincipal title='Juntar arquivos PDF' 
              subTitle1=' Mesclar e juntar PDFs e colocá-los em qualquer ordem que desejar.'
              subTitle2='É tudo muito fácil e rápido!' />
           <div className='Centralizar'>
              <div>
                <InputFileArea onDrop={this.onDrop.bind(this)} />
              </div>
              <Button variant='contained'>
                <label htmlFor="files">
                  Selecionar arquivos PDF
                </label>
                <input id="files" type="file" accept='application/pdf' ref={this.state.fileInputJuntarPDF} onChange={this.processOnChange} className='Upload' multiple/>
              </Button>
          </div> 
        </div>
      );
    }
  }

}

export default JuntarPDFPage;



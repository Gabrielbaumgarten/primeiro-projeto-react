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
import { getDataAxios, postDataAxios } from '../../Components/HTTPmethods'
import Typography from '@material-ui/core/Typography'

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
      data: {files: null, path: null, pdf64: []},
      resposta: null,
      uploadProgress: 0,
    };
    this.addFilesInputJuntarPDF = React.createRef();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMerge = this.handleMerge.bind(this);
    this.handleUploadCompleted = this.handleUploadCompleted.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleFile = this.handleFile.bind(this)
    this.handleResposta = this.handleResposta.bind(this)
    this.uploadProgress = this.uploadProgress.bind(this)
  }


// TODO: Ajustar essa função de adicionar arquivos, verificar como o linaPDF fará isso
  handleAdd() {
    if(this.state.data.files === null){
      const { data } = this.state;
      const array = Array.from(this.addFilesInputJuntarPDF.current.files)
      array.forEach(this.handleChangeFile);
      data.files = array;
      // TODO:Corrigir para mais de um elemento, está pegando o valor de apenas 1
      data.path = [this.addFilesInputJuntarPDF.current.value];
    } else {
      const { data } = this.state;
      const array = Array.from(this.addFilesInputJuntarPDF.current.files)
      array.forEach(this.handleChangeFile);
      data.files = data.files.concat(array);
      // TODO: Ajustar os path em todas as páginas
      // data.path = data.path.concat([this.addFilesInputJuntarPDF.current.value]);
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
    // TODO:Ajustar isso ao corrigir o problema do path
    // delete data.path[index];  
    data.files.pop();
    this.setState({});
  }
  
  handleOnChange() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.state.fileInputJuntarPDF.current.files);
      // TODO:Corrigir para mais de um elemento, está pegando o valor de apenas 1
      data.path = [this.state.fileInputJuntarPDF.current.value];
    }
    this.state.data.files.forEach(this.handleChangeFile);
  }

  handleMerge(){
    postDataAxios(this.state.data.files, 'juntar', this.handleResposta.bind(this), this.uploadProgress.bind(this))
    this.setState({
      isButtonMergeClick: true,
    })
  }

  handleResposta(resp){
    this.setState({
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
      // TODO: Verificar como passar o path que está dentro de cada arquivo para fora
      // data.path = [this.state.fileInputJuntarPDF.current.value];
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
        ready: false,
      });
    }
  }

   handleChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onload = this.handleFile;
    fileData.readAsDataURL(file);
    this.setState({});
  }

  render() {
    if(this.state.isUploadCompleted){
      return (
          <TelaConclusao title='Os PDFs foram combinados' modo='combinado' arquivo={this.state.resposta} nomes={this.state.data.files} />
      );
    } else if(this.state.isButtonMergeClick) {
      return(
        <div className='Centralizar'>
          <BarraProgresso executar={this.handleUploadCompleted.bind(this)} exibir={this.state.isUploadCompleted} porcentagem={this.state.uploadProgress} />
       </div>
      );
    } else if(this.state.isUpload) {
      return(
        <React.Fragment>
          <div className='Conteudo'>
            <PaineisDeArquivos arquivos={this.state.data.files} removerArquivo={this.handleDelete.bind(this)} pdf64={this.state.data.pdf64}/>
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
                <input id="files" type="file" accept='application/pdf' ref={this.state.fileInputJuntarPDF} onChange={this.handleOnChange} className='Upload' multiple/>
              </Button>
          </div> 
        </div>
      );
    }
  }

}

export default JuntarPDFPage;



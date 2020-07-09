import React from 'react';
import './style.css';
import Button from "@material-ui/core/Button"
import TextoPrincipal from '../../Components/TextoPrincipal.js'
import BarraProgresso from '../../Components/BarraProgresso.js'
import PaineisDeArquivosDividir from '../../Components/PaineisDeArquivosDivididos/index.js'
import InputFileArea from '../../Components/InputFileArea.js'
import TelaConclusao from '../../Components/TelaConclusao.js'
import BotaoFluanteAdd from '../../Components/BotaoFlutuanteAdd.js'
import PainelLateral from './DrawerDividirPDF.js'
import CircularProgress from '@material-ui/core/CircularProgress'
import { postDividirPDF, postGetInformation } from '../../Components/HTTPmethods'

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
      ready: false, 
      fileInputDividirPDF: React.createRef(),
      respostaNome: '',
      resposta: null,
      uploadProgress: 0,
      onlyOne: false,
      // modo 0: Por intervalo
      // modo 1: Por tamanho
      // modo 2: Selecionar páginas
      data: {files: null, pdf64: [], pages: null, order: [],
             modo: 0, tipoExtracao: 'all', size: 0, startPage:1, endPage:2},
      numPage: 0,
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
    this.handleSize = this.handleSize.bind(this);
    this.handleInputSize = this.handleInputSize.bind(this);
    this.handleModo = this.handleModo.bind(this);
    this.handleExtracao = this.handleExtracao.bind(this);
    this.handleResposta = this.handleResposta.bind(this)
    this.uploadProgress = this.uploadProgress.bind(this)
    this.handleOrder = this.handleOrder.bind(this)
    this.handleInformation = this.handleInformation.bind(this)
    this.handleOnlyOne = this.handleOnlyOne.bind(this)
    this.handlePages = this.handlePages.bind(this)
  }

  handlePages(pages){
    const { data } = this.state
    data.pages = pages
  }

  handleOnlyOne(checked){
    this.setState({
      onlyOne: checked,
    })
  }

  handleOrder(order){
    const { data } = this.state
    data.order = order
  }

  handleAdd() {
    if(this.state.data.files === null){
      const { data } = this.state;
      const array = Array.from(this.addFilesInputDividirPDF.current.files)
      array.forEach(this.handleChangeFile);
      data.files = array;
      data.order.push('0');
    } else {
      const { data } = this.state;
      const array = Array.from(this.addFilesInputDividirPDF.current.files);
      array.forEach(this.handleChangeFile);
      data.files = data.files.concat(array);
      data.order.push(data.files.length);
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
  
  handleOnChange() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.state.fileInputDividirPDF.current.files);
      var i;
      for(i= 0; i< data.files.length; i++){
        data.order.push(i.toString())
      }    
    }
    this.state.data.files.forEach(this.handleChangeFile);
  }

  handleDivide(){
    postDividirPDF(this.state.data, 'dividir', this.handleResposta.bind(this),
                  this.uploadProgress.bind(this), this.state.onlyOne)

    this.setState({
      isButtonMergeClick: true,
    })
  }

  handleResposta(resp){
    var nome ='LinaPDF_' + 'Dividir'
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

  handleInformation(info){
    const { data } = this.state;
    data.endPage = info.numPages
    this.setState({
      numPage: info.numPages,
      isUpload: true,
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
        postGetInformation(this.state.data.files, 'dividir', this.handleInformation.bind(this),
                            this.uploadProgress.bind(this), this.state.data.order)
    }
  }

  handleChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onload = this.handleFile;
    fileData.readAsDataURL(file);
    this.setState({});
  }

  handleStartPage(event) {
    const { data } = this.state;
    data.startPage = (event.target.value === '' ? '' : Number(event.target.value));
    this.setState({});
  }

  handleEndPage(event) {
    const { data } = this.state;
    data.endPage = (event.target.value === '' ? '' : Number(event.target.value));
    this.setState({});
  }

  handleSize(event, newValue){
    const { data } = this.state;
    data.size = newValue;
    this.setState({});
  }

  handleInputSize(event){
    const { data } = this.state;
    let value = (event.target.value === '' ? '' : Number(event.target.value));
    if(value < 0){
      data.size = 0;
    }else if(value > (data.files[0].size/1000)){
      data.size = (data.files[0].size/1000);
    } else{
      data.size = value;
    }
    this.setState({});
  }

  handleModo(event, newValue){
    const { data } = this.state;
    data.modo = newValue;
    this.setState({});
  }

  handleExtracao(event, newValue){
    const { data } = this.state;
    data.tipoExtracao = newValue;
    this.setState({});
  }

  render() {
    if(this.state.isUploadCompleted){
      return (
          <TelaConclusao title='Os PDFs foram divididos' modo='dividido' arquivo={this.state.resposta} nome={this.state.respostaNome} />
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
          <PaineisDeArquivosDividir data={this.state.data} removerArquivo={this.handleDelete.bind(this)} ordemDosArquivos={this.handleOrder.bind(this)} />
          <div className='AlinhamentoDividirPDF'>
            <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputDividirPDF} adicionarArquivos={this.handleAdd.bind(this)} />
          </div>
          <PainelLateral exibir={this.state.isButtonMergeClick} executar={this.handleDivide.bind(this)}
           inicio={this.state.data.startPage} fim={this.state.data.endPage} handleInicioIntervalo={this.handleStartPage.bind(this)}
           handleFimIntervalo={this.handleEndPage.bind(this)} mudarModo={this.handleModo.bind(this)} mudarExtracao={this.handleExtracao.bind(this)}
           data={this.state.data} definirTamanho={this.handleSize.bind(this)} definirTamanhoInput={this.handleInputSize.bind(this)}
           handleCheck={this.handleOnlyOne.bind(this)} check={this.state.onlyOne} handlePages={this.handlePages.bind(this)} />
        </React.Fragment>
      );
    }else if (this.state.ready){
      return(
        <React.Fragment>
          <CircularProgress className='CircularProgress' />
          <PainelLateral exibir={this.state.isButtonMergeClick} executar={this.handleDivide.bind(this)}
           inicio={this.state.data.startPage} fim={this.state.data.endPage} handleInicioIntervalo={this.handleStartPage.bind(this)}
           handleFimIntervalo={this.handleEndPage.bind(this)} mudarModo={this.handleModo.bind(this)} mudarExtracao={this.handleExtracao.bind(this)}
           data={this.state.data} definirTamanho={this.handleSize.bind(this)} definirTamanhoInput={this.handleInputSize.bind(this)} />
        </React.Fragment>
      );
    }  else { 
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



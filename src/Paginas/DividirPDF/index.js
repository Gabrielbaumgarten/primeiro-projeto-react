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
      data: {files: null, path: null, pdf64: [], pages: [],
             modo: 0, tipoExtracao: 'all', size: null, startPage:1, endPage:2},
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
      this.setState({});
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
          <PainelLateral exibir={this.state.isButtonMergeClick} executar={this.handleDivide.bind(this)}
           inicio={this.state.data.startPage} fim={this.state.data.endPage} handleInicioIntervalo={this.handleStartPage.bind(this)}
           handleFimIntervalo={this.handleEndPage.bind(this)} mudarModo={this.handleModo.bind(this)} mudarExtracao={this.handleExtracao.bind(this)}
           data={this.state.data} definirTamanho={this.handleSize.bind(this)} definirTamanhoInput={this.handleInputSize.bind(this)} />
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



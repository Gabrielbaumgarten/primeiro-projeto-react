import React from 'react';
import './Css/PesquisarPDF.css';
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"
import Drawer from '@material-ui/core/Drawer';
import { makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { Box } from '@material-ui/core';
import TextoPrincipal from '../Components/TextoPrincipal.js'
import BarraProgresso from '../Components/BarraProgresso.js'
import PaineisDeArquivos from '../Components/PaineisDeArquivo.js'
import InputFileArea from '../Components/InputFileArea.js'
import TelaConclusao from '../Components/TelaConclusao.js'
import BotaoFluanteAdd from '../Components/BotaoFlutuanteAdd.js'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

// Icons
import FindInPageRoundedIcon from '@material-ui/icons/FindInPageRounded';

const drawerWidth = 400;
const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: drawerWidth,
    marginTop: 62,
    boxShadow: '0px 0px 3px 0px #9E9E9E',
  }
}));

const linguas = ['Africâner', 'Albanês', "Alemão", 'Árabe', 'Azerbaijano', 'Basco', 'Bielorrusso', 'Bengali',
      "Búlgaro", "Catalão", "Cherokee", "Chinês (simplificado)", "Chinês (tradicional)", "Croata", 'Coreano',
       "Dinamarquês", 'Eslovaco', 'Esloveno', 'Espanhol',"Esperanto", "Estoniano", "Finlandês", "Franco", "Francês",
       "Galego",  "Grego", "Hebraico", "Holandês", 'Hindi', 'Húngaro', 'Islandês', 'Indonésio', 'Italiano', 'Italiano (Antigo)',
        'Japonês', 'Kannada', 'Letão', 'Lituano', 'Macedônio', 'Malaio', 'Malaiala', 'Maltês', 'Norueguês', 'Polonês', 'Português',
         'Romeno','Sérvio (latino)', 'Suaíli', 'Sueco', 'Tagalo', 'Tamil', 'Telugu',"Tcheco"]

function PainelLateral(props) {
    const classes = useStyles();
    var chaves = Array.from(Array(linguas.length).keys());
    const opcoesLinguas = chaves.map(chaves => (
      <option>{linguas[chaves]}</option>
    ))  

    // TODO: Verificar a necessidade desse null
    if(props.arquivos == null){
      return(
  
        // Utilizando classes podemos utlizar o userStyle para sobreescrever styles já presentes do componente 
        <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
          <h2 className='TitleDrawer'>Pesquisar no PDF</h2>
          <Divider/>
          <Box className='TextDrawer'>
            <p>Por favor, selecione mais arquivos PDF clicando novamente em 'Selecionar Arquivos PDF'.
                Selecione vários arquivos, mantendo apertado 'Ctrl'</p>
          </Box>
          <Button className='ButtonDrawerDisabledComprimirPDF' variant='contained' disabled>
            Pesquisar no PDF
            <FindInPageRoundedIcon fontSize="large" className='IconPesquisar'/>
          </Button>
        </Drawer>
      );
    }
    else {
      return(
        <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
          <h2 className='TitleDrawer'>Pesquisar no PDF</h2>
          <Divider/>
          <Box className='TextDrawer'>
            <p>Tornar um arquivo PDF pesquisável ajuda muito quando se deseja encontrar rapidamente alguma palavra chave.<br/> 
                <br/>
                Selecione a lingua que deseja para a pesquisa no documento.
            </p>
          </Box>
          {/* TODO: Adicionar Value nas linguas */}
          <FormControl variant="outlined" className='SelectLanguage'>
            <InputLabel htmlFor="outlined-age-native-simple">Língua da pesquisa</InputLabel>
            <Select native label="Língua da pesquisa" value='Português'>
              <option aria-label="None" value="" />
              {opcoesLinguas}
            </Select>
          </FormControl>

          <Button  variant='contained' className='ButtonDrawerPesquisarPDF' onClick={() => {props.executar(!props.exibir)}}>
            Pesquisar no PDF
            <FindInPageRoundedIcon fontSize="large" className='IconPesquisar'/>
          </Button>
        </Drawer>
      );
    }
  }
  

class PesquisarPDFPage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          // mudar para false
          isUpload: false,
          isButtonCompressClick: false,
          isUploadCompleted: false, 
          fileInputPesquisarPDF: React.createRef(),
          data: {files: null, path: null, pdf64: []},
      };
      this.addFilesInputPesquisarPDF = React.createRef();
      this.handleOnChange = this.handleOnChange.bind(this);
      this.onClickCompress = this.onClickCompress.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleChangeFile = this.handleChangeFile.bind(this);
      this.handleFile = this.handleFile.bind(this)
  }

  // TODO: melhorar essa função quando desccobrir como serão passados os arquivos
  handleAdd() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.addFilesInputPesquisarPDF.current.files);
      // TODO:Corrigir para mais de um elemento, está pegando o valor de apenas 1
      data.path = [this.addFilesInputPesquisarPDF.current.value];
    } else {
      const { data } = this.state;
      data.files = data.files.concat(Array.from(this.addFilesInputPesquisarPDF.current.files));
      // data.path = data.path.concat([this.addFilesInputPesquisarPDF.current.value]);
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

  onClickCompress(){
      this.setState({
          isButtonCompressClick: true,
        })
  }
  
  handleOnChange() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.state.fileInputPesquisarPDF.current.files);
      // TODO:Corrigir para mais de um elemento, está pegando o valor de apenas 1
      data.path = [this.state.fileInputPesquisarPDF.current.value];
    }
    this.state.data.files.forEach(this.handleChangeFile);
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
      });
    }
  }

  handleChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onload = this.handleFile;
    fileData.readAsDataURL(file);
    this.forceUpdate();
  }
  
  handleUploadCompleted(){
    this.setState({
      isUploadCompleted: true,
    })
  }

  render() {
    if(this.state.isUploadCompleted) {
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
            <PaineisDeArquivos arquivos={this.state.data.files} removerArquivo={this.handleDelete.bind(this)} pdf64={this.state.data.pdf64}/>
            <div className='AlinhamentoPesquisarPDF'>
              <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputPesquisarPDF} adicionarArquivos={this.handleAdd.bind(this)} />
            </div>
            <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonCompressClick} executar={this.onClickCompress.bind(this)} />
          </React.Fragment>
        );
      }else{
        return(
            <div>
            <TextoPrincipal title='Pesquisar em um arquivo PDF' 
                subTitle1='Torne arquivos PDF pesquisáveis para deixar sua busca mais fácil e rápida.'
                subTitle2='Otimize suas buscas em seus arquivos PDF.' />
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
  
  export default PesquisarPDFPage;
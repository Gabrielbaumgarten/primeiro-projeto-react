import React from 'react';
import './PDFtoJPG.css';
import Typography from '@material-ui/core/Typography'
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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Zoom from '@material-ui/core/Zoom';

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
  }
}));

function PainelLateral(props) {
    const classes = useStyles();
    
    // TODO: Verificar a possibilidade de comprimir mais de um arquivo
    if(props.arquivos == null || props.modoExtracao === 'PageToJPG'){
      return(  
        // Utilizando classes podemos utlizar o userStyle para sobreescrever styles já presentes do componente 
        <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
          <h2 className='TitleDrawer'>Opções de PDF para JPG</h2>
          <Divider/>
          <ButtonGroup orientation='vertical' className='SelectCompression'>
            <Button onClick={() => props.selecionarExtracao('PageToJPG')}>
             <Zoom in='true' className='Checked'>
                <CheckCircleRoundedIcon fontSize='large' />
             </Zoom>
             <MenuBookRoundedIcon fontSize="large" className='IconDrawer'/>
             <Typography variant='h6' align='left'>
                Página para PDF
             </Typography>
             <Typography variant='body2' align='left'>
                 Todas as páginas desse PDF serão convertidas em arquivos JPG.
             </Typography>
            </Button>
            <Button onClick={() => props.selecionarExtracao('OnlyImage')}> 
             <ImageIcon fontSize="large" className='IconDrawer'/>  
             <Typography variant='h6' align='left'>
                Extrair imagens
             </Typography>
             <Typography variant='body2' align='left'>
                 Todas as imagens incoporadas no PDF serão extraídas como imagens JPG.
             </Typography>
            </Button>
          </ButtonGroup>

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
    } else if(props.modoExtracao === 'OnlyImage'){
        return(
            <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
          <h2 className='TitleDrawer'>Opções de PDF para JPG</h2>
          <Divider/>
          <ButtonGroup orientation='vertical' className='SelectCompression'>
            <Button onClick={() => props.selecionarExtracao('PageToJPG')}>
             <MenuBookRoundedIcon fontSize="large" className='IconDrawer'/>
             <Typography variant='h6' align='left'>
                Página para PDF
             </Typography>
             <Typography variant='body2' align='left'>
                 Todas as páginas desse PDF serão convertidas em arquivos JPG.
             </Typography>
            </Button>
            <Button onClick={() => props.selecionarExtracao('OnlyImage')}> 
             <Zoom in='true' className='Checked'>
                <CheckCircleRoundedIcon fontSize='large' />
             </Zoom>
             <ImageIcon fontSize="large" className='IconDrawer'/>  
             <Typography variant='h6' align='left'>
                Extrair imagens
             </Typography>
             <Typography variant='body2' align='left'>
                 Todas as imagens incoporadas no PDF serão extraídas como imagens JPG.
             </Typography>
            </Button>
          </ButtonGroup>

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
    } else {
      return(
        <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
          <h2 className='TitleDrawer'>Opções de PDF para JPG</h2>
          <Divider/>
          <ButtonGroup orientation='vertical' className='SelectCompression'>
            <Button onClick={() => props.selecionarExtracao('PageToJPG')}>
             <MenuBookRoundedIcon fontSize="large" className='IconDrawer'/>
             <Typography variant='h6' align='left'>
                Página para PDF
             </Typography>
             <Typography variant='body2' align='left'>
                 Todas as páginas desse PDF serão convertidas em arquivos JPG.
             </Typography>
            </Button>
            <Button onClick={() => props.selecionarExtracao('OnlyImage')}> 
             <ImageIcon fontSize="large" className='IconDrawer'/>  
             <Typography variant='h6' align='left'>
                Extrair imagens
             </Typography>
             <Typography variant='body2' align='left'>
                 Todas as imagens incoporadas no PDF serão extraídas como imagens JPG.
             </Typography>
            </Button>
          </ButtonGroup>

          <Button className='ButtonDrawerDisabledPDFtoJPG' variant='contained' disabled>
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
          modoExtracao: null,
          data: {files: null, path: null, pdf64: []},
      };
      this.addFilesInputPDFtoJPG = React.createRef();
      this.handleOnChange = this.handleOnChange.bind(this);
      this.handleExtract = this.handleExtract.bind(this);
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
          data.files = Array.from(this.addFilesInputPDFtoJPG.current.files);
          // TODO:Corrigir para mais de um elemento, está pegando o valor de apenas 1
          data.path = [this.addFilesInputPDFtoJPG.current.value];
      } else {
          const { data } = this.state;
          data.files = data.files.concat(Array.from(this.addFilesInputPDFtoJPG.current.files));
          // data.path = data.path.concat([this.addFilesInputPDFtoJPG.current.value]);
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

  handleExtract(modo){
      this.setState({
          modoExtracao: modo,
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
              <PaineisDeArquivos arquivos={this.state.data.files}  removerArquivo={this.handleDelete.bind(this)} pdf64={this.state.data.pdf64}/>
              <div className='AlinhamentoPDFtoJPG'>
                <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputPDFtoJPG} adicionarArquivos={this.handleAdd.bind(this)} />
              </div>
              <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonCompressClick} executar={this.onClickCompress.bind(this)} 
                modoExtracao={this.state.modoExtracao} selecionarExtracao={this.handleExtract.bind(this)}/>
            </React.Fragment>
          );
      }else{
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
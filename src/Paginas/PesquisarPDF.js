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

function PainelLateral(props) {
    const classes = useStyles();
  
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
            <p>Tornar um arquivo PDF pesquisável ajuda muito quando se deseja encontrar rapidamente alguma palavra chave. </p>
          </Box>
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
            // nivelCompressao: null,
        };
        this.addFilesInputComprimirPDF = React.createRef();
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleCompress = this.handleCompress.bind(this);
        this.onClickCompress = this.onClickCompress.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }
  
    // TODO: melhorar essa função quando desccobrir como serão passados os arquivos
    handleAdd() {
      const historico =  this.state.fileInputPesquisarPDF;
      this.setState({
        fileInputPesquisarPDF: this.addFilesInputComprimirPDF,
      })
    }
  
    onClickCompress(){
        this.setState({
            isButtonCompressClick: true,
          })
    }
  
    handleCompress(nivel){
        this.setState({
            nivelCompressao: nivel,
          })
      }
    
    handleOnChange() {
      var aux = Array.from(this.state.fileInputPesquisarPDF.current.files)
        this.setState({
        isUpload: true,
        fileInputPesquisarPDF: aux,
        })
    } 
  
    onDrop = acceptedFiles => {
        this.setState({
        fileInputPesquisarPDF: acceptedFiles,
        isUpload: true,
        });
  };
  
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
          if(Array.isArray(this.state.fileInputPesquisarPDF)){
              var aux = this.state.fileInputPesquisarPDF;
            } else {
              // provisorio, verificar necessidade de manter o fileInputPesquisarPDF dessa maneira
              var aux = Array.from(this.state.fileInputPesquisarPDF.current.files)
            }
      
            return(
              <React.Fragment>
                <PaineisDeArquivos arquivos={aux} />
                <div className='AlinhamentoPesquisarPDF'>
                  <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputJuntarPDF} adicionarArquivos={this.handleAdd.bind(this)} />
                </div>
                <PainelLateral arquivos={aux} exibir={this.state.isButtonCompressClick} executar={this.onClickCompress.bind(this)} />
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
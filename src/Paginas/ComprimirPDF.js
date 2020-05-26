import React from 'react';
import './Css/ComprimirPDF.css';
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"
import Drawer from '@material-ui/core/Drawer';
import { makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Zoom from '@material-ui/core/Zoom';
import TextoPrincipal from '../Components/TextoPrincipal.js'
import BarraProgresso from '../Components/BarraProgresso.js'
import PaineisDeArquivos from '../Components/PaineisDeArquivo.js'
import InputFileArea from '../Components/InputFileArea.js'
import TelaConclusao from '../Components/TelaConclusao.js'
import BotaoFluanteAdd from '../Components/BotaoFlutuanteAdd.js'


//Icons
import CompareArrowsRoundedIcon from '@material-ui/icons/CompareArrowsRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

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
    
    // TODO: Verificar a possibilidade de comprimir mais de um arquivo
    if(props.arquivos == null || props.nivelCompressao === 'alta'){
      return(
  
        // Utilizando classes podemos utlizar o userStyle para sobreescrever styles já presentes do componente 
        <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
          <h2 className='TitleDrawer'>Nível de Compressão</h2>
          <Divider/>
          <ButtonGroup orientation='vertical' className='SelectCompression'>
            <Button onClick={() => props.selecionarCompressao('alta')}>
                <Zoom in='true' className='Checked'>
                    <CheckCircleRoundedIcon fontSize='large' />
                </Zoom>
             <Typography variant='h6' align='left'>
                Extrema Compressão
             </Typography>
             <Typography variant='body2' align='left'>
                 Menos qualidade, alta compressão.
             </Typography>
            </Button>
            <Button onClick={() => props.selecionarCompressao('normal')}>
             <Typography variant='h6' align='left'>
                Compressão Recomendada
             </Typography>
             <Typography variant='body2' align='left'>
                 Boa qualidade, boa compressão.
             </Typography>
            </Button>
            <Button onClick={() => props.selecionarCompressao('baixa')}>
             <Typography variant='h6' align='left'>
                Baixa Compressão
             </Typography>
             <Typography variant='body2' align='left'>
                 Alta qualidade, baixa compressão.
             </Typography>
            </Button>
          </ButtonGroup>

          <Button className='ButtonDrawerComprimirPDF' variant='contained'  onClick={() => {props.executar(!props.exibir)}}>
            Comprimir PDF
            <CompareArrowsRoundedIcon fontSize='large' className="IconComprimir"/>
          </Button>
        </Drawer>
      );
    } else if(props.nivelCompressao === 'normal'){
        return(
            <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
              <h2 className='TitleDrawer'>Nível de Compressão</h2>
              <Divider/>
              <ButtonGroup orientation='vertical' className='SelectCompression'>
                <Button onClick={() => props.selecionarCompressao('alta')}>
                 <Typography variant='h6' align='left'>
                    Extrema Compressão
                 </Typography>
                 <Typography variant='body2' align='left'>
                     Menos qualidade, alta compressão.
                 </Typography>
                </Button>
                <Button onClick={() => props.selecionarCompressao('normal')}>
                 <Zoom in='true' className='Checked'>
                    <CheckCircleRoundedIcon fontSize='large' />
                 </Zoom>
                 <Typography variant='h6' align='left'>
                    Compressão Recomendada
                 </Typography>
                 <Typography variant='body2' align='left'>
                     Boa qualidade, boa compressão.
                 </Typography>
                </Button>
                <Button onClick={() => props.selecionarCompressao('baixa')}>
                 <Typography variant='h6' align='left'>
                    Baixa Compressão
                 </Typography>
                 <Typography variant='body2' align='left'>
                     Alta qualidade, baixa compressão.
                 </Typography>
                </Button>
              </ButtonGroup>
    
              <Button className='ButtonDrawerComprimirPDF' variant='contained'  onClick={() => {props.executar(!props.exibir)}}>
                Comprimir PDF
                <CompareArrowsRoundedIcon fontSize='large' className="IconComprimir"/>
              </Button>
            </Drawer>
          );
    } else if(props.nivelCompressao === 'baixa'){
        return(
            <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
              <h2 className='TitleDrawer'>Nível de Compressão</h2>
              <Divider/>
              <ButtonGroup orientation='vertical' className='SelectCompression'>
                <Button onClick={() => props.selecionarCompressao('alta')}>
                 <Typography variant='h6' align='left'>
                    Extrema Compressão
                 </Typography>
                 <Typography variant='body2' align='left'>
                     Menos qualidade, alta compressão.
                 </Typography>
                </Button>
                <Button onClick={() => props.selecionarCompressao('normal')}>
                 <Typography variant='h6' align='left'>
                    Compressão Recomendada
                 </Typography>
                 <Typography variant='body2' align='left'>
                     Boa qualidade, boa compressão.
                 </Typography>
                </Button>
                <Button onClick={() => props.selecionarCompressao('baixa')}>
                 <Zoom in='true' className='Checked'>
                   <CheckCircleRoundedIcon fontSize='large' />
                 </Zoom>
                 <Typography variant='h6' align='left'>
                    Baixa Compressão
                 </Typography>
                 <Typography variant='body2' align='left'>
                     Alta qualidade, baixa compressão.
                 </Typography>
                </Button>
              </ButtonGroup>
    
              <Button className='ButtonDrawerComprimirPDF' variant='contained'  onClick={() => {props.executar(!props.exibir)}}>
                Comprimir PDF
                <CompareArrowsRoundedIcon fontSize='large' className="IconComprimir"/>
              </Button>
            </Drawer>
          );
    }
    else {
      return(
        <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
          <h2 className='TitleDrawer'>Nível de Compressão</h2>
          <Divider/>
          <ButtonGroup orientation='vertical' className='SelectCompression'>
            {/* <Button > */}
            <Button onClick={() => props.selecionarCompressao('alta')}>
             <Typography variant='h6' align='left'>
                Extrema Compressão
             </Typography>
             <Typography variant='body2' align='left'>
                 Menos qualidade, alta compressão.
             </Typography>
            </Button>
            <Button onClick={() => props.selecionarCompressao('normal')}> 
             <Typography variant='h6' align='left'>
                Compressão Recomendada
             </Typography>
             <Typography variant='body2' align='left'>
                 Boa qualidade, boa compressão.
             </Typography>
            </Button>
            <Button onClick={() => props.selecionarCompressao('baixa')}>
             <Typography variant='h6' align='left'>
                Baixa Compressão
             </Typography>
             <Typography variant='body2' align='left'>
                 Alta qualidade, baixa compressão.
             </Typography>
            </Button>
          </ButtonGroup>

          <Button className='ButtonDrawerDisabledComprimirPDF' variant='contained' disabled>
            Comprimirs PDF
            <CompareArrowsRoundedIcon fontSize='large' className="IconComprimir"/>
          </Button>
        </Drawer>
      );
    }
  }



class ComprimirPDF extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          // mudar para false
          isUpload: false,
          isButtonCompressClick: false,
          isUploadCompleted: false, 
          fileInputComprimirPDF: React.createRef(),
          nivelCompressao: null,
      };
      this.addFilesInputComprimirPDF = React.createRef();
      this.handleOnChange = this.handleOnChange.bind(this);
      this.handleCompress = this.handleCompress.bind(this);
      this.onClickCompress = this.onClickCompress.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
  }

  // TODO: melhorar essa função quando desccobrir como serão passados os arquivos
  handleAdd() {
    const historico =  this.state.fileInputComprimirPDF;
    this.setState({
      fileInputComprimirPDF: this.addFilesInputComprimirPDF,
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
    var aux = Array.from(this.state.fileInputComprimirPDF.current.files)
      this.setState({
      isUpload: true,
      fileInputComprimirPDF: aux,
      })
  } 

  onDrop = acceptedFiles => {
      this.setState({
      fileInputComprimirPDF: acceptedFiles,
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
          <TelaConclusao title='Os PDFs foram comprimidos' modo='comprimido' />
      );
    } else if(this.state.isButtonCompressClick){
      return (
        <div className='Centralizar'>
          <BarraProgresso executar={this.handleUploadCompleted.bind(this)} exibir={this.state.isUploadCompleted} />
       </div>
      );
   } else if(this.state.isUpload){
        if(Array.isArray(this.state.fileInputComprimirPDF)){
            var aux = this.state.fileInputComprimirPDF;
          } else {
            // provisorio, verificar necessidade de manter o fileInputComprimirPDF dessa maneira
            var aux = Array.from(this.state.fileInputComprimirPDF.current.files)
          }
    
          return(
            <React.Fragment>
              <PaineisDeArquivos arquivos={aux} />
              <div className='AlinhamentoComprimirPDF'>
                <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputJuntarPDF} adicionarArquivos={this.handleAdd.bind(this)} />
              </div>
              <PainelLateral arquivos={aux} exibir={this.state.isButtonCompressClick} executar={this.onClickCompress.bind(this)} 
              nivelCompressao={this.state.nivelCompressao} selecionarCompressao={this.handleCompress.bind(this)} />
            </React.Fragment>
          );
      }else{
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

export default ComprimirPDF;
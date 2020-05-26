import React from 'react';
import './Css/ComprimirPDF.css';
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import { SortablePane, Pane } from 'react-sortable-pane';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Dropzone from "react-dropzone";
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Zoom from '@material-ui/core/Zoom';
import LinearProgress from '@material-ui/core/LinearProgress';

//Icons
import ImageIcon from '@material-ui/icons/Image';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import AddIcon from '@material-ui/icons/Add';
import CompareArrowsRoundedIcon from '@material-ui/icons/CompareArrowsRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

const drawerWidth = 400;
const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: drawerWidth,
    marginTop: 62,
    boxShadow: '0px 0px 3px 0px #9E9E9E',
  },
  barColorPrimary: {
    backgroundColor: '#FA403A',
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

function OrdemDosArquivos(props) {
    if (Array.isArray(props.arquivos)){
      
      // transformando os arquivos em um novo array
      const key = Array.from(Array(props.arquivos.length).keys());
  
      function handleDelete(index, arquivos) {
        // TODO: Implementar o botão de remover arquivos
        /* delete arquivos[index];
        const aux = 1;
        alert(index); */
      }
      
      // Utilizando o array acima para criar vários paineis que irão simbolizar os arquivos
      const panes = key.map(key => (
        <Pane key={key} className='Pane'>
          <Paper elevation='3' className="Paper">
            <IconButton onClick={handleDelete.bind(this, key, props.arquivos)} className='IconDelete'> 
              <HighlightOffRoundedIcon />
            </IconButton>
            <ImageIcon fontSize="large" className='Centralizar'/>
            <p>{props.arquivos[key].name}</p>
          </Paper>
        </Pane>
      ));
    
      return (
        <React.Fragment>
          <SortablePane direction="horizontal" margin={30} className='Panes'>
            {panes}
          </SortablePane>
        </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
            <p className='Centralizar'>
              Nenhum arquivo selecionado
            </p>
        </React.Fragment>
      );
    }
  }
  

function Texto() {
    return(
        <React.Fragment>
            <Typography variant='h4' align='center' className='LargeText'>
                    Comprimir arquivo PDF
            </Typography>
            <Typography variant='h5' align='center' className='Text'>
            Diminua o tamanho do seu arquivo PDF, mantendo a melhor qualidade possível.<br/> Otimize seus arquivos PDF.
            </Typography>
        </React.Fragment>
    );
}


function BarraProgresso(props) {

  const [completed, setCompleted] = React.useState(0);
  const classes = useStyles();

  /* 
    Efeito que faz com que a barra de progresso se mova.
    Ao chegar no valor de 100% é feita a transição para a página de concluído
  */
  React.useEffect(() => {
    function progress() {
      setCompleted((oldCompleted) => {
        if (oldCompleted === 100) {
          const time = setTimeout(() => {props.executar(!props.exibir)}, 100);
          return () => clearTimeout(time);
        }
        // Aqui é gerado o valor da porcentagem
        // TODO:Acertar esse valor quando for feita a junção com o lina PDF
        const diff = Math.floor(Math.random() * 10);
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 500);
    return () => { clearInterval(timer);  };
  }, []);


  return(
      <React.Fragment>
          <LinearProgress variant="determinate" value={completed} onCompositionEnd={() => {props.executar(!props.exibir)}} classes={{ barColorPrimary: classes.barColorPrimary }} className='BarraProgresso' />
          <Typography variant='h4' className='Text'>
            {completed}%
          </Typography>
      </React.Fragment>
  );
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
        <div className='Centralizar'>
          <Typography variant='h2' className='LargeText'>
            Os PDFs foram comprimidos!
          </Typography>
          <IconButton href='/' className='BotaoVoltar'>
            <ArrowBackRoundedIcon fontSize='Large' />
          </IconButton>
          {/* TODO: alterar o arquivo de download */}
          <a href='/hipopotamo.png' className="RemoveUnderline" download>
            <Button variant='contained'>
              <GetAppRoundedIcon className='IconDownload'/>
              Baixar o PDF combinado
            </Button>
          </a>
        </div>
      );
    } else if(this.state.isButtonCompressClick){
      return (
        <div className='Centralizar'>
          <Typography variant='h1' className='LargeText'>
              Carregando os arquivos
          </Typography>
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
              <OrdemDosArquivos arquivos={aux}>
              </OrdemDosArquivos>
              <Fab size='medium' className='BotaoFlutuanteComprimirPDF'>
                  <label for='file01' className='IconAdd'>
                    <AddIcon />
                  </label>
                  <input id="file01" type="file" accept='application/pdf' ref={this.addFilesInputComprimirPDF} onChange={this.handleAdd} className='Upload' multiple/>
              </Fab>
              <PainelLateral arquivos={aux} exibir={this.state.isButtonCompressClick} executar={this.onClickCompress.bind(this)} 
              nivelCompressao={this.state.nivelCompressao} selecionarCompressao={this.handleCompress.bind(this)} />
            </React.Fragment>
          );
      }else{
          return(
              <div>
              <Texto />
              <div className='Centralizar'>
                  <div>
                      {/* Função de Dropzone de arquivos utilizando o react-drop */}
                      <Dropzone onDrop={this.onDrop} accept="application/pdf" multiple >
                      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                          <div {...getRootProps()} className="InputFileArea">
                          <input {...getInputProps()} />
                          {!isDragActive && (<Typography variant='body2' className='Text'>Arraste e solte os PDFs aqui</Typography>)}
                          {isDragActive && !isDragReject && (<Typography variant='body2' className='Text'>Por favor, apenas PDF</Typography>)}
                          </div>
                      )}
                      </Dropzone>
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
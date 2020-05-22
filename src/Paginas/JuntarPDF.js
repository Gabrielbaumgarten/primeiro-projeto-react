import React from 'react';
import './Css/JuntarPDF.css';
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import { SortablePane, Pane } from 'react-sortable-pane';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { Box } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dropzone from "react-dropzone";

// icons
import CallMergeRoundedIcon from '@material-ui/icons/CallMergeRounded';
import AddIcon from '@material-ui/icons/Add';
import ImageIcon from '@material-ui/icons/Image';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

/* 
  Sobeescrevendo o style do drawer paper
  Por algum motivo de hierarquia o drawer não se altera utilizando css 
*/
const drawerWidth = 240;
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

/*
  Função que permite ordernar os arquivos de forma diferente
  Ela utliza o pacote react-sortable-pane externo ao react, encontrado no github
  TODO: Verificar como o LinaPDF receberá esses arquivos
*/
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


/* 
  Função que retorna os textos padrões presentes na página ao inicia-lá pela primeira vez
*/
function TextosPadrao (){
  return (
    <React.Fragment>
      <Typography variant='h4' align='center' className='LargeText'>
        Juntar arquivos PDF
      </Typography>
      <Typography variant='h5' align='center' className="Text">
        Mesclar e juntar PDFs e colocá-los em qualquer ordem que desejar.<br/>É tudo muito fácil e rápido!
      </Typography>
      <br/><br/>
    </React.Fragment>
  );
}


/* 
  Função que retorna o painel lateral após selecionar alguns arquivos
*/
function PainelLateral(props) {
  const classes = useStyles();

  // TODO: Verificar a necessidade desse null
  if(props.arquivos == null || props.arquivos.length < 2){
    return(

      // Utilizando classes podemos utlizar o userStyle para sobreescrever styles já presentes do componente 
      <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }}>
        <h2 className='TitleDrawer'>Juntar PDF</h2>
        <Divider/>
        <Box className='TextDrawer'>
          <p>Por favor, selecione mais arquivos PDF clicando novamente em 'Selecionar Arquivos PDF'.
              Selecione vários arquivos, mantendo apertado 'Ctrl'</p>
        </Box>
        <Button className='ButtonDrawerDisabled' variant='contained' disabled>
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
        <Button  variant='contained' className='ButtonDrawer' onClick={() => {props.executar(!props.exibir)}}>
          Juntar PDF
          <CallMergeRoundedIcon fontSize='large' className="IconJuntar"/>
        </Button>
      </Drawer>
    );
  }
}

/* 
  Função que entrega a barra de progresso e faz a transição de tela quando carregado
*/
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
      fileInput: React.createRef(),
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleMerge = this.handleMerge.bind(this);
    this.handleUploadCompleted = this.handleUploadCompleted.bind(this);
  }

// TODO: Ajustar essa função de adicionar arquivos, verificar como o linaPDF fará isso
  handleAdd() {
    const historico =  this.state.fileInput;
    this.setState({
      fileInput: historico,
    })
  }
  
  handleOnChange() {
    this.setState({
      isUpload: true,
    })
  }

  handleMerge(){
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
    this.setState({
      fileInput: acceptedFiles,
      isUpload: true,
    });
  };

  render() {
    if(this.state.isUploadCompleted){
      return (
        <div className='Centralizar'>
          <Typography variant='h2' className='LargeText'>
            Os PDFs foram combinados
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
    } else if(this.state.isButtonMergeClick) {
      return(
        <div className='Centralizar'>
          <Typography variant='h1' className='LargeText'>
              Carregando os arquivos
          </Typography>
          <BarraProgresso executar={this.handleUploadCompleted.bind(this)} exibir={this.state.isUploadCompleted} />
       </div>
      );
    } else if(this.state.isUpload) {

      if(Array.isArray(this.state.fileInput)){
        var aux = this.state.fileInput;
      } else {
        // provisorio, verificar necessidade de manter o fileInput dessa maneira
        var aux = Array.from(this.state.fileInput.current.files)
      }

      return(
        <React.Fragment>
          <OrdemDosArquivos arquivos={aux}>
          </OrdemDosArquivos>
          <Fab size='medium' className='BotaoFlutuante'>
              <label for='file01' className='IconAdd'>
                <AddIcon />
              </label>
              <input id="file01" type="file" accept='application/pdf' ref={this.state.fileInput} onChange={this.handleAdd} className='Upload' multiple/>
          </Fab>
          <PainelLateral arquivos={aux} exibir={this.state.isButtonMergeClick} executar={this.handleMerge.bind(this)} />
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <TextosPadrao/>
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
                <input id="files" type="file" accept='application/pdf' ref={this.state.fileInput} onChange={this.handleOnChange} className='Upload' multiple/>
              </Button>
          </div> 
        </div>
      );
    }
  }

}

export default JuntarPDFPage;

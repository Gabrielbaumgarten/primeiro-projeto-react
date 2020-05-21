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

// icons
import CallMergeRoundedIcon from '@material-ui/icons/CallMergeRounded';
import AddIcon from '@material-ui/icons/Add';
import ImageIcon from '@material-ui/icons/Image';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

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


function BarraProgresso(props) {

  const [completed, setCompleted] = React.useState(0);
  const classes = useStyles();

  React.useEffect(() => {
    function progress() {
      setCompleted((oldCompleted) => {
        if (oldCompleted === 100) {
          const time = setTimeout(() => {props.executar(!props.exibir)}, 100);
          return () => clearTimeout(time);
        }
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
      /* mudar esse valor para false*/
      isButtonMergeClick: true,
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
  render() {
    if(this.state.isUploadCompleted){
      return (
        <h1>Hello</h1>
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
      // provisorio, verificar necessidade de manter o fileInput dessa maneira
      const aux = Array.from(this.state.fileInput.current.files)
      // const aux = null;
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
            <Button variant='contained'>
              <label for="files">
                Selecionar arquivos PDF
              </label>
              <input id="files" type="file" accept='application/pdf' ref={this.state.fileInput} onChange={this.handleOnChange} className='Upload' multiple/>
            </Button>
            <Typography variant='body2' className='Text'>
              ou arraste e solte aqui
            </Typography>
          </div>
        </div>
      );
    }
  }

}

export default JuntarPDFPage;


// TODO: verificar como colocar um inputArea
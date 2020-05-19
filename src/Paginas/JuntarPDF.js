import React from 'react';
import './Css/JuntarPDF.css';
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import ImageIcon from '@material-ui/icons/Image';
import { SortablePane, Pane } from 'react-sortable-pane';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Toolbar from '@material-ui/core/Toolbar'
import { Box } from '@material-ui/core';
import CallMergeRoundedIcon from '@material-ui/icons/CallMergeRounded';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: drawerWidth,
    marginTop: 62,
    boxShadow: '0px 0px 3px 0px #9E9E9E',
  }
}));


function OrdemDosArquivos(props) {
  if (Array.isArray(props.arquivos)){
    const key = Array.from(Array(props.arquivos.length).keys());
    const panes =key.map(key => (
      <Pane key={key} className='Pane'>
        <Paper elevation='3' className="Paper">
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

function PainelLateral(props) {
  const classes = useStyles();

  if(props.arquivos == null || props.arquivos.length < 2){
    return(
      <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }} className='Drawer'>
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
      <Drawer variant='permanent' anchor='right' classes={{ paper: classes.drawerPaper }} className='Drawer'>
        <h2 className='TitleDrawer'>Juntar PDF</h2>
        <Divider/>
        <Box className='TextDrawer'>
          <p>Para alterar a ordem dos seus PDFs, arraste e solte os arquivos como entender.</p>
        </Box>
        <Button  variant='contained' className='ButtonDrawer'>
          Juntar PDF
          <CallMergeRoundedIcon fontSize='large' className="IconJuntar"/>
        </Button>
      </Drawer>
    );
  }
}

class JuntarPDFPage extends React.Component {

  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      /* mudar esse valor para false*/
      isUpload: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  
  handleOnChange() {
    this.setState({
      isUpload: true,
    })
  }
  
  render() {
    if(this.state.isUpload) {
      // provisorio, verificar necessidade de manter o fileInput dessa maneira
      const aux = Array.from(this.fileInput.current.files)
      // const aux = null;
      return(
        
        <React.Fragment>
          <OrdemDosArquivos arquivos={aux}/>
          <PainelLateral arquivos={aux}/>
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
              <input id="files" type="file" accept='application/pdf' ref={this.fileInput} onChange={this.handleOnChange} className='Upload' multiple/>
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

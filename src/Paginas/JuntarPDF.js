import React from 'react';
import './Css/JuntarPDF.css';
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import ImageIcon from '@material-ui/icons/Image';
import { SortablePane, Pane } from 'react-sortable-pane';
import Drawer from '@material-ui/core/Drawer';


function OrdemDosArquivos(props) {
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
      return(
        <React.Fragment>
          <OrdemDosArquivos arquivos={aux}/>
          <Drawer anchor='right' variant='permanent' className='Drawer'>
            <h1>Hello world</h1>  
          </Drawer>
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

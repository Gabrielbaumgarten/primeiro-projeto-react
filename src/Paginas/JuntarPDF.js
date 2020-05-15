import React from 'react';
import './Css/JuntarPDF.css';
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import ImageIcon from '@material-ui/icons/Image';

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
      isUpload: true,
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
      return(
        <div>
          <Paper elevation='3' className="Paper">
            {/*<p>{this.fileInput.current.files[0].name}</p>*/}
            <ImageIcon fontSize="large" className='Centralizar'/>
            <p>nome do aquivo</p>
          </Paper>
        </div>
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

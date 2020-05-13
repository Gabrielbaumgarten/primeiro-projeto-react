import React from 'react';
import './Css/JuntarPDF.css';
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"


const JuntarPDFPage = () => (
  <div>
    <Typography variant='h4' align='center' className='LargeText'>
      Juntar arquivos PDF
    </Typography>
    <Typography variant='h5' align='center' className="Text">
      Mesclar e juntar PDFs e colocá-los em qualquer ordem que desejar.<br/>É tudo muito fácil e rápido!
    </Typography>
    <br/><br/>
    <div className='BotaoSelecArq'>
      <Button variant='contained'>
        Selecionar arquivos PDF
      </Button>
      <Typography variant='body2' className='Text'>
        ou arraste e solte aqui
      </Typography>
    </div>
  </div>
);

export default JuntarPDFPage;

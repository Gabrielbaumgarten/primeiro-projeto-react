import React from 'react';
import './Css/Padrao.css';
import Paper from "@material-ui/core/Paper"
import { SortablePane, Pane } from 'react-sortable-pane';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import PDFViewer from 'pdf-viewer-reactjs'

// TODO: Verificar se está mudando a ordem do arquivo no array
function PaineisDeArquivos(props) {
    if (Array.isArray(props.arquivos)){
      
      function test(arquivo,index) {
        return(
          <Pane key={index} className='Pane'>
           <Paper elevation='3' className="Paper">
             <IconButton onClick={props.removerArquivo.bind(this,index)} className='IconDelete'> 
               <HighlightOffRoundedIcon />
             </IconButton>
             <PDFViewer document={{url: 'VPN Patriarca.pdf'}} css='Pdf' scale={0.25} hideNavbar/>
             {/* <ImageIcon fontSize="large" className='Centralizar'/> */}
             <p>{arquivo.name}</p>
           </Paper>
         </Pane>
        );
      }
      
      // Utilizando o array acima para criar vários paineis que irão simbolizar os arquivos
      const panes = props.arquivos.map(arquivo => test(arquivo, props.arquivos.indexOf(arquivo)));
    
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

  export default PaineisDeArquivos;
import React from 'react';
import './Css/Padrao.css';
import Paper from "@material-ui/core/Paper"
import { SortablePane, Pane } from 'react-sortable-pane';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

function PaineisDeArquivos(props) {
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

  export default PaineisDeArquivos;
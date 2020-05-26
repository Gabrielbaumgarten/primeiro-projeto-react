import React from 'react';
import './Css/Padrao.css';
import AddIcon from '@material-ui/icons/Add';
import  Fab  from '@material-ui/core/Fab';

function BotaoFluanteAdd(props) {
    return (
        <Fab size='medium' className='BotaoFlutuanteJuntarPDF'>
              <label for='file01' className='IconAdd'>
                <AddIcon />
              </label>
              <input id="file01" type="file" accept='application/pdf' ref={props.arquivosAdicionados} onChange={props.adicionarArquivos} className='Upload' multiple/>
          </Fab>
    );
}

export default BotaoFluanteAdd;
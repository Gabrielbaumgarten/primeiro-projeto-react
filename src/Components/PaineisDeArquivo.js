import React from 'react';
import { useState, useEffect } from  'react'
import './Css/Padrao.css';
import Paper from "@material-ui/core/Paper"
import { SortablePane, Pane } from 'react-sortable-pane';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import PDFViewer from 'pdf-viewer-reactjs'

// TODO: Verificar se está mudando a ordem do arquivo no array
// function PaineisDeArquivos(props) {
class PaineisDeArquivos extends React.Component{
  constructor(props) {
    super(props);
    this.Paineis = this.Paineis.bind(this);
    this.Leitor = this.Leitor.bind(this);
  }

  Paineis(arquivo,index,pdf) {

    return(
      <Pane key={index} className='Pane'>
        <Paper elevation='3' className="Paper">
          <IconButton onClick={this.props.removerArquivo.bind(this,index)} className='IconDelete'> 
            <HighlightOffRoundedIcon />
          </IconButton>
          <PDFViewer document={{ base64: pdf[index] }} css='Pdf' scale={0.25} hideNavbar/>
          <p>{arquivo.name}</p>
        </Paper>
      </Pane>
    );
  }

  Leitor(arquivo){
    var reader = new FileReader();
    reader.onload = (e) =>{
      const content = e.target.result;
      this.pdf = content.split(',')[1];
      this.forceUpdate();
    }
    reader.readAsDataURL(arquivo);
  }

  render() {
  if (Array.isArray(this.props.arquivos)){
    // Utilizando o array acima para criar vários paineis que irão simbolizar os arquivos
    const panes = this.props.arquivos.map(arquivo => this.Paineis(arquivo, this.props.arquivos.indexOf(arquivo), this.props.pdf64));


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
}

  export default PaineisDeArquivos;
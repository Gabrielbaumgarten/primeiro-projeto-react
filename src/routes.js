import React from 'react';
import MainPage from'./Paginas/Principal.js'
import JuntarPDFPage from './Paginas/JuntarPDF.js'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ComprimirPDFPage from './Paginas/ComprimirPDF.js';
import PesquisarPDFPage from './Paginas/PesquisarPDF.js';
import PDFtoJPGPage from './Paginas/PDFtoJPG.js';

/* 
  Aqui são definadas as rotas para as outra páginas junto com suas urls

  IMPORTANTE: Lembre de importar a página que você dejesa que ela apareça
*/
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component = {MainPage} />
      <Route exact path='/JuntarPDF' component = {JuntarPDFPage} />
      <Route exact path='/ComprimirPDF' component = {ComprimirPDFPage} />
      <Route exact path='/PesquisarPDF' component = {PesquisarPDFPage} />
      <Route exact path='/PDFtoJPG' component = {PDFtoJPGPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

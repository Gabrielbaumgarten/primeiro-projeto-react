import React from 'react';
import MainPage from'./Paginas/Principal.js'
import JuntarPDFPage from './Paginas/JuntarPDF.js'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ComprimirPDF from './Paginas/ComprimirPDF.js';

/* 
  Aqui são definadas as rotas para as outra páginas junto com suas urls

  IMPORTANTE: Lembre de importar a página que você dejesa que ela apareça
*/
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component = {MainPage} />
      <Route exact path='/JuntarPDF' component = {JuntarPDFPage} />
      <Route exact path='/ComprimirPDF' component = {ComprimirPDF} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

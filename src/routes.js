import React from 'react';
import MainPage from'./Paginas/Principal.js'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component = {MainPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

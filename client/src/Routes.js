import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact patch='/' component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Users from './views/users/Users';

const Router = () => (
  <Fragment>
    <Header />

    <BrowserRouter>
      <Switch>
        <Route
          exact
          path='/'
          component={Users}
        />
        <Redirect to={'/'} />
      </Switch>
    </BrowserRouter>
  </Fragment>
);

export default Router;

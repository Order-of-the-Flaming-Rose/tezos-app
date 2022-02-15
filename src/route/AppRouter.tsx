import { Route, Switch, Redirect } from 'react-router-dom';

import React from 'react';
import Home from '../pages/Home';
import Summary from '../pages/Summary';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

function AppRouter() {
  return (
    <main>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/summary' />
        </Route>
        <Route exact path='/home' component={Home} />
        <Route exact path='/summary' component={Summary} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/sign-up' component={SignUp} />
      </Switch>
    </main>
  );
}

export default AppRouter;

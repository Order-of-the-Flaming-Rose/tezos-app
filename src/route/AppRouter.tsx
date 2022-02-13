import { Route, Switch, Redirect } from 'react-router-dom';

import React from 'react';
import Home from '../pages/Home';
import Summary from '../pages/Summary';

function AppRouter() {
  return (
    <main>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
        <Route exact path='/home' component={Home} />
        <Route exact path='/summary' component={Summary} />
      </Switch>
    </main>
  );
}

export default AppRouter;

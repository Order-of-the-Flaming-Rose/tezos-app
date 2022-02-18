import { Route, Switch, Redirect } from 'react-router-dom';

import React from 'react';
import Home from '../pages/Home';
import Summary from '../pages/Summary';
import Billing from '../pages/Billing';

function AppRouter() {
  return (
    <main>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
        <Route path='/home' component={Home} />
        <Route path='/summary' component={Summary} />
        <Route path='/billing' component={Billing} />
      </Switch>
    </main>
  );
}

export default AppRouter;

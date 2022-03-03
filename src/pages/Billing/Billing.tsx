import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Buy from '../../components/Buy';
import Increase from '../../components/Increase';
import styles from './Billing.module.scss';

function Billing() {
  return (
    <div className={styles.billing}>
      <nav className={styles.billing__navigation}>
        <li className={styles.billing__link}>
          <button type='button' className={styles.billing__btn}>
            increase your balance
          </button>
        </li>
      </nav>
      <div className={styles.billing__body}>
        <Switch>
          <Route exact path='/billing'>
            <Redirect to='/billing/buy' />
          </Route>
          <Route path='/billing/buy' component={Buy} />
          <Route path='/billing/increase' component={Increase} />
        </Switch>
      </div>
    </div>
  );
}

export default Billing;

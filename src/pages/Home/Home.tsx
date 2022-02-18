/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-debugger */
import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Login from '../../components/Login';
import SignUp from '../../components/SignUp';
// import { useWalletContext } from '../../contexts/WalletContext/WalletContext';
import styles from './Home.module.scss';

function Home() {
  // const { auth, walletAddress } = useWalletContext();
  let { path, url } = useRouteMatch();
  console.log(url);
  const auth = true;
  return (
    <div className={styles.home}>
      <div className={styles.home__left}>
        <h2 className={styles.home__title}>home page</h2>
        <div className={styles.home__logo}>ꜩ</div>
      </div>
      <div className={styles.home__right}>
        {!auth ? (
          'Me'
        ) : (
          <Switch>
            <Route exact path={`${url}/`}>
              <Redirect to={`${url}/login`} />
            </Route>
            <Route path={`${url}/login`} component={Login} />
            <Route path={`${url}/sign-up`} component={SignUp} />
          </Switch>
        )}
      </div>
    </div>
  );
}

export default Home;

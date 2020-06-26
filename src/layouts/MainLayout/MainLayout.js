import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import './global.scss';
import Countries from '../../components/Countries/Countries';
import DetailedView from '../../components/DetailedView/DetailedView';

const MainLayout = () => {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Countries />
        <Switch>
          <Route exact path='/:slug'>
            <DetailedView />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default MainLayout;

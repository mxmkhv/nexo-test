import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import './global.scss';
import CountryListing from '../../components/CountryListing/CountryListing';
import DetailedView from '../../components/DetailedView/DetailedView';
import Heading from '../../components/Heading/Heading';

const MainLayout = () => {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Heading />
        <CountryListing />
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

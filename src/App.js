import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from './components/Button/Button';
import Countries from './components/Countries/Countries';
import styles from './App.module.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Countries />
        <Button title='Get stats' callback={this.props.onFetchData} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchData: () => {
      fetch('https://api.covid19api.com/summary')
        .then(res => res.json())
        .then(data => dispatch({ type: 'FETCH_DATA', data }));
    }
  };
};

export default connect(null, mapDispatchToProps)(App);

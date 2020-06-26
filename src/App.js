import React, { Component } from 'react';
import Button from './components/Button/Button';
import styles from './App.module.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Button title='Get stats' />
      </div>
    );
  }
}

export default App;

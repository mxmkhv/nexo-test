import React from 'react';
import styles from './Loader.module.scss';
import VirusImage from '../../images/virus.svg';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src={VirusImage} alt='loader' />
    </div>
  );
};

export default Loader;

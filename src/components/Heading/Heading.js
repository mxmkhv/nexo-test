import React from 'react';
import styles from './Heading.module.scss';
import VirusImage from '../../images/virus.svg';

const Heading = () => {
  return (
    <div className={styles.container}>
      <img src={VirusImage} alt='virius' />
      <h1>COVID-O-METER</h1>
      <img src={VirusImage} alt='virius' />
    </div>
  );
};

export default Heading;

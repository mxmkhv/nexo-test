import React from 'react';
import styles from './DetailedView.module.scss';
import { Link, useParams } from 'react-router-dom';

const DetailedView = () => {
  let { slug } = useParams();

  return (
    <div className={styles.container}>
      <h1>{slug}</h1>
      <Link to='/'>Close</Link>
    </div>
  );
};

export default DetailedView;

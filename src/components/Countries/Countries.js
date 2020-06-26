import React from 'react';
import { connect } from 'react-redux';
import styles from './Countries.module.scss';
import Button from '../Button/Button';

const Countries = props => {
  console.log(props.data);
  const list = props.data
    ? props.data.Countries.slice(0, 10).map((item, index) => (
        <li key={`country-${index}`} className={styles.listItem}>
          <span>{item.Country}</span>
          <span>{item.TotalConfirmed}</span>
          <Button title='More details' />
        </li>
      ))
    : null;

  return <div className={styles.container}>{<ul className={styles.list}>{list}</ul>}</div>;
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default connect(mapStateToProps)(Countries);

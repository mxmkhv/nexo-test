import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Countries.module.scss';
import Button from '../Button/Button';

const Countries = props => {
  const list =
    props.countries && props.countries.length > 0 ? (
      <table className={styles.table}>
        <thead>
          <tr className={[styles.row, styles.header].join(' ')}>
            <th>Country</th>
            <th>Total infected</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.countries.slice(0, 10).map(country => (
            <tr key={country.Slug} className={styles.row}>
              <th>{country.Country}</th>
              <th>{country.TotalConfirmed}</th>
              <th>
                <Link to={`/country/${country.Slug}`}>More details</Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    ) : null;

  const fetchButton = props.countries ? null : (
    <Button title='Get stats' onClick={props.onFetchData} />
  );

  return (
    <div className={styles.container}>
      {list}
      {fetchButton}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    countries: state.countries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchData: () => {
      fetch('https://api.covid19api.com/summary')
        .then(res => res.json())
        .then(data => dispatch({ type: 'FETCH_DATA', data }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Countries);

import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Countries.module.scss';
import Button from '../Button/Button';

const Countries = props => {
  const mostInfectedCountries = () => {
    return props.countries.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1));
  };

  if (props.countries) {
    console.log(mostInfectedCountries());
  }

  const list =
    props.countries && props.countries.length > 0 ? (
      <table className={styles.table}>
        <thead>
          <tr className={[styles.row, styles.header].join(' ')}>
            <th width='10%'>No</th>
            <th width='50%'>Country</th>
            <th>Total infected</th>
          </tr>
        </thead>
        <tbody>
          {mostInfectedCountries()
            .slice(0, 10)
            .map((country, index) => (
              <NavLink
                to={`/${country.Slug}`}
                className={styles.link}
                activeClassName={styles.active}
              >
                <tr key={country.Slug} className={styles.row}>
                  <th width='10%'>{index + 1}.</th>
                  <th width='50%'>{country.Country}</th>
                  <th>{country.TotalConfirmed}</th>
                </tr>
              </NavLink>
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

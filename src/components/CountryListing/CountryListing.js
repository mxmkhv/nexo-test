import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './CountryListing.module.scss';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import ConspiracyModal from '../ConspiracyModal/ConspiracyModal';
import { sortCountries, formatNumber } from '../../utils/utils';

const CountryListing = ({ countries, fetchData }) => {
  const [sortOrder, setSortOrder] = useState('ascending');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mostInfectedCountries = countries
    ? countries.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1)).slice(0, 10)
    : [];

  const toggleSort = () => {
    if (sortOrder === 'ascending') {
      setSortOrder('descending');
    }
    if (sortOrder === 'descending') {
      setSortOrder('ascending');
    }
  };

  const list =
    countries && !isLoading ? (
      <table className={styles.table}>
        <thead>
          <tr className={[styles.row, styles.header].join(' ')}>
            <th width='10%'>No</th>
            <th width='45%'>Country</th>
            <th width='30%'>
              <button className={styles.sortButton} onClick={toggleSort}>
                Infected people
                {sortOrder === 'ascending' ? (
                  <span role='img' aria-label='sort direction' className={styles.sortIcon}>
                    &#128317;
                  </span>
                ) : (
                  <span role='img' aria-label='sort direction' className={styles.sortIcon}>
                    &#128316;
                  </span>
                )}
              </button>
            </th>
            <th width='15%'>More</th>
          </tr>
        </thead>
        <tbody>
          {sortCountries(mostInfectedCountries, sortOrder, 'TotalConfirmed').map(
            (country, index) => (
              <tr className={styles.row} key={country.Slug}>
                <th width='10%'>{index + 1}.</th>
                <th width='45%'>{country.Country}</th>
                <th width='30%'>{formatNumber(country.TotalConfirmed)}</th>
                <th width='15%'>
                  <NavLink
                    to={`/${country.Slug}`}
                    className={styles.link}
                    activeClassName={styles.active}
                  >
                    Details
                  </NavLink>
                </th>
              </tr>
            )
          )}
        </tbody>
      </table>
    ) : null;

  const fetchButton = countries ? null : (
    <Button type='primary' title='Get terrified' onClick={() => fetchData(setIsLoading)} />
  );

  const truthButton = countries ? (
    <Button type='secondary' title='See the truth' onClick={() => setIsOpen(true)} />
  ) : null;

  return (
    <div className={styles.container}>
      {isLoading ? <Loader /> : null}
      {list}
      {fetchButton}
      {truthButton}
      {isOpen ? <ConspiracyModal isOpen={setIsOpen} /> : null}
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
    fetchData: setIsLoading => {
      setIsLoading(true);
      fetch('https://api.covid19api.com/summary')
        .then(res => res.json())
        .then(data => {
          setIsLoading(false);
          dispatch({ type: 'FETCH_DATA', data });
        });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryListing);

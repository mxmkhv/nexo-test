import React, { useState } from 'react';
import styles from './DetailedView.module.scss';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import HistoryModal from '../HistoryModal/HistoryModal';
import Button from '../Button/Button';
import CloseIcon from '../../images/close.svg';

const DetailedView = props => {
  let { slug } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    props.fetchCountryData(slug);
  };

  let details = props.countries ? props.countries.find(country => country.Slug === slug) : null;

  let countryDetails = details ? (
    <div>
      <h2>{details.Country}</h2>
      <div>
        <h3>Total Confirmed:</h3>
        <h4>{details.TotalConfirmed}</h4>
        <h3>Total Deaths:</h3>
        <h4>{details.TotalDeaths}</h4>
        <h3>Total Recovered:</h3>
        <h4>{details.TotalRecovered}</h4>
      </div>
    </div>
  ) : null;

  return (
    <div className={styles.container}>
      {countryDetails}
      <Link className={styles.close} to='/'>
        <img src={CloseIcon} alt='close' />
      </Link>
      <div>
        <Button type='secondary' title='Infection history' onClick={openModal} />
      </div>
      {isOpen ? <HistoryModal isOpen={setIsOpen} /> : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    countries: state.countries,
    countryData: state.countryData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCountryData: slug => {
      fetch(`https://api.covid19api.com/total/country/${slug}`)
        .then(res => res.json())
        .then(data =>
          dispatch({
            type: 'FETCH_COUNTRYDATA',
            data
          })
        );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);

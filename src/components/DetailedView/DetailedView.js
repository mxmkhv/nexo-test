import React, { useState } from 'react';
import styles from './DetailedView.module.scss';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import HistoryModal from '../HistoryModal/HistoryModal';
import Button from '../Button/Button';
import CloseIcon from '../../images/close.svg';
import { formatNumber } from '../../utils/utils';

const DetailedView = props => {
  let { slug } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  let details = props.countries ? props.countries.find(country => country.Slug === slug) : null;

  let countryDetails = details ? (
    <>
      <h2>{details.Country}</h2>
      <div className={styles.stats}>
        <h3>Total Confirmed:</h3>
        <span>{formatNumber(details.TotalConfirmed)}</span>
        <h3>Total Deaths:</h3>
        <span>{formatNumber(details.TotalDeaths)}</span>
        <h3>Total Recovered:</h3>
        <span>{formatNumber(details.TotalRecovered)}</span>
      </div>
    </>
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
      {isOpen ? <HistoryModal slug={slug} isOpen={setIsOpen} /> : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    countries: state.countries
  };
};

export default connect(mapStateToProps)(DetailedView);

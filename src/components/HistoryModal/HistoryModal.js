import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import moment from 'moment';
import CloseIcon from '../../images/close.svg';
import styles from './HistoryModal.module.scss';
import { sortByDate } from '../../utils/utils';

const HistoryModal = props => {
  let { slug } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sortData = data => (data ? sortByDate(data, 'Date') : []);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.covid19api.com/total/country/${slug}`)
      .then(res => res.json())
      .then(data => {
        setCountryData(data);
        setIsLoading(false);
      });
  }, [slug]);

  return (
    <Modal>
      <div className={styles.overlay} />
      <div className={styles.modal}>
        <div className={styles.heading}>
          <h3>Infection history</h3>
          <img src={CloseIcon} alt='close' onClick={() => props.isOpen(false)} />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.history}>
            <table className={styles.table}>
              <thead>
                <tr className={[styles.row, styles.header].join(' ')}>
                  <th>Date</th>
                  <th>Confirmed</th>
                  <th>Recovered</th>
                  <th>Deaths</th>
                </tr>
              </thead>
              <tbody>
                {sortData(countryData).map(day => (
                  <tr key={day.Date}>
                    <th>{moment(day.Date).format('DD-MM-YYYY')}</th>
                    <th>{day.Confirmed}</th>
                    <th>{day.Recovered}</th>
                    <th>{day.Deaths}</th>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button type='primary' title='Close' onClick={() => props.isOpen(false)} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default HistoryModal;

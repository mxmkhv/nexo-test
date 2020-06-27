import React from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import moment from 'moment';
import CloseIcon from '../../images/close.svg';
import styles from './HistoryModal.module.scss';
import { sortByDate } from '../../utils/utils';

const HistoryModal = ({ countryData, isOpen }) => {
  let sortedData = countryData ? sortByDate(countryData, 'Date') : [];

  return (
    <Modal>
      <div className={styles.overlay} />
      <div className={styles.modal}>
        <div className={styles.heading}>
          <h3>Infection history</h3>
          <img src={CloseIcon} alt='close' onClick={() => isOpen(false)} />
        </div>
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
              {sortedData.map(day => (
                <tr key={day.Date}>
                  <th>{moment(day.Date).format('DD-MM-YYYY')}</th>
                  <th>{day.Confirmed}</th>
                  <th>{day.Recovered}</th>
                  <th>{day.Deaths}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <Button type='primary' title='Close' onClick={() => isOpen(false)} />
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    countryData: state.countryData
  };
};

export default connect(mapStateToProps)(HistoryModal);

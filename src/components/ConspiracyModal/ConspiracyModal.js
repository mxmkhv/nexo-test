import React from 'react';
import Modal from '../Modal/Modal';
import TheProphet from '../../images/bill.gif';
import styles from './ConspiracyModal.module.scss';

const ConspiracyModal = ({ isOpen }) => {
  return (
    <Modal>
      <div className={styles.overlay} onClick={() => isOpen(false)} />
      <div className={styles.modal}>
        <img src={TheProphet} alt='bill' />
      </div>
    </Modal>
  );
};

export default ConspiracyModal;

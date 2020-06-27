import React from 'react';
import styles from './Button.module.scss';

const Button = props => {
  return (
    <button className={[styles.button, styles[props.type]].join(' ')} onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export default Button;

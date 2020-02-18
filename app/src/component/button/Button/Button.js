import React from 'react';
import { withLogIn } from '../../../Hoc/withLogIn/withLogIn';
import styles from './Button.module.css';

export const Button = ({ title, onClick, className, hint }) => {
    const btnStyles = styles.btn + ' ' + className;

    return (
        <button onClick={onClick} className={btnStyles} title={hint} >
            {title}
        </button>
    );
}

export const ButtonWithLogIn = withLogIn(Button);
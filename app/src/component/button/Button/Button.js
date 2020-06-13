import React from 'react';
import { withLogIn } from '../../../Hoc/withLogIn/withLogIn';
import styles from './Button.module.css';
import { useHistory } from 'react-router-dom';

export const Button = ({ title, onClick, className, hint }) => {
    const btnStyles = className ? className : styles.btn;
    const history = useHistory();

    return (
        <button onClick={e => onClick(e,history)} className={btnStyles} title={hint} >
            {title}
        </button>
    );
}

export const ButtonWithLogIn = withLogIn(Button);
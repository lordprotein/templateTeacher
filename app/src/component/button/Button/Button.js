import React from 'react';
import { withLogIn } from '../../../Hoc/withLogIn/withLogIn';


export const Button = ({ title, onClick, className }) => {
    return (
        <button onClick={onClick} className={className}>
            {title}
        </button>
    );
}

export const ButtonWithLogIn = withLogIn(Button);
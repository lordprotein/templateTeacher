import React from 'react';
import { withLogin } from '../../../Hoc/withLogin/withLogin';


export const Button = ({ title, onClick, className }) => {
    return (
        <button onClick={onClick} className={className}>
            {title}
        </button>
    );
}

export const ButtonWithLogin = withLogin(Button);
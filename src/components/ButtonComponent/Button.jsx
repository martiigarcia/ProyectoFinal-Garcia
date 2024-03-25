import React from 'react';
import './Button.css'

const Button = ({texto, clase, id, disabled, handleClick}) => {

    return (
        <button
            onClick={handleClick}
            id={id}
            className={clase}
            disabled={disabled}>
            {texto}
        </button>
    )
};

export default Button;
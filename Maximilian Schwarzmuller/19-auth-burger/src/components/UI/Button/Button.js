import React from 'react';
import classes from './Button.module.css';

const button = (props) => (
    <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.buttonType]].join(' ')}
        onClick={props.clicked}>
        {props.children}
    </button>
);

export default button;
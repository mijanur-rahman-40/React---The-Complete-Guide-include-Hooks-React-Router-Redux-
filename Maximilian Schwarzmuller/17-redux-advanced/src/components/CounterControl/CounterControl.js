import React from 'react';
import './CounterControl.css';

const counterControl = (props) => (
    <div className="CounterControl" onClick={props.clicked}>
        <big> {props.label}</big>
    </div>
);

export default counterControl;
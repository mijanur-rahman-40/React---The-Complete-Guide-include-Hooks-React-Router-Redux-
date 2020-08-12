import React from 'react';
import './CounterOutput.css';

const counterOutput = (props) => (
    <div className="CounterOutput">
        Current Counter : <big>{props.value}</big>
    </div>
);

export default counterOutput;
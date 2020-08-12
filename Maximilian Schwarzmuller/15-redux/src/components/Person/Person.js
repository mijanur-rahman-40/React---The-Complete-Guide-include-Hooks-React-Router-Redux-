import React from 'react';

import './Person.css';

const person = (props) => (
    <div className="Person" onClick={props.clicked}>
        <p>Name: <big>{props.name}</big></p>
        <p>Age: <big>{props.age}</big></p>
    </div>
);

export default person;
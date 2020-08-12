import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Cockpit.module.css';

const Cockpit = ({ showPersons, persons, appTitle, clicked, login }) => {
    const assignedClasses = [];
    let buttonClass = classes.Button;

    if (showPersons) {
        buttonClass = [classes.Button, classes.Red].join(' ');
    }

    if (persons.length <= 2) {
        assignedClasses.push(classes.red);
    }
    if (persons.length <= 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        <Aux>
            <h1 className={ classes.appTitle }>{ appTitle }</h1>
            <p className={ assignedClasses.join(' ') }>This is really working!</p>
            <button
                className={ buttonClass }
                onClick={ clicked }>Toggle Persons</button>
            <button onClick={ login } style={{marginLeft:'10px'}}>Log in</button>
        </Aux>
    );
};

export default Cockpit;
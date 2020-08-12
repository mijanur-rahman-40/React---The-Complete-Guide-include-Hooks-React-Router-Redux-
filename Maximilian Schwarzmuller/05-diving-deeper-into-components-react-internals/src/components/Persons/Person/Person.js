import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSuggest from 'react-autosuggest';
import classes from './Person.module.css';
import WithClass from '../../../hoc/WithClass';
import Aux from '../../../hoc/Aux';
import { AuthContext } from '../../../containers/App';

// reference is only available in statefull component
class Person extends Component {
    constructor(props) {
        super(props);
        console.log("[Person.js] Inside Constructor", props);
        this.inputElement = React.createRef();

    }

    componentWillMount() {
        console.log("[Person.js] Inside componentWillMount()");
    }

    componentDidMount() {
        console.log("[Person.js] Inside componentDidMount()");
        if (this.props.position === 0) {
            // it is the older version of process to call ref 
            // this.inputElement.focus();
            // newer version
            this.inputElement.current.focus();
        }
    }

    focus() {
        this.inputElement.current.focus();
    }
    render() {
        console.log("[Person.js] Inside render()");

        return (
            // <WithClass classes={ classes.person }>
            //     <p onClick={ click }>I'm { name } and I am { age } years old!</p>
            //     <p>{ children }</p>
            //     <input type="text" onChange={ changed } value={ name } />
            // </WithClass>
            // Aux helps to possible to return a multiple elemnts without a wrapping element
            <Aux>
                {/* getting the context by using Consumner that we created in the App.js file */ }

                <AuthContext.Consumer>
                    {/* getting the authenticated value by executing the react default method system to get the context value that we passed before */ }
                    {/* the passing value can be object or any bollean */}
                    { (authenticated) => authenticated ? <p>I'm authenticated </p> : null }
                </AuthContext.Consumer>
                {/* { this.props.authenticated ? <p>I'm authenticated </p> : null } */ }
                <p onClick={ this.props.click }>I'm { this.props.name } and I am { this.props.age } years old!</p>
                <p>{ this.props.children }</p>
                {/* ref is a special element for like key in react */ }
                <input
                    // create inputElement is the property of this class
                    // can be called anywhere of this class
                    // in the updated version in react ref can be used in different way(declare ref into the class constructor)
                    // ref={(input)=> this.inputElement = input}
                    ref={ this.inputElement }
                    type="text"
                    onChange={ this.props.changed }
                    value={ this.props.name } />
            </Aux>
        );

        // we can return a array with Jsx element(with key property)
        // return [
        //     <p key='1' onClick={ click }>I'm { name } and I am { age } years old!</p>,
        //     <p key='2'>{ children }</p>,
        //     <input key='3' type="text" onChange={ changed } value={ name } />
        // ]
    }
}

// PropTypes is used to check the props(property) types is valid type of input or not that we required.
// Basically restrict the props input type 

// in the state age type is not correct for first object
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default WithClass(Person, classes.Person);

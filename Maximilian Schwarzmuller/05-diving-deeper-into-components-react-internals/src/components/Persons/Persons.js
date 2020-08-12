import React, { PureComponent, Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
    constructor(props) {
        super(props);
        console.log('[Persons.js] Inside Constructor', props);
        // forwarded references
        // outside of a component through that component
        // helpfull with wrapper class
        this.lastPersonRef = React.createRef();
    }

    // lifecycle hooks
    // componentWillMount() {

    // }

    UNSAFE_componentWillMount() {
        console.log('[Persons.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Persons.js] Inside componentDidMount()');
        this.lastPersonRef.current.focus();
    }

    // when this component receive any updated(new) props
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        console.log('[Update Persons.js] Inside componentWillReceiveProps', nextProps, nextContext)
    }

    // componentWillReceiveProps(nextProps, nextContext) {
    //     console.log('[Update Person.js] Inside componentWillReceiveProps', nextProps)
    // }

    // It provides permission to the component to update
    // Basically it returns true or false
    // if true -> give the permission to update
    // if false -> do not give permission
    /** 
     * If you use PureComponent then not to need implement shouldComponentUpdate.because this PureComponent automatically check shouldComponentUpdate
     * should only use if the updates might not be required
    */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('[Update Person.js] Inside shouldComponentUpdate',
            nextProps, nextState)
        // it only compare the objects
        // if check with other props(without persons) then result will not be same

        console.log(nextProps.person !== this.props.persons);
        // this is the imediatelly component props 
        console.log(this.props.persons);
        // return false;
        return nextProps.person !== this.props.persons ||
            nextProps.changed !== this.props.changed ||
            nextProps.clicked !== this.props.clicked;
    }

    // normally sequencially followed by and  print the updated props
    UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('[Update Person.js] Inside componentWillUpdate',
            nextProps, nextState)
    }
    // componentWillUpdate(nextProps, nextState, nextContext) {
    //     console.log('[Update Person.js] Inside componentWillUpdate',
    //         nextProps, nextState)
    // }

    // get the prevProps when a component is updated
    componentDidUpdate(prevProps, prevState) {
        console.log('[Update Person.js] Inside componentDidUpdate',
            prevProps, prevState)
    }

    render() {
        console.log('[Persons.js] Inside render()')

        return this.props.persons.map((person, index) => {
            return <Person
                click={ () => this.props.clicked(index) }
                name={ person.name }
                position={ index }
                age={ person.age }
                ref={ this.lastPersonRef }
                // forwardedRef={ this.lastPersonRef }
                // authenticated={ isAuthenticated}
                key={ person.id }
                changed={ (event) => this.props.changed(event, person.id) }
            />
        });
    }
}

export default Persons;

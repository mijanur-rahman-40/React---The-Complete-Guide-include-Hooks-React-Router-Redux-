import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';
import Aux from '../hoc/Aux';

// React context is a global state or global settings
// set default value authenticate is false
export const AuthContext = React.createContext(false)

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor', props);

    this.state = {
      persons: [
        { id: '1', name: 'Max', age: '28' },
        { id: '2', name: 'Manu', age: 29 },
        { id: '3', name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    }
  }

  UNSAFE_componentWillMount() {
    console.log('[App.js] Inside componentWillMount()')
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()')
  }

  // It provides permission to the component to update
  // Basically it returns true or false
  // if true -> give the permission to update
  // if false -> do not give permission
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('[Update App.js] Inside shouldComponentUpdate',
      nextProps, nextState)
    // return true;
    console.log(nextState.persons);
    console.log(this.state.persons);

    return nextState.person !== this.state.persons ||
      nextState.showPersons !== this.state.showPersons;
  }

  // Called immediately before rendering when new props or state is received. Not called for the initial render.
  // normally sequencially followed by and  print the updated props
  UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) {
    console.log('[Update App.js] Inside componentWillUpdate',
      nextProps, nextState)
  }

  // can be used in the replace of componentWillUpdate
  // it is invocked when props are updated and it gives a chance of updating the state amongs with them
  // it is a static method so basically a method which is not attached to a single instance
  // it is called before render() method
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('[Update App.js] Inside getDerivedStateFromProps',
      nextProps, prevState);

    // return a state or something
    // i return the prevState
    return prevState;
  }

  // it is called before componentDidUpdate
  // to check have any update action
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Update App.js] Inside getSnapshotBeforeUpdate',
      prevProps, prevState);
    return prevState;
  }

  // Called immediately after updating occurs
  // get the prevProps when a component is updated
  componentDidUpdate(prevProps, prevState) {
    console.log('[Update App.js] Inside componentDidUpdate',
      prevProps, prevState)
  }

  // state = {
  //   persons: [
  //     { id: '1', name: 'Max', age: 28 },
  //     { id: '2', name: 'Manu', age: 29 },
  //     { id: '3', name: 'Stephanie', age: 26 }
  //   ],
  //   otherState: 'some other value',
  //   showPersons: false
  // }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);

    const person = {
      ...this.state.persons[personIndex]
    };
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];

    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;

    // this.setState({
    //   showPersons: !doesShow,
    //   toggleClicked: this.state.toggleClicked + 1
    // });

    // can use a function into the setState
    // this is the better approach
    // setState always run asynchrnously
    this.setState((prevState, props) => {
      console.log(props)
      // return  a new state
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  loginHandler = () => {
    this.setState({ authenticated: true })
  }

  render() {
    console.log('[App.js] Inside render()')
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={ this.state.persons }
          clicked={ (index) => this.deletePersonHandler(index) }
          changed={ (event, id) => this.nameChangedHandler(event, id) }
        // isAuthenticated={ this.state.authenticated }
        />
      )
    }

    return (
      // <div className={ [classes.App, classes.font].join(' ') }>
      // <WithClass classes={ [classes.App,classes.font].join(' ') }>
      //   <button onClick={ () => this.setState({ showPersons: true }) }>Show Persons</button>
      //   <Cockpit
      //     appTitle={ this.props.title }
      //     showPersons={ this.state.showPersons }
      //     persons={ this.state.persons }
      //     clicked={ () => this.togglePersonsHandler() }
      //   />
      //   { persons }
      // </WithClass>
      <Aux>
        <button onClick={ () => this.setState({ showPersons: true }) }>Show Persons</button>
        <Cockpit
          appTitle={ this.props.title }
          showPersons={ this.state.showPersons }
          persons={ this.state.persons }
          login={ this.loginHandler }
          clicked={ () => this.togglePersonsHandler() }
        />
        {/* passing the context by using Provider into any file(for using globally)*/ }
        <AuthContext.Provider value={ this.state.authenticated }>
          { persons }
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default WithClass(App, classes.App);

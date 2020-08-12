import React, { Component } from 'react';
import classes from './App.module.css';
import User from '../components/User';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor', props);
    this.state = {
      showUserComponent: true
    }
  }

  // lifecycle hooks
  // componentWillMount() {

  // }

  // UNSAFE_componentWillMount() {
  //   console.log('[App.js] Inside componentWillMount()')
  // }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()')
  }

  /**
     * Component lifecycle sequence(that's are automatically called when a class is rendered)
     * 1. constructor(props) / state
     * 2. componentWillMount()
     * 3. render()
     * 4. Render Child Components
     * 5. componentDidMount()
     */

  /**
   * Component Lifecycle-Update (triggered by Parent(propes based))->Sequences
   * 1. componentWillReceiveProps(nextProps, nextContext)
   * 2. shouldComponentUpdate(nextProps, nextState, nextContext) -> May cancel updating process
   * 3. componentWillUpdate(nextProps, nextState, nextContext)
   * 4. render()
   * 5. Update Child Component Props
   * 6. componentDidUpdate(prevProps, prevState)
   */

  /**
   * Component Lifecycle-Update (triggered by Internal Change(state based))->Sequences
   * 1.shouldComponentUpdate(nextProps, nextState, nextContext) -> May cancel updating process
   * 2. componentWillUpdate(nextProps, nextState, nextContext)
   * 3. render()
   * 4. Update Child Component Props
   * 5. componentDidUpdate(prevProps, prevState)
   */

  removeUserHandler = () => {
    this.setState({ showUserComponent: false });
  }

  render() {
    console.log('[App.js] Inside render()')

    return (
      <div className={ classes.App }>
        { this.state.showUserComponent ? <User /> : null }
        <button onClick={ this.removeUserHandler }>Remove User Component</button>
      </div>
    );
  }
}

export default App;

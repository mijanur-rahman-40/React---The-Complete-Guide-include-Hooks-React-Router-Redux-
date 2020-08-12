import React from 'react';
import ReactDOM from 'react-dom';

const cancelFunction = () => {
    return 'Cancel'
}

// A component has three main usefulness
/**
 * Component Nesting --> A component can be shown inside of another component.
 * Component Reusability --> We want to make components that can be easily reused through out application.
 * Component Configuration --> We should be able to configure a component when it is created.
 */
// create a component
const App = () => {
    // const buttonText = 'Click Me!';
    // can be referencing the same variable or object
    // const buttonText = 1211;
    // const buttonText = ['122', 'Click me'];
    // const buttonText = [123, 'Click me'];
    // for object {buttonText} does not work in jsx but {buttonText.text} works fine
    const buttonText = {
        text: 'Click me'
    };

    const style = { backgroundColor: 'blue', color: 'white' };
    const labelText = 'Enter name: ';
    return <div>
        <label className='label' for='name'>
            { labelText }
        </label>
        <input id='name' type='text' />
        <button style={ { backgroundColor: 'blue', color: 'white' } }>
            { buttonText.text }
        </button>
        <button style={ style }>
            { cancelFunction() }
        </button>
    </div>
}

// take the react component and show it on screen
ReactDOM.render(<App />, document.querySelector('#root'));
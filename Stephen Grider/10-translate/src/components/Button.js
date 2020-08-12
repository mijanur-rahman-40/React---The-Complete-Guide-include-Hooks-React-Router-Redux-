import React from 'react';
import LanguageContext from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';

class Button extends React.Component {
    // there are two types of way to retrieve data
    // 1. this.context 2. Consumer
    // static contextType = LanguageContext;

    renderSubmit = (language) => {
        return language === 'english' ? 'Submit' : 'Voorleggen';
    }

    renderButton = (color) => {
        return (
            <button className={ `ui button ${ color }` }>
                <LanguageContext.Consumer>
                    {/* this is for multiple context */ }
                    {/* { (value) => this.renderSubmit(value) } */ }
                    { ({ language }) => this.renderSubmit(language) }
                </LanguageContext.Consumer>
            </button>
        )
    }
    render() {
        // const text = this.context === 'english' ? 'Submit' : 'Voorleggen';
        // getting the data of context
        console.log(this.context);
        // return <button className='ui button primary'> { text }</button>
        return (
            <ColorContext.Consumer >
                { (color) => this.renderButton(color) }
            </ColorContext.Consumer >
        )
    }
}
// the same thing before using static
// Button.contextType = LanguageContext;

export default Button;
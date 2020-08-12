import React from 'react';
import LanguageContext from '../contexts/LanguageContext';

class Field extends React.Component {
    // this is for single context
    static contextType = LanguageContext;

    render() {
        // const text = this.context === 'english' ? 'Name' : 'Naam';
        const text = this.context.language === 'english' ? 'Name' : 'Naam';

        return (
            <div className="ui field">
                <label>{ text }</label>
                <input />
            </div>
        );
    }
}

export default Field;
// import React from 'react';

// // const context = React.createContext('english');
// // console.log(context);
// export default React.createContext('english');

import React from 'react';

const Context = React.createContext('english');

export class LanguageStore extends React.Component {
    state = { language: 'english' };

    onLanguageChange = (language) => {
        this.setState({ language });
    };

    render() {
        return (
            <Context.Provider
                value={ { ...this.state, onLanguageChange: this.onLanguageChange } }
            >
                {/* the language store is going to wrap all these different components when it finally gets rendered*/}
                { this.props.children }
            </Context.Provider>
        );
    }
}

export default Context;
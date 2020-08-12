import React from 'react';
import UserCreate from './UserCreate';
// import LanguageContext from '../contexts/LanguageContext';
import { LanguageStore } from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';
import LanguageSelector from './LanguageSelector';
/**
 * Context based application
 */
class App extends React.Component {
    // state = {
    //     language: 'english'
    // }

    // onLanguageChangle = (language) => {
    //     this.setState({
    //         language
    //     })
    // }
    render() {
        return (
            <div className='ui container'>
                {/* <LanguageSelector onLanguageChangle={ (language) => this.onLanguageChangle(language) } />
                <ColorContext.Provider value='red'>
                    <LanguageContext.Provider value={ this.state.language }>
                        <UserCreate />
                    </LanguageContext.Provider>
                </ColorContext.Provider> */}
                <LanguageStore>
                    <LanguageSelector />
                    <ColorContext.Provider value='red'>
                        <UserCreate />
                    </ColorContext.Provider>
                </LanguageStore>

                {/* <UserCreate /> */ }
            </div>
        )
    }
}

export default App;
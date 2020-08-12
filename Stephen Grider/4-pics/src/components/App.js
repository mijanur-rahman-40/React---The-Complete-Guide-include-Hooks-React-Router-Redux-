import React from 'react';

import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';

class App extends React.Component {

    state = {
        images: []
    }

    getOnSearchValue = async (term) => {
        // console.log(term);
        // axios.get('https://api.unsplash.com/search/photos?query=term'
        const response = await unsplash.get('/search/photos', {
            params: { query: term }
        });
        // .then(response => {
        //     console.log(response.data.results); 
        // });
        this.setState({
            images: response.data.results
        });
    }

    render() {
        return (
            <div
                className='ui container'
                style={ { marginTop: '10px' } }>
                <SearchBar
                    getOnSubmitValue={ (term) => this.getOnSearchValue(term) } />
                <ImageList images={ this.state.images } />
            </div >
        )
    }
};

export default App;
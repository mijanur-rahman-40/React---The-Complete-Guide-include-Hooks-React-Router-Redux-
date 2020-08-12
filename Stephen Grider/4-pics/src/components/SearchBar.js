import React from 'react';

class Searchbar extends React.Component {

    state = {
        term: ''
    }

    onInputChange = (event) => {
        console.log(event.target.value);
    }

    // this can be an error. this function is not bined
    // onFromSubmit(event){
    //     event.preventDefault();
    //     console.log(this.state.term);
    // }

    // an arrow function always bind with default constructor
    onFromSubmit = (event) => {
        event.preventDefault();
        this.props.getOnSubmitValue(this.state.term);
    }

    render() {
        return (
            <div className='ui segment'>
                <form onSubmit={ (event) => this.onFromSubmit(event) } className='ui form'>
                    <div className='field'>
                        <label>Image Search</label>
                        {/* <input
                            type='text'
                            onChange={ (event) => this.onInputChange(event) }
                        /> */}
                        <input
                            type='text'
                            value={ this.state.term }
                            // onChange={ (event) => this.setState({ term: event.target.value.toUpperCase() }) }
                            onChange={ (event) => this.setState({ term: event.target.value }) }
                        />
                        {/**
                         * default on related(onChange, onVolumeChange) javascript function return a callback function.
                         * every call back function return an event.
                         * to pass an event can use call back function reference that automatically pass an event(like below).
                         * another choice is parameter based function that pass event parameter also(like above).
                         */}
                        {/* <input type='text' onChange={ this.onInputChange } /> */ }
                    </div>
                </form>
            </div>
        )
    }
}

export default Searchbar;
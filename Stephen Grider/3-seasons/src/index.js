import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         latitude: null,
    //         errorMessage: ''
    //     }

    // window.navigator.geolocation.getCurrentPosition(position => {
    //     this.setState({
    //         latitude: position.coords.latitude
    //     });
    //     // we did not !!!
    //     // this.state.latitude = position.coords.latitude;
    // }, error => {
    //     this.setState({
    //         errorMessage: error.message
    //     })
    // });
    // }

    state = {
        latitude: null,
        errorMessage: ''
    }

    componentDidMount() {
        // console.log('component did mount is called');
        window.navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitude: position.coords.latitude
            });
        }, (error) => {
            this.setState({
                errorMessage: error.message
            })
        });
    }
    componentDidUpdate = () => {
        console.log('component did update is called');
    }

    // this is helper method
    renderContent = () => {
        if (this.state.errorMessage && !this.state.latitude) {
            return <div> Error :{ this.state.errorMessage } </div>
        }
        if (!this.state.errorMessage && this.state.latitude) {
            return <SeasonDisplay latitude={ this.state.latitude } />
        }
        return (
            <Spinner message='Please accept location request' />
        )
    }
    render() {
        console.log('rendered is called');
        // if (this.state.errorMessage && !this.state.latitude) {
        //     return <div> Error :{ this.state.errorMessage } </div>
        // }
        // // if (!this.state.errorMessage && this.state.latitude) {
        // //     return <div> Latitude :{ this.state.latitude } </div>
        // // }
        // if (!this.state.errorMessage && this.state.latitude) {
        //     return <SeasonDisplay latitude={ this.state.latitude } />
        // }
        // return (
        //     // <div> Loading </div>
        //     <Spinner message='Please accept location request' />
        // )
        return (
            <div className='border red'>
                { this.renderContent() }
            </div>
        );
    }
};

ReactDOM.render(<App />, document.querySelector('#root'));
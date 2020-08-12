import React, { Component } from 'react';

class User extends Component {

    componentWillUnmount() {
        // Component is about to get removed => Perform any cleanup work here!
        console.log('I\'m about to be removed!');
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default User;
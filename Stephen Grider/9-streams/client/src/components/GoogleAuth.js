import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    // state = {
    //     isSignedIn: null
    // }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '592822109196-sodbu2iko1fnujdam52ich4qaqo53ekj.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                // this.setState({
                //     isSignedIn: this.auth.isSignedIn.get()
                // });
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        });
    };

    // onAuthChange = () => {
    //     this.setState({
    //         isSigned In: this.auth.isSignedIn.get()
    //     });
    // };
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSIgnOutClick = () => {
        this.auth.signOut();
    }

    // renderAuthButton = () => {
    //     if (this.state.isSignedIn === null) {
    //         return null;
    //     } else if (this.state.isSignedIn) {
    //         return (
    //             <button onClick={ () => this.onSIgnOutClick() } className='ui red google button'>
    //                 <i className='google icon'>
    //                     Sign Out
    //                 </i>
    //             </button>
    //         )
    //     } else {
    //         return (
    //             <button onClick={ () => this.onSignInClick() } className='ui red google button'>
    //                 <i className='google icon'>
    //                     Sign In with Google
    //                 </i>
    //             </button>
    //         )
    //     }
    // };


    renderAuthButton = () => {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={ () => this.onSIgnOutClick() } className='ui red google button'>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={ () => this.onSignInClick() } className='ui red google button'>
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>{ this.renderAuthButton() }</div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(
    mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);
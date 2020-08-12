import React from 'react';
import User from '../../components/User';

const authIndexPage = (props) => {
    return (
        <div>
            <big>The auth Index Page <strong>{props.appName}</strong></big>
            <User name="Max" age={28} />
        </div>
    );
};

// getting preloaded data
authIndexPage.getInitialProps = context => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ appName: "Super App (Auth)" });
        }, 1000);
    });
    return promise;
};

export default authIndexPage;
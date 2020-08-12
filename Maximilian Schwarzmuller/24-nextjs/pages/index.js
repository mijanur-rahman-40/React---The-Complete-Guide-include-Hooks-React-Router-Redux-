import React, { Component} from 'react';
import Link from 'next/link';
import Router from 'next/router';

class IndexPage extends Component{
    // before execute render
    // static async getInitialProps(context) {
    //     // console.log(context);
    //     return {appName: 'Super App'};
    // }
    static getInitialProps(context) {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ appName: "Super App" });
            }, 6000);
        });
        return promise;
    }

    render() {
        return (
            <div>
                <big>The Main Page of <strong>{this.props.appName}</strong></big>
                <p>
                    Go to{" "}
                    <Link href="/auth">
                        <a>Auth</a>
                    </Link>
                </p>
                <button onClick={() => Router.push("/auth")}>Go to Auth</button>
            </div>
        );
    }
};

export default IndexPage;
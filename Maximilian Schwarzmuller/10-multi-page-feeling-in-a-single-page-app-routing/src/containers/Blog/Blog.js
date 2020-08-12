import React, { Component } from 'react';
import axios from '../../axios';
import { Route, NavLink, Switch, Redirect, Link } from 'react-router-dom';
import FullPost from './FullPost/FullPost';
import NewPost from './NewPost/NewPost';
import Posts from './Posts/Posts';
import './Blog.css';
import asyncComponent from '../../hoc/asyncComponent';

// implement asyncComponent/Lazy component
const AsyncNewPost = asyncComponent(() => {
    // this is the special inport method
    // this method is called when AsyncNewPost is called
    // it does not called automatically
    // this is a DYNAMIC SYNTEX
    // create extra bundle not into main bundle
    // when i want to load
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        // auth: false
        auth: true
    }

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* 
                            1. by using this process every time when we clicked into new link whole page is reloaded
                            2. new javascript code create
                            3. therefor the previous state of this applications is lost
                            */}
                            {/* <li><Link to="/">Home</Link></li>
                            <li><Link to={{
                                pathname: '/new-post',
                                // absolute path
                                // pathname:'/post/new-post',
                                // relative path
                                // pathname:this.props.match.url + '/new-post',
                                // use to id submit element or any url
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</Link></li> */}
                            {/* NavLink allows us to add extra props */}
                            <li><NavLink
                                to='/posts/'
                                // as link check the prefix '/' into the both so to remove both link is active, we have to use exact
                                exact
                                // override default active class
                                // activeClassName='my-active'
                                activeClassName='active'
                                activeStyle={{
                                    color: '#fa923f',
                                    borderBottom: 'solid 2px #e47c27',
                                    paddingInline: '8px'
                                }}
                            >Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}
                                exact
                                activeStyle={{
                                    color: '#fa923f',
                                    borderBottom: 'solid 2px #e47c27',
                                    paddingInline: '8px'
                                }}
                            >New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <section>
                    {/* <Route path='/' exact render={() => <h1>I am Home</h1>} />
                    <Route path='/' render={() => <h1>I am Home 2</h1>} />
                    <Route path='/' render={() => <Posts />} /> */}
                    {/* best approach */}
                    {/* 
                    1. Switch allows us to render only one route/component and which is matched first to teh related route
                    2. route order is most important in switch */}
                    
                    <Switch>
                        {/* 1. this route always load when auth is true
                            2. why i load the component even if i do not go to route
                            3. In bigger project i do not want to load any extra component if i do not need
                            4. because it can be 1kb or large and its extra memory consume
                            5. By this process i load the NewPost component when i want to go the 'new-post' route.
                            6. this problem solve process/issue is called code-splitting/lazy loading
                         */}
                        {/* {this.state.auth ? <Route path='/new-post' exact component={NewPost} /> : null} */}
                        {/* this execute when it is called*/}
                        {this.state.auth ? <Route path='/new-post' exact component={AsyncNewPost} /> : null}
                        <Route path='/posts' component={Posts} />
                        {/* <Route path='/' component={Posts} /> */}
                        {/* the something(before) can be done by using Redirect */}
                        {/* this route will catch any unknown request */}
                        {/* <Route render={() => <big style={{ textAlign: 'center' }}>Not found</big>}/> */}
                        <Redirect from='/' to='/posts'/>
                        {/* <Route path='/:id' exact component={FullPost} /> */}
                        {/* <Route path='/posts/:id' exact component={FullPost} /> */}
                    </Switch>
                </section>
            </div>
        );
    }
}

export default Blog;
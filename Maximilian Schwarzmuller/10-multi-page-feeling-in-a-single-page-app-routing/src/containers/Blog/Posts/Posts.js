import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Link, Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: [],
        error: false
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({ posts: updatedPosts });
                // console.log( response );
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: true });
            });
    }

    postSelectedHandler = (id) => {
        // the alternative way without use Link
        this.props.history.push({ pathname: '/posts/' + id });
        // this also correct
        // this.props.history.push('/' + id );
        // this.props.history.goBack()
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Posts are loading...!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/posts/' + post.id} key={post.id}>
                    // <Link to={'/' + post.id} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        // can be passed props like
                        // match={this.props.match}
                        clicked={() => this.postSelectedHandler(post.id)} />
                    // </Link>
                )
            });
        }
        return (
            // nested route is implemented
            <div>
                <section className='Posts'>
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        );
    }
}

export default Posts;

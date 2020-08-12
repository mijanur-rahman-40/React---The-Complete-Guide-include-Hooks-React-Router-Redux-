import React, { Component } from 'react';
import axios from '../../../axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount() {
        this.loadedPost();
    }

    componentDidUpdate(prevProps, prevState) {
        this.loadedPost();
    }

    loadedPost = () => {
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id.toString() !== this.props.match.params.id)) {
                axios.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        this.setState({ loadedPost: response.data });
                    });
            }
        } 
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
            });
    }

    render() {
        let post = '';
        if (this.props.match.params.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <big style={{ fontSize: '25px' }}>{this.state.loadedPost.title}</big>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;
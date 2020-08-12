import React from 'react';
// helps to pass history props
import { withRouter } from 'react-router-dom';
import './Post.css';

const post = (props) => {
    // routing like a props are not passed down into component tree
    // if you do not use withRouter
    // console.log(props)
    return (
        <article className="Post" onClick={props.clicked}>
            <big>{props.title}</big>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    )
};

export default withRouter(post);
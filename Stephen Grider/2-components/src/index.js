import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard';

// props
/**
 * System for passing data from a parent components to a child
 * component.
 * Goal is to customize or configure a child component. 
 */
const App = () => {
    return (
        <div className='ui container comments'>
            <ApprovalCard>
                <div>
                    <h4>Warning</h4>
                    Are you sure want to do this?
                </div>
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail
                    author={ faker.name.lastName() }
                    timeAgo={ faker.date.weekday() }
                    content={ faker.lorem.sentence() }
                    avatar='images/raju.jpeg'
                />
            </ApprovalCard>

            <ApprovalCard>
                <CommentDetail
                    author={ faker.name.lastName() + ' ' + faker.name.lastName() }
                    timeAgo={ faker.date.weekday() }
                    content={ faker.lorem.sentence() }
                    avatar='images/raju.jpeg'
                />
            </ApprovalCard>

            <CommentDetail
                author={ faker.name.lastName() + ' ' + faker.name.lastName() }
                timeAgo={ faker.date.weekday() }
                content={ faker.lorem.sentence() }
                avatar='images/raju.jpeg'
            />
        </div>
    )
};

ReactDOM.render(<App />, document.querySelector('#root'));
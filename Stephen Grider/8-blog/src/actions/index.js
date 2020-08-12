import _ from 'lodash';
import JsonPlaceholder from '../apis/JsonPlaceHolder';

// with get state
export const fetchPostsAndUsers = () => {
    return async (dispatch, getState) => {
        // console.log('About to fetch posts');
        await dispatch(fetchPosts());
        // console.log(getState().posts);
        // const userIds = _.uniq(_.map(getState().posts, 'userId'));
        // userIds.forEach(id => dispatch(fetchUser(id)));
        /**
         * we can do the samething by the chain code of lodash
         */
        _.chain(getState().posts)
            .map('userId')
            .uniq()
            .forEach(id => dispatch(fetchUser(id)))
            .value();
        // console.log(userIds);
        // console.log('fetched posts!');
    }
};
export const fetchPosts = () => {
    // the error 'action must be a plain object'
    // without redux thunk we will get an error because the use of async and await
    // the main reason : here response does not return a plain object.Its return request object that probably has a bunch of fancy method

    // when we use promise we do not need async
    // if we do not use async and await it returns a plain object but the data loading(synchronous->(response) in that takes a large time) time it causes problem.
    // Action creator, action returned,action sent to all reducer, reducers return,reducers run then  probably we get fetched data. it takes too long time
    // for this reason we get a plain object but it does not contain any values
    // const promise = JsonPlaceholder.get('/posts');
    // const response = await JsonPlaceholder.get('/posts');
    // return {
    //     type: 'FETCH_POSTS',
    //     payload: promise
    // };

    // redux-thunk helps to create a use Asynchronous action creator
    /**
     * with the redux thunk
     * Action creators can return objects.
     * Action creators can return functions
     * if an action object gets returned, it must have a type
     * If an action objects gets returned, it can optionally have a payload
     */
    // return {
    //     type: 'FETCH_POSTS',
    //     payload: response
    // };
    // return async function (dispatch, getState) {
    //     const response = await JsonPlaceholder.get('/posts');
    //     dispatch({
    //         type: 'FETCH_POSTS',
    //         payload: response
    //     });
    // }

    // here we do not need getState
    return async (dispatch) => {
        const response = await JsonPlaceholder.get('/posts');
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        });
    }
};

export const fetchUser = (id) => async (dispatch) => {
    const response = await JsonPlaceholder.get(`/users/${ id }`);
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
};

/**
 * Checking usability
 */
// export const fetchUser = _.memoize(function (id) {
//     return async function (dispatch) {
//         const response = await JsonPlaceholder.get(`/users/${ id }`);
//         dispatch({
//             type: 'FETCH_USER',
//             payload: response.data
//         });
//     };
// });

// export const fetchUser = function (id) {
//     return _.memoize(async function (dispatch) {
//         const response = await JsonPlaceholder.get(`/users/${ id }`);
//         dispatch({
//             type: 'FETCH_USER',
//             payload: response.data
//         });
//     });
// };

/**
 * best approach to fetch data from outside api
 */
// export const fetchUser = (id) => {
//     return (dispatch) => {
//         _fetchUser(id, dispatch);
//     };
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await JsonPlaceholder.get(`/users/${ id }`);
//     dispatch({
//         type: 'FETCH_USER',
//         payload: response.data
//     });
// });

// TOTALLY FINE!!
// export const selectPost = () => {
//     return {
//         type:'SELECT_POST'
//     }
// }

import streams from '../apis/streams';
import history from '../history';
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

// each (redux-thunk) returned function has two parameter : dispatch function and getState function

// dispatch function pickup the action type and payload
// getState function allows us to the redux store and pull out some piece of information 
export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const response = await streams.post('/streams', { ...formValues,userId });
        dispatch({
            type: CREATE_STREAM,
            payload: response.data
        });
        // Do some programmatic navigation (using history object)
        // get the user back to the root route

        history.push('/');
    }
};

export const fetchStreams = () => {
    return async (dispatch) => {
        const response = await streams.get('/streams');
        dispatch({
            type: FETCH_STREAMS,
            payload: response.data
        });
    }
};

export const fetchStream = (id) => {
    return async (dispatch) => {
        const response = await streams.get(`/streams/${ id }`);
        dispatch({
            type: FETCH_STREAM,
            payload: response.data
        });
    }
};

export const editStream = (id, formValues) => {
    return async (dispatch) => {
        // normally put request update whole object except id
        // in this put request title and decription updated but userId do not pass so the userId dropped by backend api
        // const response = await streams.put(`/streams/${ id }`, formValues);
        const response = await streams.patch(`/streams/${ id }`, formValues);
        dispatch({
            type: EDIT_STREAM,
            payload: response.data
        });
        history.push('/');
    }
};

export const deleteStream = (id) => {
    return async (dispatch) => {
        await streams.delete(`/streams/${ id }`);
        dispatch({
            type: DELETE_STREAM,
            payload: id
        });
        history.push('/');
    }
};


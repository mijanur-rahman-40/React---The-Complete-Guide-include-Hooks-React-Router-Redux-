import { put, call, delay } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions'

/**
 * call -> Same as call([context, fn], ...args) but supports passing a fn as string. Useful for invoking object's methods, i.e. yield call([localStorage, 'getItem'], 'redux-saga')
 * put -> Creates an Effect description that instructs the middleware to dispatch an action to the Store.
 * delay -> Returns an effect descriptor to block execution for ms milliseconds and return val value.
 */

// generator function
// generator function does not work with arrow
// dispatching an action
// synchronous side effects code
export function* logoutSaga(action) {
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationDate');
    // yield localStorage.removeItem('userId');
    // call is a helper function, it allows us to call some function or object
    // function-> call(['context or var or what to be effected', 'which effect/name function'], 'arguments of effect/parameter')
    yield call([localStorage, "removeItem"], 'token');
    yield call([localStorage, "removeItem"], 'expirationDate');
    yield call([localStorage, "removeItem"], 'userId');
    yield put(actions.logoutSucceed())
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout())
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnJo-bBVOZZa4T_SWTdYyerQPqiOYKIzo';
    if (!action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnJo-bBVOZZa4T_SWTdYyerQPqiOYKIzo';
    }
    try {
        const response = yield axios.post(url, authData);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            // getting remaining time
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}
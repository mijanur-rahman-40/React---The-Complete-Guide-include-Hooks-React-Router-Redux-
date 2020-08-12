import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';
import * as actionTypes from '../actions/actionTypes';

/**
 * takeEvery -> on each action dispatched to the Store that matches pattern
 * takeLatest ->  on each action dispatched to the Store that matches pattern. And automatically cancels any previous saga task started previously if it's still running
 * all ->Creates an Effect description that instructs the middleware to run multiple Effects in parallel and wait for all of them to complete.
 */

/**
 * all listeners
 */
// don't called with logoutSaga(). just pass a reference
export function* watchAuth() {
    // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    // yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
    // combining multiple generators/actions by the all function
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)])

}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    // can also use takeEvery in takeLatest but when situation is suitable
    // always only execute the latest one
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}


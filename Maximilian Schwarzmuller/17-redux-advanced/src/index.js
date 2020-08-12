import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import './index.css';
import App from './App';

const rootReducer = combineReducers({
    counters: counterReducer,
    results: resultReducer
});

// custom middleware
// store enhancer that applies middleware to the dispatch method
const logger = (store) => {
    // here next and action also are fnction
    // here next works like in express
    return (next) => {
        return (action) => {
            console.log('[Middleware] Dispatching', action);
            // action continue to the reducer
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(rootReducer, applyMiddleware(logger));
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


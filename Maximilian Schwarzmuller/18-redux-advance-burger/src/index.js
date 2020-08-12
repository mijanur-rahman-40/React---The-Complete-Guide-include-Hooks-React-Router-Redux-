import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';


const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
});

// custom middleware
// store enhancer that applies middleware to the dispatch method
// const logger = (store) => {
//     // here next and action also are fnction
//     // here next works like in express
//     return (next) => {
//         return (action) => {
//             console.log('[Middleware] Dispatching', action);
//             // action continue to the reducer
//             const result = next(action);
//             console.log('[Middleware] next state', store.getState());
//             return result;
//         }
//     }
// };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(
    app,
    document.getElementById('root')
);


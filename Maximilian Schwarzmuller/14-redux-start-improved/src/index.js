import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers} from 'redux';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import './index.css';
import App from './App';

const rootReducer = combineReducers({
    counter: counterReducer,
    result: resultReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


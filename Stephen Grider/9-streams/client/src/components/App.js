import React from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import '../semantic_ui.css';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';
import StreamList from './streams/StreamList';
import Header from './Header';
import history from '../history';

const App = () => {
    return (
        <div className='ui container'>
            {/* to use a custom history have to use Router */ }
            <Router history={ history }>
                <div>
                    <Header />
                    <Switch>
                        <Route path='/' exact={ true } component={ StreamList } />
                        <Route path='/streams/new' exact={ true } component={ StreamCreate } />
                        <Route path='/streams/edit/:id' exact={ true } component={ StreamEdit } />
                        <Route path='/streams/delete/:id' exact={ true } component={ StreamDelete } />
                        <Route path='/streams/:id' exact={ true } component={ StreamShow } />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App;


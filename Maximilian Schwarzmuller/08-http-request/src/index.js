import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';


axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// error handling globally before going into original project
axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    // always return statements have to
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit request config
     // always return statements have to
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById('root'));

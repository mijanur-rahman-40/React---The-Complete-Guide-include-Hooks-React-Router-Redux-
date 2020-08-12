import axios from 'axios';

// here axios has a customixe instance
export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID 4SHC29Cj2JxOMeQKEQIZOXBjunhloYV_QbjRrVCo19c'
    }
});
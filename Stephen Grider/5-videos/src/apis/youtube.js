import axios from 'axios';

const KEY = 'AIzaSyDdq1UxvpOyxlH01i6CviJqfh7SG2I76us';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
});
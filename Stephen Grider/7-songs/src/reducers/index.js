import { combineReducers } from 'redux'

// static reducer
const songsReducer = () => {
    return [
        { title: 'No Scrubs', duration: '4:05' },
        { title: 'Macarana', duration: '2:05' },
        { title: 'All Star', duration: '3:15' },
        { title: 'I want it That Way', duration: '1:45' },
    ];
};

const selectedSongReducer = (selectedSong = null, action) => {
    if (action.type === 'SONG_SELECTED') {
        return action.payload;
    }
    return selectedSong;
};

export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer
});
import React from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../actions';

class SongList extends React.Component {
    songRenderList = () => {
        return this.props.songs.map((song) => {
            return (
                <div className='item' key={ song.title }>
                    <div className='right floated content'>
                        <button
                            className='ui button primary'
                            onClick={() =>this.props.selectSong(song)}
                        >
                            Select
                        </button>
                    </div>
                    <div className='content'>{ song.title }</div>
                </div>
            )
        });
    }
    render() {
        // this.props === { songs: state.songs }
        // console.log(this.props)
        return (
            <div className='ui divided list'>{ this.songRenderList() }</div>
        )
    }
}

// mapStateToProps always have a parameter state(entire state)
const mapStateToProps = (state) => {
     console.log(state);
    // return state;
    // in this we return such an object(follow up the combine reducer key reference) that we want use in the component
    return { songs: state.songs }
}
// mapStateToProps always have a return value
// here basically the return value of mapStateToProps works/going on as a props of SongList.
// connect function also work with action creator
// here dispatch function automatically called
export default connect(mapStateToProps, {
    selectSong: selectSong
})(SongList);

// function connect() {
//     return function () {
//         return 'Hi there';
//     }
// }
// connect()();
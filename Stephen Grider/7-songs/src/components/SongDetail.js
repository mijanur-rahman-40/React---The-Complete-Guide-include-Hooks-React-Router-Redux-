import React from 'react';
import { connect } from 'react-redux';

// const SongDetail = (props) => {
const SongDetail = ({ song }) => {
    // console.log(props);
    // <div>{ props.song.title }</div>
    if (!song) {
        return <div>Select a song</div>
    }
    return (
        <div>
            <h4>Details for : </h4>
            <p>
                Title : { song.title }
                <br />
                Duration : { song.duration }
            </p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        song: state.selectedSong
    }
}

export default connect(mapStateToProps)(SongDetail);
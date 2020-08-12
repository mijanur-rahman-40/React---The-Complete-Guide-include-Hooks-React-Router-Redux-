import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream,deleteStream } from '../../actions';

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    renderActions = () => {
        const { id } = this.props.match.params;
        return (
            // because of extra div ui does not work properly
            // React Fragment helps us to put multiple Jsx into single element
            // <div>
            //     <button className='ui button negative' > Delete</button>
            //     <button className='ui button' > Cancel</button >
            // </div>
            <React.Fragment>
                <button onClick={ () => this.props.deleteStream(id)} className='ui button negative' > Delete</button> 
                <Link to='/' className='ui button' > Cancel
                </Link >
            </React.Fragment>
        );
    }

    renderContent = () => {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?';
        }
        return `Are you sure you want to delete this stream with title : ${ this.props.stream.title }`;
    }
    render() {
        // if (!this.props.stream) {
        //     return <div>Loading...</div>
        // }
        return (
            <Modal
                title="Delete Stream"
                content={ this.renderContent() }
                actions={ this.renderActions() }
                onDismiss={ () => history.push('/') }
            />
        )
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(
    mapStateToProps,
    { fetchStream,deleteStream }
)(StreamDelete);
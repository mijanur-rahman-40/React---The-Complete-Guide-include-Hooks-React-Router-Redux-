import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    
    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        // console.log(formValues);
        this.props.editStream(this.props.match.params.id, formValues);
    }
    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    // initialValues is the default props of a redux form Field component
                    // so the object property name should be the same of Field name
                    // initialValues={ {
                    //     title: '',
                    //     description: ''
                    // } }
                    // initialValues={ this.props.stream }
                    // we do no need to pass whole object if we pass this.props.stream then userId and id also passed.but we do not need to to do that.
                    // here loadash pick function pick the specific object properties.
                    initialValues={ _.pick(this.props.stream, 'title', 'description') }
                    onSubmit={
                        (formValues) => this.onSubmit(formValues)
                    } />
            </div>
        )
    }
}

// every mapStateToProps has to parameter
// state : come from the redux store
// ownProps : related with the current component props(StreamEdit)

/*
With React-Router, each component needs to be designed
to work in isolation (fetch its own data!)
*/
const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps);
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(
    mapStateToProps,
    { fetchStream, editStream }
)(StreamEdit);
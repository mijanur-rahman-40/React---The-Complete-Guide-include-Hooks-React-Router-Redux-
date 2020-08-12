import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamForm extends React.Component {
    // renderInput = (formProps) => {
    //     return (
    //         // <input
    //         //     onChange={ formProps.input.onChange }
    //         //     value={ formProps.input.value }
    //         // />

    //         // same thing can be done by the below with shortcut
    //         <input { ...formProps.input } />
    //     );
    // };

    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className='ui error message'>
                    <div className='header'>{ error }</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${ meta.error && meta.touched ? 'error' : '' }`;
        return (
            <div className={ className }>
                <label>{ label }</label>
                <input { ...input } autoComplete='off' />
                {/* <div>{ meta.error }</div> */ }
                { this.renderError(meta) }
            </div>
        );
    };

    // onSubmitHandler = (event) => {
    //     event.preventDefault();
    // }
    // with redux form does not need event, all handle the parameter
    onSubmitHandler = (formValues) => {
        // console.log(formValues);
        this.props.onSubmit(formValues);
    }

    render() {
        // console.log(this.props);
        return (
            <div>
                <form onSubmit={ this.props.handleSubmit(this.onSubmitHandler) } className='ui form error'>
                    {/* here all fields are input type redux form component */ }
                    {/* <Field name='title' component={ (formProps) => this.renderInput(formProps) } /> */ }
                    <Field name='title' label='Enter title' component={ this.renderInput } />
                    <Field name='description' label='Enter description' component={ this.renderInput } />
                    <button className='ui button primary'>Submit</button>
                </form>
            </div>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
}
export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);
// const formWrapped = reduxForm({
//     form: 'streamCreate',
//     validate: validate
// })(StreamForm);

// export default connect(
//     null,
//     { createStream }
// )(formWrapped)
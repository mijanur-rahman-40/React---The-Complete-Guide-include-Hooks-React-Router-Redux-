import React from 'react';

const Spinner = (props) => {
    return (
        <div className='ui active dimmer'>
            <div className='ui big text loader'>
                { props.message }
            </div>
        </div>
    );
};

// default props if main props does not contain any object or data
Spinner.defaultProps = {
    message : 'Loading...'
}
export default Spinner;
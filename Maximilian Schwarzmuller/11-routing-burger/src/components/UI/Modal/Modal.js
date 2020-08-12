import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // the issue is to betwwen model and spinner
        // if children change
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('[Modal] will update')
    }

    render() {
        return (
        <Aux>
            <Backdrop
                show={this.props.show}
                    clicked={this.props.modalClosed}
            />
            <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}
            >
                    {this.props.children}
            </div>
        </Aux>
    );
    }
    
};

export default Modal;
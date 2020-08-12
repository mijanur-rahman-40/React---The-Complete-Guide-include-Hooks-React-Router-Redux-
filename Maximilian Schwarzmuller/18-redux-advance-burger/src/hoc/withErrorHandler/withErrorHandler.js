import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

// this whole process, basically a global error handling 
// wrapping with higher order component
const withErrorHandler = (WrappedComponent, axios) => {
    // anonymous class
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({ error: null });
                return request;
            });

            this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({ error: error })
            });
        }

        // clean up the Interceptor
        componentWillUnmount() {
            // the output value are 0,0
            // because request index is 0 -> starting index (the number of) of requestInterceptor
            // because request index is 0 -> starting index (the number of) of responseInterceptor
            // console.log('Will Unmount', this.requestInterceptor, this.responseInterceptor);

            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmHandler = () => {
            this.setState({ error: null })
        }
        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmHandler}  >
                        <big style={{color:'red'}}>{this.state.error ?
                            this.state.error.message
                            : null
                        }</big>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    };
};

export default withErrorHandler;
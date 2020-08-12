import React, { Component } from 'react';

// const WithClass = (props) => {
//     return (
//         <div className={ props.classes }>
//             { props.children }
//         </div>
//     );
// };

// const WithClass = (WrappedComponent, className) => {
//     // return an array function with functional component
//     // to passing a full props you have to use spread operator
//     return (props) => (
//         <div className={ className }>
//             <WrappedComponent { ...props } />
//         </div>
//     );
// };

// can do same thing with the statefull component if want to use any lifecycle method
// const WithClass = (WrappedComponent, className) => {
//     // return an array function with functional component
//     // to passing a full props you have to use spread operator
//     // there is no class name(anonymous class)
//     return class extends Component {
//         render() {
//             return (
//                 <div className={ className }>
//                     {/* here ref component for person component */}
//                     <WrappedComponent ref={this.props.forwardedRef} { ...this.props } />
//                 </div>
//             )
//         }
//     }
// };

/** 
 * 
 * To working with the forwarded ref
*/
const WithClass = (WrappedComponent, className) => {
    // return an array function with functional component
    // to passing a full props you have to use spread operator
    // there is no class name(anonymous class)
    // assign class before
    const WithClass=  class extends Component {
        render() {
            return (
                <div className={ className }>
                    {/* here ref component for person component */ }
                    <WrappedComponent ref={ this.props.forwardedRef } { ...this.props } />
                </div>
            )
        }
    }

    return React.forwardRef((props, ref) => {
        return <WithClass { ...props } forwardedRef={ ref }/> 
    });
};
export default WithClass;
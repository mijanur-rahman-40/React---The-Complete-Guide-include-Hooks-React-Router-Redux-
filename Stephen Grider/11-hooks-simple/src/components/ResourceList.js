import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import useResources from './useResources';

// class ResourceList extends React.Component {
//     state = {
//         resource: []
//     }
//     async componentDidMount() {
//         const response = await axios.get(
//             `https://jsonplaceholder.typicode.com/${ this.props.resource }`
//         );
//         this.setState({
//             resource: response.data
//         });
//     }
//     async componentDidUpdate(prevProps, prevState) {
//         // console.log(prevProps);
//         if (prevProps.resource !== this.props.resource) {
//             const response = await axios.get(
//                 `https://jsonplaceholder.typicode.com/${ this.props.resource }`
//             );
//             this.setState({
//                 resources: response.data
//             });
//         }
//     }
//     render() {
//         return <div>{ this.state.resource.length }</div>
//     }
// }


const ResourceList = ({ resource }) => {
    // const [resources, setResources] = useState([]);
    // const fetchResource = async (resource) => {
    //     const response = await axios.get(
    //         `https://jsonplaceholder.typicode.com/${ resource }`
    //     );
    //     setResources(response.data);
    // };

    // useEffect(() => {
    //     // we have to define second function into useEffect, this is role
    //     // fetchResource(resource)
    //     (async (resource) => {
    //         const response = await axios.get(
    //             `https://jsonplaceholder.typicode.com/${ resource }`
    //         );
    //         setResources(response.data);
    //     })(resource) 
    //     // here the second array works like uodate
    // }, [resource]);
    const resources = useResources(resource);
    return (
        // <div>{ this.state.resource.length }</div>
        // <div>{ resources.length }</div>
        <ul>
            { resources.map(record => (
                <li key={ record.id }>{ record.title }</li>
            )) }
        </ul>
    )
}

export default ResourceList;
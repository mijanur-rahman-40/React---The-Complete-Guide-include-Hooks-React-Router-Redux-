import React, { useState } from 'react';
import ResourceList from './ResourceList';
import UserList from './UserList';
/**
 * Hooks : Make it easy to share (reusable) logic between components
 */
const App = () => {
    // state = {
    //     resource: 'posts'
    // }
    // const colors = ['green','red'];
    // const [green,red] = colors;
    // console.log(green)
    // array destructuring the current array
    const [resource, setResource] = useState('posts');
    return (
        <div className='ui container' style={ { marginTop: '10px' } }>
            <UserList/>
            <div>
                {/* <button onClick={ () => this.setState({ resource: 'posts' }) }>Posts</button>
                    <button onClick={ () => this.setState({ resource: 'todos' }) }>Todos</button> */}
                <button className='ui button primary' onClick={ () => setResource('posts') }>Posts</button>
                <button className='ui button secondary' onClick={ () => setResource('todos') }>Todos</button>
            </div>
            {/* { this.state.resource } */ }
            {/* { resource } */ }
            <ResourceList resource={ resource } />
        </div>
    )
}

export default App;

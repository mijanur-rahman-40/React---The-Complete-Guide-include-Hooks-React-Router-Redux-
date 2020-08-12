import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actionTypes from '../store/actions';

class Persons extends Component {
    render() {
        return (
            <div>
                <AddPerson personAdded={(name, age) => this.props.onAddedPerson(name, age)} />
                {this.props.persons.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.props.onRemovedPerson(person.id)} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state.persons
    };
};

// implementing all actions
const mapDispatchToProps = (dispatch) => {
    return {
        onAddedPerson: (name, age) =>
            dispatch({
                type: actionTypes.ADD_PERSON,
                personData: { name: name, age: age }
            }),
        onRemovedPerson: (id) =>
            dispatch({
                type: actionTypes.REMOVE_PERSON,
                personId: id
            })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);